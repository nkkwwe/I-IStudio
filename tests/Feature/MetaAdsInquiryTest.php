<?php

namespace Tests\Feature;

use App\Models\ProjectInquiry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

class MetaAdsInquiryTest extends TestCase
{
    use RefreshDatabase;

    private function payload(): array
    {
        return [
            'service_type' => 'meta-ads',
            'client_name' => 'Meta client',
            'client_email' => 'client@example.com',
            'client_budget' => '$300–500',
            'project_comment' => 'Meta Ads — Facebook & Instagram',
            'ads_consent' => '1',
            'brief_data' => json_encode([
                'brand_name' => 'Local studio',
                'main_goal' => 'messages',
                'destinations' => ['instagram', 'messengerChat'],
                'available_assets' => ['photos', 'videos'],
                'creative_support' => 'adapt',
                'monthly_budget' => 'budget500',
            ]),
            'lead_context' => json_encode(['source' => 'Instagram', 'utm' => ['utm_campaign' => 'launch'], 'device' => 'mobile']),
        ];
    }

    public function test_guest_can_submit_meta_brief_without_a_website_or_login(): void
    {
        $this->post('/ua/inquiry', $this->payload())
            ->assertSessionHasNoErrors()
            ->assertRedirect('/ua/inquiry')
            ->assertSessionHas('inquiry_service', 'meta-ads');

        $inquiry = ProjectInquiry::query()->sole();
        $this->assertNull($inquiry->user_id);
        $this->assertNull($inquiry->site_audit);
        $this->assertSame('client@example.com', $inquiry->client_email);
        $this->assertSame(['instagram', 'messengerChat'], $inquiry->brief_data['destinations']);
        $this->assertSame(['photos', 'videos'], $inquiry->brief_data['available_assets']);
        $this->assertSame('meta', $inquiry->brief_data['platform']);
        $this->assertTrue($inquiry->brief_data['consent']);
        $this->assertSame('launch', $inquiry->lead_context['utm']['utm_campaign']);
    }

    public function test_meta_brief_requires_email_consent_and_brand(): void
    {
        $payload = $this->payload();
        unset($payload['ads_consent'], $payload['client_email']);
        $this->post('/en/inquiry', $payload)->assertSessionHasErrors(['ads_consent', 'client_email']);

        $payload = $this->payload();
        $payload['brief_data'] = json_encode(['brand_name' => '']);
        $this->post('/en/inquiry', $payload)->assertSessionHasErrors('brief.brand_name');
        $this->assertDatabaseCount('project_inquiries', 0);
    }

    public function test_meta_brief_rejects_malformed_answers(): void
    {
        $payload = $this->payload();
        $payload['brief_data'] = json_encode(['brand_name' => 'Studio', 'website_url' => ['invalid'], 'destinations' => ['invalid']]);
        $this->post('/en/inquiry', $payload)->assertSessionHasErrors(['brief.website_url', 'brief.destinations.0']);
        $this->assertDatabaseCount('project_inquiries', 0);
    }

    public function test_account_and_admin_receive_the_saved_meta_brief(): void
    {
        $user = User::factory()->create();
        $this->actingAs($user)->post('/ro/inquiry', $this->payload())->assertSessionHasNoErrors();
        $this->get('/ro/account/project-briefs')->assertInertia(fn (Assert $page) => $page
            ->component('Account/ProjectBriefs')
            ->where('inquiries.0.service_type', 'meta-ads')
            ->where('inquiries.0.brief_data.main_goal', 'messages'));

        $admin = User::factory()->create(['email' => 'admin@example.com']);
        config(['admin.emails' => [$admin->email]]);
        $this->actingAs($admin)->get('/admin/project-briefs')->assertInertia(fn (Assert $page) => $page
            ->component('Admin/ProjectBriefs')
            ->where('inquiries.0.service_type', 'meta-ads')
            ->where('inquiries.0.brief_data.creative_support', 'adapt'));
    }

    public function test_existing_google_ads_guest_submission_still_works(): void
    {
        $payload = $this->payload();
        $payload['service_type'] = 'ads';
        $payload['brief_data'] = json_encode(['brand_name' => 'Google client', 'website_url' => 'https://example.com']);
        $this->post('/en/inquiry', $payload)->assertSessionHasNoErrors()->assertSessionHas('inquiry_service', 'ads');
        $this->assertSame('pending', ProjectInquiry::query()->sole()->site_audit['status']);
    }
}
