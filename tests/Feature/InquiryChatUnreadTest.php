<?php

namespace Tests\Feature;

use App\Models\ProjectInquiry;
use App\Models\ProjectInquiryMessage;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class InquiryChatUnreadTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config(['admin.emails' => ['admin@example.com']]);
    }

    public function test_user_receives_total_and_per_inquiry_unread_counts(): void
    {
        $user = User::factory()->create();
        $admin = User::factory()->create(['email' => 'admin@example.com']);
        $firstInquiry = $this->createInquiry($user);
        $secondInquiry = $this->createInquiry($user);

        $this->createMessage($firstInquiry, $admin, 'admin');
        $this->createMessage($firstInquiry, $admin, 'admin');
        $this->createMessage($firstInquiry, $user, 'user');
        $this->createMessage($secondInquiry, $admin, 'admin');

        $this->actingAs($user)
            ->get('/account')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Account')
                ->where('auth.unread_chat_count', 3));

        $this->actingAs($user)
            ->get('/account/project-briefs')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Account/ProjectBriefs')
                ->has('inquiries', 2)
                ->where('inquiries.0.id', $secondInquiry->id)
                ->where('inquiries.0.unread_count', 1)
                ->where('inquiries.1.id', $firstInquiry->id)
                ->where('inquiries.1.unread_count', 2));
    }

    public function test_opening_chat_marks_only_admin_messages_as_read_for_user(): void
    {
        $user = User::factory()->create();
        $admin = User::factory()->create(['email' => 'admin@example.com']);
        $inquiry = $this->createInquiry($user);
        $incoming = $this->createMessage($inquiry, $admin, 'admin');
        $outgoing = $this->createMessage($inquiry, $user, 'user');

        $this->actingAs($user)
            ->getJson(route('account.project-briefs.messages', $inquiry))
            ->assertOk()
            ->assertJsonCount(2, 'messages')
            ->assertJsonPath('unread_count', 0);

        $this->assertNotNull($incoming->fresh()->read_at);
        $this->assertNull($outgoing->fresh()->read_at);

        $this->actingAs($user)
            ->getJson(route('account.project-briefs.unread-counts'))
            ->assertOk()
            ->assertJsonPath('unread_count', 0)
            ->assertJsonPath('inquiries.0.unread_count', 0);
    }

    public function test_admin_reading_chat_does_not_clear_users_unread_admin_messages(): void
    {
        $user = User::factory()->create();
        $admin = User::factory()->create(['email' => 'admin@example.com']);
        $inquiry = $this->createInquiry($user);
        $fromUser = $this->createMessage($inquiry, $user, 'user');
        $fromAdmin = $this->createMessage($inquiry, $admin, 'admin');

        $this->actingAs($admin)
            ->getJson(route('admin.project-briefs.messages', $inquiry))
            ->assertOk()
            ->assertJsonCount(2, 'messages');

        $this->assertNotNull($fromUser->fresh()->read_at);
        $this->assertNull($fromAdmin->fresh()->read_at);
    }

    private function createInquiry(User $user): ProjectInquiry
    {
        return ProjectInquiry::query()->create([
            'user_id' => $user->id,
            'client_name' => $user->name,
            'client_email' => $user->email,
            'client_contact' => null,
            'client_budget' => null,
            'service_type' => 'landing',
            'project_comment' => 'Test project brief',
            'status' => 'new',
        ]);
    }

    private function createMessage(ProjectInquiry $inquiry, User $sender, string $senderRole): ProjectInquiryMessage
    {
        return ProjectInquiryMessage::query()->create([
            'project_inquiry_id' => $inquiry->id,
            'sender_id' => $sender->id,
            'sender_role' => $senderRole,
            'sender_name' => $sender->name,
            'body' => 'Test message',
        ]);
    }
}
