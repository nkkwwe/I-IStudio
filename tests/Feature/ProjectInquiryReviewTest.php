<?php

namespace Tests\Feature;

use App\Models\ProjectInquiry;
use App\Models\ProjectInquiryReview;
use App\Models\ProjectInquiryReviewAttachment;
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
                'attachment_ids_json' => '[]',
                'attachments' => [$this->fakePng('first.png')],
            ])
            ->assertRedirect('/en/account/project-briefs');

        $review = ProjectInquiryReview::query()->sole();
        $firstPhoto = $review->attachments()->sole();
        $oldPath = $firstPhoto->attachment_path;
        $this->assertSame('4.25', $review->rating);
        $this->assertSame('Great collaboration.', $review->body);
        Storage::disk('local')->assertExists($oldPath);

        $this->actingAs($user)
            ->from('/en/account/project-briefs')
            ->post(route('account.project-briefs.review.save', $inquiry), [
                '_method' => 'PUT',
                'rating' => '5',
                'body' => 'Updated review',
                'attachment_ids_json' => json_encode([$firstPhoto->id]),
                'attachments' => [$this->fakePng('second.png')],
            ])
            ->assertRedirect('/en/account/project-briefs');

        $this->assertDatabaseCount('project_inquiry_reviews', 1);
        $this->assertDatabaseCount('project_inquiry_review_attachments', 2);
        $review->refresh();
        $this->assertSame('5.00', $review->rating);
        $this->assertSame('Updated review', $review->body);
        Storage::disk('local')->assertExists($oldPath);
        $photos = $review->attachments()->get();
        $this->assertCount(2, $photos);
        $secondPhoto = $photos->last();
        Storage::disk('local')->assertExists($secondPhoto->attachment_path);

        $this->actingAs($user)
            ->get('/en/account/project-briefs')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('Account/ProjectBriefs')
                ->where('inquiries.0.review.rating', 5)
                ->where('inquiries.0.review.body', 'Updated review')
                ->where('inquiries.0.review.attachments.1.name', 'second.png'));

        $updatedPaths = $photos->pluck('attachment_path')->all();
        $this->actingAs($user)
            ->from('/en/account/project-briefs')
            ->post(route('account.project-briefs.review.save', $inquiry), [
                '_method' => 'PUT',
                'rating' => '4.75',
                'body' => 'Updated without a photo',
                'attachment_ids_json' => '[]',
            ])
            ->assertRedirect('/en/account/project-briefs');

        $review->refresh();
        $this->assertSame('4.75', $review->rating);
        $this->assertDatabaseCount('project_inquiry_review_attachments', 0);
        foreach ($updatedPaths as $updatedPath) {
            Storage::disk('local')->assertMissing($updatedPath);
        }
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
                'attachment_ids_json' => '[]',
            ])
            ->assertStatus(409);

        $inquiry->forceFill(['status' => 'completed'])->save();

        $this->actingAs($otherUser)
            ->putJson(route('account.project-briefs.review.save', $inquiry), [
                'rating' => '5',
                'body' => 'Not my brief',
                'attachment_ids_json' => '[]',
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
                    'attachment_ids_json' => '[]',
                ])
                ->assertUnprocessable()
                ->assertJsonValidationErrors('rating');
        }

        $this->assertDatabaseCount('project_inquiry_reviews', 0);
    }

    public function test_review_can_keep_up_to_six_photos_and_rejects_a_seventh(): void
    {
        Storage::fake('local');
        $user = User::factory()->create();
        $inquiry = $this->createInquiry($user, 'completed');

        $this->actingAs($user)
            ->post(route('account.project-briefs.review.save', $inquiry), [
                '_method' => 'PUT',
                'rating' => '4.5',
                'body' => 'Six photos attached',
                'attachment_ids_json' => '[]',
                'attachments' => array_map(fn (int $number): UploadedFile => $this->fakePng("photo-{$number}.png"), range(1, 6)),
            ])
            ->assertRedirect();

        $review = ProjectInquiryReview::query()->sole();
        $photos = $review->attachments()->get();
        $this->assertCount(6, $photos);

        $this->actingAs($user)
            ->from('/en/account/project-briefs')
            ->post(route('account.project-briefs.review.save', $inquiry), [
                '_method' => 'PUT',
                'rating' => '4.75',
                'body' => 'Trying to add a seventh',
                'attachment_ids_json' => $photos->pluck('id')->toJson(),
                'attachments' => [$this->fakePng('seventh.png')],
            ])
            ->assertSessionHasErrors('attachments');

        $this->assertDatabaseCount('project_inquiry_review_attachments', 6);
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
        ]);
        $attachment = ProjectInquiryReviewAttachment::query()->create([
            'project_inquiry_review_id' => $review->id,
            'attachment_path' => $path,
            'attachment_name' => 'review.png',
            'attachment_mime' => 'image/png',
            'attachment_size' => 100,
        ]);

        $this->actingAs($otherUser)
            ->get(route('project-inquiry-review-attachments.show', $attachment))
            ->assertForbidden();

        $this->actingAs($owner)
            ->get(route('project-inquiry-review-attachments.show', $attachment))
            ->assertOk()
            ->assertHeader('Content-Type', 'image/png');

        $this->actingAs($admin)
            ->get(route('project-inquiry-review-attachments.show', $attachment))
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
