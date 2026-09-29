<?php

namespace Tests\Feature;

use App\Models\ProjectInquiry;
use App\Models\ProjectInquiryReview;
use App\Models\ProjectInquiryReviewAttachment;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class AdminAccessTest extends TestCase
{
    use RefreshDatabase;

    protected function setUp(): void
    {
        parent::setUp();

        config(['admin.emails' => ['admin@example.com', 'second-admin@example.com']]);
    }

    public function test_guests_are_sent_to_login_before_admin_check(): void
    {
        $this->get('/admin')
            ->assertRedirect(route('login'));
    }

    public function test_authenticated_non_admin_users_cannot_open_admin(): void
    {
        $this->actingAs(User::factory()->create(['email' => 'member@example.com']))
            ->get('/admin')
            ->assertForbidden();
    }

    public function test_configured_admin_can_open_admin_and_receives_admin_flag(): void
    {
        $this->actingAs(User::factory()->create(['email' => 'Admin@Example.com']))
            ->get('/admin')
            ->assertRedirect(route('admin.project-briefs'));

        $this->get('/admin/project-briefs')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/ProjectBriefs')
                ->where('auth.user.is_admin', true));
    }

    public function test_secondary_configured_admin_can_open_admin(): void
    {
        $this->actingAs(User::factory()->create(['email' => 'SECOND-ADMIN@example.com']))
            ->get('/admin')
            ->assertRedirect(route('admin.project-briefs'));

        $this->get('/admin/project-briefs')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/ProjectBriefs')
                ->where('auth.user.is_admin', true));
    }

    public function test_admin_can_view_a_briefs_user_review_and_photos(): void
    {
        $admin = User::factory()->create(['email' => 'admin@example.com']);
        $user = User::factory()->create(['email' => 'member@example.com']);
        $inquiry = ProjectInquiry::query()->create([
            'user_id' => $user->id,
            'client_name' => $user->name,
            'client_email' => $user->email,
            'client_contact' => null,
            'client_budget' => null,
            'service_type' => 'landing',
            'project_comment' => 'Test project brief',
            'status' => 'completed',
        ]);
        $review = ProjectInquiryReview::query()->create([
            'project_inquiry_id' => $inquiry->id,
            'user_id' => $user->id,
            'rating' => '4.75',
            'body' => 'Great collaboration.',
        ]);
        $attachment = ProjectInquiryReviewAttachment::query()->create([
            'project_inquiry_review_id' => $review->id,
            'attachment_path' => 'project-inquiry-reviews/test/review.jpg',
            'attachment_name' => 'review.jpg',
            'attachment_mime' => 'image/jpeg',
            'attachment_size' => 120,
        ]);

        $this->actingAs($admin)
            ->get('/admin/project-briefs')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Admin/ProjectBriefs')
                ->where('inquiries.0.review.rating', 4.75)
                ->where('inquiries.0.review.body', 'Great collaboration.')
                ->where('inquiries.0.review.attachments.0.name', 'review.jpg')
                ->where('inquiries.0.review.attachments.0.url', route('project-inquiry-review-attachments.show', $attachment)));

        $this->getJson('/admin/registered-users/'.$user->id)
            ->assertOk()
            ->assertJsonPath('id', $user->id)
            ->assertJsonPath('inquiries.0.id', $inquiry->id)
            ->assertJsonPath('inquiries.0.status', 'completed')
            ->assertJsonPath('inquiries.0.review.rating', 4.75)
            ->assertJsonPath('inquiries.0.review.attachments.0.name', 'review.jpg')
            ->assertJsonMissingPath('password')
            ->assertJsonMissingPath('remember_token')
            ->assertJsonMissingPath('google_id');

        $this->getJson('/admin/registered-users/'.$admin->id)
            ->assertOk()->assertJsonCount(0, 'inquiries');
        $this->actingAs($user)->getJson('/admin/registered-users/'.$admin->id)->assertForbidden();
    }
}
