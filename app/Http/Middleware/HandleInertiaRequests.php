<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return [
            ...parent::share($request),
            'auth' => [
                'user' => $request->user()?->only('id', 'name', 'email', 'avatar', 'created_at'),
            ],
            'flash' => [
                'verification_sent' => $request->session()->get('verification_sent'),
                'verification_success' => $request->session()->get('verification_success'),
            ],
            'registration' => [
                'email' => $request->session()->get('registration.email'),
                'code_sent' => (bool) $request->session()->get('registration.code_sent'),
                'verified' => (bool) $request->session()->get('registration.verified'),
            ],
        ];
    }
}
