<?php

namespace Tests\Feature;

use App\Models\ProjectInquiry;
use App\Models\ProjectInquiryMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class InquiryChatMessageActionsTest extends TestCase
{
    use RefreshDatabase;

    public function test_author_can_edit_text_without_changing_photos_dates_or_read_receipts(): void
    {
        $user = User::factory()->create();
        $inquiry = $this->inquiry($user);
        $message = $this->message($inquiry, $user);
        $message->update(['read_at' => now(), 'attachments' => [['path' => 'photo.webp', 'name' => 'photo.webp', 'mime' => 'image/webp']]]);
        $original = $message->fresh();
        $this->actingAs($user)->patchJson(route('account.project-briefs.messages.update', [$inquiry, $message]), ['body' => 'Updated text'])
            ->assertOk()->assertJsonPath('message.body', 'Updated text')->assertJsonPath('message.can_manage', true);
        $updated = $message->fresh();
        $this->assertNotNull($updated->edited_at);
        $this->assertEquals($original->created_at, $updated->created_at);
        $this->assertEquals($original->read_at, $updated->read_at);
        $this->assertEquals($original->attachments, $updated->attachments);
        $this->patchJson(route('account.project-briefs.messages.update', [$inquiry, $message]), ['body' => '   '])
            ->assertOk()->assertJsonPath('message.body', '');
    }

    public function test_foreign_sender_role_or_inquiry_cannot_be_modified(): void
    {
        config(['admin.emails' => ['one@example.com', 'two@example.com']]);
        $user = User::factory()->create();
        $admin = User::factory()->create(['email' => 'one@example.com']);
        $otherAdmin = User::factory()->create(['email' => 'two@example.com']);
        $inquiry = $this->inquiry($user);
        $userMessage = $this->message($inquiry, $user);
        $adminMessage = $this->message($inquiry, $admin, 'admin');
        foreach (['patchJson', 'deleteJson'] as $method) {
            $this->actingAs($user)->{$method}(route('account.project-briefs.messages.update', [$inquiry, $adminMessage]), ['body' => 'Invalid'])->assertForbidden();
            $this->actingAs($otherAdmin)->{$method}(route('admin.project-briefs.messages.update', [$inquiry, $adminMessage]), ['body' => 'Invalid'])->assertForbidden();
            $this->actingAs($admin)->{$method}(route('admin.project-briefs.messages.update', [$inquiry, $userMessage]), ['body' => 'Invalid'])->assertForbidden();
            $this->actingAs($user)->{$method}(route('account.project-briefs.messages.update', [$this->inquiry($user), $userMessage]), ['body' => 'Invalid'])->assertNotFound();
            $this->actingAs(User::factory()->create())->{$method}(route('account.project-briefs.messages.update', [$inquiry, $userMessage]), ['body' => 'Invalid'])->assertForbidden();
        }
        $this->assertDatabaseHas('project_inquiry_messages', ['id' => $userMessage->id, 'body' => 'Original']);
        $this->assertDatabaseHas('project_inquiry_messages', ['id' => $adminMessage->id, 'body' => 'Original']);
        $this->actingAs($admin)->patchJson(route('admin.project-briefs.messages.update', [$inquiry, $adminMessage]), ['body' => 'Admin edit'])->assertOk();
    }

    public function test_empty_or_overlong_text_is_rejected_and_unchanged_text_is_not_marked_edited(): void
    {
        $user = User::factory()->create();
        $inquiry = $this->inquiry($user);
        $message = $this->message($inquiry, $user);
        $url = route('account.project-briefs.messages.update', [$inquiry, $message]);
        $this->actingAs($user)->patchJson($url, ['body' => 'Original'])->assertOk()->assertJsonPath('message.edited_at', null);
        foreach (['  ', str_repeat('x', 5001)] as $body) {
            $this->patchJson($url, ['body' => $body])->assertUnprocessable()->assertJsonValidationErrors('body');
        }
        $this->assertNull($message->fresh()->edited_at);
    }

    public function test_deleting_own_album_removes_files_and_attachment_access(): void
    {
        Storage::fake('local');
        $user = User::factory()->create();
        $inquiry = $this->inquiry($user);
        $message = $this->message($inquiry, $user);
        Storage::disk('local')->put('first.webp', 'first');
        Storage::disk('local')->put('second.webp', 'second');
        $message->update(['attachments' => [
            ['path' => 'first.webp', 'name' => 'first.webp', 'mime' => 'image/webp'],
            ['path' => 'second.webp', 'name' => 'second.webp', 'mime' => 'image/webp'],
        ]]);
        $this->actingAs($user)->deleteJson(route('account.project-briefs.messages.destroy', [$inquiry, $message]))->assertOk();
        $this->assertDatabaseMissing('project_inquiry_messages', ['id' => $message->id]);
        Storage::disk('local')->assertMissing('first.webp');
        Storage::disk('local')->assertMissing('second.webp');
        $this->get(route('project-inquiry-messages.attachment', $message))->assertNotFound();
    }

    private function inquiry(User $user): ProjectInquiry
    {
        return ProjectInquiry::create(['user_id' => $user->id, 'client_name' => $user->name, 'client_email' => $user->email,
            'service_type' => 'landing', 'project_comment' => 'Message actions test', 'status' => 'new']);
    }

    private function message(ProjectInquiry $inquiry, User $user, string $role = 'user'): ProjectInquiryMessage
    {
        return ProjectInquiryMessage::create(['project_inquiry_id' => $inquiry->id, 'sender_id' => $user->id,
            'sender_role' => $role, 'sender_name' => $user->name, 'body' => 'Original']);
    }
}
