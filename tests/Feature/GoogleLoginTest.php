<?php

namespace Tests\Feature;

use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Laravel\Socialite\Facades\Socialite;
use Laravel\Socialite\Two\User as GoogleUser;
use Tests\TestCase;

class GoogleLoginTest extends TestCase
{
    use RefreshDatabase;

    public function test_google_callback_logs_in_and_redirects_to_account(): void
    {
        $googleUser = (new GoogleUser)->map(['id' => 'test-google-id', 'email' => 'member@example.com', 'name' => 'Member', 'avatar' => null]);
        $provider = \Mockery::mock(\Laravel\Socialite\Contracts\Provider::class);
        $provider->shouldReceive('user')->once()->andReturn($googleUser);
        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $this->withSession(['site_language' => 'en', 'url.intended' => '/en/account'])
            ->get('/auth/google/callback?state=test&code=test')
            ->assertRedirect('/en/account');
        $this->assertAuthenticatedAs(User::where('email', 'member@example.com')->firstOrFail());
    }
    public function test_invalid_oauth_state_cannot_authenticate(): void
    {
        $provider = \Mockery::mock(\Laravel\Socialite\Contracts\Provider::class);
        $provider->shouldReceive('user')->once()->andThrow(new \Laravel\Socialite\Two\InvalidStateException);
        Socialite::shouldReceive('driver')->with('google')->andReturn($provider);

        $this->get('/auth/google/callback?state=invalid&code=invalid')
            ->assertRedirect(route('login.localized', ['locale' => 'en']))
            ->assertSessionHasErrors('google');
        $this->assertGuest();
        $this->assertDatabaseCount('users', 0);
    }
}
