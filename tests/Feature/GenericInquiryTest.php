<?php

namespace Tests\Feature;

use App\Models\ProjectInquiry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GenericInquiryTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_client_can_submit_generic_brief_without_ads_consent(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post('/en/inquiry', [
            'service_type' => 'landing',
            'client_name' => 'Landing client',
            'client_contact' => '@studio',
            'client_budget' => '$500',
            'project_comment' => 'A compact landing page for our studio.',
        ])->assertSessionHasNoErrors()->assertSessionHas('inquiry_submitted', true);

        $inquiry = ProjectInquiry::query()->sole();
        $this->assertSame($user->id, $inquiry->user_id);
        $this->assertSame('landing', $inquiry->service_type);
        $this->assertSame('A compact landing page for our studio.', $inquiry->project_comment);
    }

    public function test_initial_contact_still_requires_consent(): void
    {
        $this->post('/en/inquiry', [
            'submission_kind' => 'initial',
            'service_type' => 'consultation',
            'client_name' => 'Client',
            'client_email' => 'client@example.com',
        ])->assertSessionHasErrors('ads_consent');

        $this->assertDatabaseCount('project_inquiries', 0);
    }

    public function test_guest_quick_inquiry_keeps_reply_contact_and_business_profile_separate(): void
    {
        $this->post('/en/inquiry', [
            'service_type' => 'landing',
            'client_name' => 'Guest client',
            'reply_contact' => 'guest@example.com',
            'client_contact' => 'https://instagram.com/business',
            'project_comment' => 'We need a website for our bakery.',
        ])->assertSessionHasNoErrors()
            ->assertRedirect('/en/inquiry?service=landing')
            ->assertSessionHas('inquiry_submitted', true);

        $inquiry = ProjectInquiry::query()->sole();
        $this->assertNull($inquiry->user_id);
        $this->assertSame('guest@example.com', $inquiry->client_contact);
        $this->assertSame('guest@example.com', $inquiry->client_email);
        $this->assertSame(['business_profile' => 'https://instagram.com/business'], $inquiry->brief_data);
        $this->assertSame('We need a website for our bakery.', $inquiry->project_comment);
    }

    public function test_guest_quick_inquiry_requires_a_reply_contact(): void
    {
        $this->post('/en/inquiry', [
            'service_type' => 'other',
            'client_name' => 'Guest',
            'reply_contact' => '',
            'project_comment' => 'Help us choose a service.',
        ])->assertSessionHasErrors('reply_contact');
        $this->assertDatabaseCount('project_inquiries', 0);
    }

    public function test_guest_can_use_a_messenger_and_apply_an_estimate(): void
    {
        $this->post('/en/inquiry', [
            'service_type' => 'corporate',
            'client_name' => 'Guest',
            'reply_contact' => 'Telegram @guest',
            'project_comment' => 'A business website.',
            'calculator_summary' => 'Business website: $900',
        ])->assertSessionHasNoErrors()->assertSessionHas('inquiry_submitted', true);

        $inquiry = ProjectInquiry::query()->sole();
        $this->assertSame('Telegram @guest', $inquiry->client_contact);
        $this->assertStringContainsString('Business website: $900', $inquiry->project_comment);
    }

    public function test_signed_in_client_can_use_account_for_reply_and_keep_business_link(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->post('/en/inquiry', [
            'service_type' => 'redesign',
            'client_name' => 'Client',
            'reply_contact' => '',
            'client_contact' => 'https://example.com',
            'project_comment' => 'Please redesign our website.',
        ])->assertSessionHasNoErrors()->assertSessionHas('inquiry_submitted', true);

        $inquiry = ProjectInquiry::query()->sole();
        $this->assertSame($user->email, $inquiry->client_email);
        $this->assertNull($inquiry->client_contact);
        $this->assertSame(['business_profile' => 'https://example.com'], $inquiry->brief_data);
    }
}
