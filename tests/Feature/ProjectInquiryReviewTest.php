<?php

namespace Tests\Feature;

use App\Models\ProjectInquiry;
use App\Models\ProjectInquiryReview;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class ProjectInquiryReviewTest extends TestCase
{
    use RefreshDatabase;

    public function test_owner_can_create_and_edit_a_review_for_a_completed_brief(): void
    {
        Storage::fake('local');
        $user = User::factory()->create();
        $inquiry = $this->createInquiry($user, 'completed');

        $this->actingAs($user)
            ->from('/en/account/project-briefs')
            ->post(route('account.project-briefs.review.save', $inquiry), [
                '_method' => 'PUT',
                'rating' => '4.25',
                'body' => ' Great collaboration. ',
                'attachment' => $this->fakePng('first.png'),
            ])
            ->assertRedirect('/en/account/project-briefs');

        $review = ProjectInquiryReview::query()->sole();
        $oldPath = $review->attachment_path;
        $this->assertSame('4.25', $review->rating);
        $this->assertSame('Great collaboration.', $review->body);
        Storage::disk('local')->assertExists($oldPath);

        $this->actingAs($user)
            ->from('/en/account/project-briefs')
            ->post(route('account.project-briefs.review.save', $inquiry), [
                '_method' => 'PUT',
                'rating' => '5',
                'body' => 'Updated review',
                'attachment' => $this->fakePng('second.png'),
            ])
            ->assertRedirect('/en/account/project-briefs');

        $this->assertDatabaseCount('project_inquiry_reviews', 1);
        $review->refresh();
        $this->assertSame('5.00', $review->rating);
        $this->assertSame('Updated review', $review->body);
        Storage::disk('local')->assertMissing($oldPath);
        Storage::disk('local')->assertExists($review->attachment_path);

        $this->actingAs($user)
            ->get('/en/account/project-briefs')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Account/ProjectBriefs')
                ->where('inquiries.0.review.rating', 5)
                ->where('inquiries.0.review.body', 'Updated review')
                ->where('inquiries.0.review.attachment_name', 'second.png'));

        $updatedPath = $review->attachment_path;
        $this->actingAs($user)
            ->from('/en/account/project-briefs')
            ->put(route('account.project-briefs.review.save', $inquiry), [
                'rating' => '4.75',
                'body' => 'Updated without a photo',
                'remove_attachment' => '1',
            ])
            ->assertRedirect('/en/account/project-briefs');

        $review->refresh();
        $this->assertSame('4.75', $review->rating);
        $this->assertNull($review->attachment_path);
        Storage::disk('local')->assertMissing($updatedPath);
    }

    public function test_review_requires_a_completed_brief_and_the_owning_user(): void
    {
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $inquiry = $this->createInquiry($owner, 'in_progress');

        $this->actingAs($owner)
            ->putJson(route('account.project-briefs.review.save', $inquiry), [
                'rating' => '5',
                'body' => 'Not finished yet',
            ])
            ->assertStatus(409);

        $inquiry->forceFill(['status' => 'completed'])->save();

        $this->actingAs($otherUser)
            ->putJson(route('account.project-briefs.review.save', $inquiry), [
                'rating' => '5',
                'body' => 'Not my brief',
            ])
            ->assertForbidden();

        $this->assertDatabaseCount('project_inquiry_reviews', 0);
    }

    public function test_rating_is_limited_to_quarter_star_steps_between_one_and_five(): void
    {
        $user = User::factory()->create();
        $inquiry = $this->createInquiry($user, 'completed');

        foreach (['0.75', '5.25', '4.1'] as $rating) {
            $this->actingAs($user)
                ->putJson(route('account.project-briefs.review.save', $inquiry), [
                    'rating' => $rating,
                    'body' => 'Valid review text',
                ])
                ->assertUnprocessable()
                ->assertJsonValidationErrors('rating');
        }

        $this->assertDatabaseCount('project_inquiry_reviews', 0);
    }

    public function test_only_owner_or_admin_can_view_review_photo(): void
    {
        Storage::fake('local');
        config(['admin.emails' => ['admin@example.com']]);
        $owner = User::factory()->create();
        $otherUser = User::factory()->create();
        $admin = User::factory()->create(['email' => 'admin@example.com']);
        $inquiry = $this->createInquiry($owner, 'completed');
        $path = $this->fakePng('review.png')->store('project-inquiry-reviews/'.$inquiry->id, 'local');
        $review = ProjectInquiryReview::query()->create([
            'project_inquiry_id' => $inquiry->id,
            'user_id' => $owner->id,
            'rating' => '4.75',
            'body' => 'Great work',
            'attachment_path' => $path,
            'attachment_name' => 'review.png',
            'attachment_mime' => 'image/png',
            'attachment_size' => 100,
        ]);

        $this->actingAs($otherUser)
            ->get(route('project-inquiry-reviews.attachment', $review))
            ->assertForbidden();

        $this->actingAs($owner)
            ->get(route('project-inquiry-reviews.attachment', $review))
            ->assertOk()
            ->assertHeader('Content-Type', 'image/png');

        $this->actingAs($admin)
            ->get(route('project-inquiry-reviews.attachment', $review))
            ->assertOk()
            ->assertHeader('Content-Type', 'image/png');
    }

    private function createInquiry(User $user, string $status): ProjectInquiry
    {
        return ProjectInquiry::query()->create([
            'user_id' => $user->id,
            'client_name' => $user->name,
            'client_email' => $user->email,
            'client_contact' => null,
            'client_budget' => null,
            'service_type' => 'landing',
            'project_comment' => 'Test project brief',
            'status' => $status,
        ]);
    }

    private function fakePng(string $name): UploadedFile
    {
        $content = base64_decode('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAIAAACQd1PeAAAADUlEQVR4nGP4z8AAAAMBAQDJ/pLvAAAAAElFTkSuQmCC');

        return UploadedFile::fake()->createWithContent($name, $content ?: '');
    }
}
