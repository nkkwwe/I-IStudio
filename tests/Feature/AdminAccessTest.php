<?php

namespace Tests\Feature;

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
}
