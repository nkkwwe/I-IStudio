<?php

namespace Tests\Feature;

use App\Models\ProjectInquiry;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Str;
use Tests\TestCase;

class InquiryChatActivityTest extends TestCase
{
    use RefreshDatabase;

    public function test_presence_and_typing_work_in_both_directions_and_expire(): void
    {
        config(['admin.emails' => ['admin@example.com']]);
        $user = User::factory()->create();
        $admin = User::factory()->create(['email' => 'admin@example.com']);
        $inquiry = $this->inquiry($user);
        $userRoute = route('account.project-briefs.activity', $inquiry);
        $adminRoute = route('admin.project-briefs.activity', $inquiry);
        $userData = ['client_id' => (string) Str::uuid(), 'active' => true, 'typing' => true];
        $adminData = ['client_id' => (string) Str::uuid(), 'active' => true, 'typing' => true];
        $this->actingAs($user)->postJson($userRoute, $userData)->assertOk()->assertJsonPath('peer_present', false);
        $this->actingAs($admin)->postJson($adminRoute, $adminData)->assertOk()
            ->assertJsonPath('peer_present', true)->assertJsonPath('peer_typing', true);
        $this->actingAs($user)->postJson($userRoute, $userData)->assertOk()
            ->assertJsonPath('peer_present', true)->assertJsonPath('peer_typing', true);
        $this->travel(7)->seconds();
        $this->postJson($userRoute, $userData)->assertJsonPath('peer_present', true)->assertJsonPath('peer_typing', false);
        $this->travel(6)->seconds();
        $this->postJson($userRoute, $userData)->assertJsonPath('peer_present', false)->assertJsonPath('peer_typing', false);
    }

    public function test_closing_one_tab_preserves_other_tab_and_access_is_restricted(): void
    {
        config(['admin.emails' => ['admin@example.com']]);
        $user = User::factory()->create();
        $admin = User::factory()->create(['email' => 'admin@example.com']);
        $outsider = User::factory()->create();
        $inquiry = $this->inquiry($user);
        $route = route('account.project-briefs.activity', $inquiry);
        $first = ['client_id' => (string) Str::uuid(), 'active' => true, 'typing' => false];
        $second = [...$first, 'client_id' => (string) Str::uuid()];
        $this->actingAs($user)->postJson($route, $first)->assertOk();
        $this->postJson($route, $second)->assertOk();
        $this->postJson($route, [...$first, 'active' => false])->assertOk();
        $this->actingAs($admin)->postJson(route('admin.project-briefs.activity', $inquiry), $first)
            ->assertOk()->assertJsonPath('peer_present', true);
        $this->actingAs($user)->postJson($route, [...$second, 'active' => false])->assertOk();
        $this->actingAs($admin)->postJson(route('admin.project-briefs.activity', $inquiry), $first)
            ->assertJsonPath('peer_present', false);
        $this->actingAs($outsider)->postJson($route, $first)->assertForbidden();
        $this->postJson(route('admin.project-briefs.activity', $inquiry), $first)->assertForbidden();
        $this->assertDatabaseCount('project_inquiry_messages', 0);
        $inquiry->delete();
        $this->assertDatabaseCount('inquiry_chat_activities', 0);
    }

    private function inquiry(User $user): ProjectInquiry
    {
        return ProjectInquiry::create(['user_id' => $user->id, 'client_name' => $user->name,
            'client_email' => $user->email, 'service_type' => 'landing', 'project_comment' => 'Activity test', 'status' => 'new']);
    }
}
