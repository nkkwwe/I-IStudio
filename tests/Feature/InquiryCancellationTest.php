<?php

namespace Tests\Feature;

use App\Models\ProjectInquiry;
use App\Models\ProjectInquiryMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class InquiryCancellationTest extends TestCase
{
    use RefreshDatabase;

    private function inquiry(User $user, string $status = 'new'): ProjectInquiry
    {
        return ProjectInquiry::create([
            'user_id' => $user->id, 'client_name' => $user->name, 'client_email' => $user->email,
            'service_type' => 'landing', 'project_comment' => 'Landing page', 'status' => $status,
        ]);
    }

    public function test_owner_can_cancel_once_and_completed_briefs_are_protected(): void
    {
        $user = User::factory()->create();
        $inquiry = $this->inquiry($user, 'in_progress');
        $this->actingAs($user)->patch(route('account.project-briefs.cancel', $inquiry))->assertSessionHasNoErrors();
        $cancelledAt = $inquiry->fresh()->cancelled_at;
        $this->assertSame('cancelled', $inquiry->fresh()->status);
        $this->assertNotNull($cancelledAt);
        $this->travel(1)->days();
        $this->patch(route('account.project-briefs.cancel', $inquiry))->assertSessionHasNoErrors();
        $this->assertTrue($cancelledAt->equalTo($inquiry->fresh()->cancelled_at));

        $completed = $this->inquiry($user, 'completed');
        $this->patch(route('account.project-briefs.cancel', $completed))->assertSessionHasErrors('status');
        $this->assertSame('completed', $completed->fresh()->status);
        $this->assertNull($completed->fresh()->cancelled_at);
    }

    public function test_other_users_cannot_cancel_and_admin_cannot_reopen_cancelled_brief(): void
    {
        $owner = User::factory()->create();
        $other = User::factory()->create();
        $inquiry = $this->inquiry($owner);
        $this->actingAs($other)->patch(route('account.project-briefs.cancel', $inquiry))->assertForbidden();
        $this->actingAs($owner)->patch(route('account.project-briefs.cancel', $inquiry))->assertSessionHasNoErrors();
        $admin = User::factory()->create(['email' => 'admin@example.com']);
        config(['admin.emails' => [$admin->email]]);
        $this->actingAs($admin)->patch(route('admin.project-briefs.status', $inquiry), ['status' => 'in_progress'])
            ->assertSessionHasErrors('status');
        $this->assertSame('cancelled', $inquiry->fresh()->status);
    }

    public function test_pruning_deletes_only_cancelled_briefs_after_fourteen_days_and_their_files(): void
    {
        Storage::fake('local');
        $user = User::factory()->create();
        $due = $this->inquiry($user, 'cancelled');
        $due->update(['cancelled_at' => now()->subDays(14)]);
        $recent = $this->inquiry($user, 'cancelled');
        $recent->update(['cancelled_at' => now()->subDays(14)->addMinute()]);
        $active = $this->inquiry($user, 'completed');
        $active->update(['cancelled_at' => now()->subDays(20)]);
        $path = 'inquiry-chat/'.$due->id.'/image.png';
        Storage::disk('local')->put($path, 'image');
        ProjectInquiryMessage::create([
            'project_inquiry_id' => $due->id, 'sender_id' => $user->id,
            'sender_role' => 'user', 'sender_name' => $user->name, 'body' => 'Message', 'attachment_path' => $path,
        ]);
        $reviewPath = 'project-inquiry-reviews/'.$due->id.'/image.png';
        Storage::disk('local')->put($reviewPath, 'image');
        $this->artisan('model:prune', ['--model' => [ProjectInquiry::class]])->assertSuccessful();
        $this->assertDatabaseMissing('project_inquiries', ['id' => $due->id]);
        $this->assertDatabaseHas('project_inquiries', ['id' => $recent->id]);
        $this->assertDatabaseHas('project_inquiries', ['id' => $active->id]);
        $this->assertDatabaseCount('project_inquiry_messages', 0);
        Storage::disk('local')->assertMissing([$path, $reviewPath]);
    }
}
