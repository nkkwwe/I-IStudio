<?php

namespace Tests\Feature;

use App\Models\ProjectInquiry;
use App\Models\ProjectInquiryReview;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class HomeReviewsTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_shares_only_completed_reviews_without_private_account_or_brief_data(): void
    {
        $user = User::factory()->create(['name' => 'Alex Example']);
        foreach (['completed', 'in_progress'] as $status) {
            $inquiry = ProjectInquiry::create([
                'user_id' => $user->id, 'client_name' => 'Private company',
                'client_email' => $user->email, 'service_type' => 'landing',
                'project_comment' => 'Private project details', 'status' => $status,
            ]);
            ProjectInquiryReview::create([
                'project_inquiry_id' => $inquiry->id, 'user_id' => $user->id,
                'rating' => 4.25, 'body' => 'Great collaboration.',
            ]);
        }

        foreach (['en', 'ua', 'ro'] as $locale) {
            $this->get('/'.$locale)->assertInertia(fn (Assert $page) => $page
                ->component('Home')->has('reviews', 1)
                ->where('reviews.0.author', 'Alex')
                ->where('reviews.0.rating', 4.25)
                ->where('reviews.0.service', 'landing')
                ->where('reviews.0.body', 'Great collaboration.')
                ->missing('reviews.0.email')->missing('reviews.0.user')
                ->missing('reviews.0.inquiry')->missing('reviews.0.attachments'));
        }
    }

    public function test_home_can_render_without_reviews(): void
    {
        $this->get('/en')->assertInertia(fn (Assert $page) => $page->component('Home')->has('reviews', 0));
    }
}
