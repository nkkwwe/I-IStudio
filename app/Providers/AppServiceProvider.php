<?php

namespace App\Providers;

use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\RateLimiter;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        RateLimiter::for('login', function (Request $request): array {
            $email = mb_strtolower(trim((string) $request->input('email'))) ?: 'missing';

            return [
                Limit::perMinute(30)->by('login-ip:'.$request->ip()),
                Limit::perMinute(10)->by('login-email:'.$email),
            ];
        });

        RateLimiter::for('user-email-code', function (Request $request): array {
            $email = mb_strtolower(trim((string) $request->input('email'))) ?: 'missing';

            return [
                Limit::perMinute(3)->by('user-email-code-ip:'.$request->ip()),
                Limit::perHour(8)->by('user-email-code-email:'.$email),
            ];
        });

        RateLimiter::for('user-email-verify', function (Request $request): array {
            $email = $request->session()->get('registration.email') ?? 'missing';

            return [
                Limit::perMinute(10)->by('user-email-verify-ip:'.$request->ip()),
                Limit::perMinute(10)->by('user-email-verify-email:'.$email),
            ];
        });
    }
}
