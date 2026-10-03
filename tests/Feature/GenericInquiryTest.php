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
}
