<?php

namespace App\Http\Middleware;

use App\Models\ProjectInquiryMessage;
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
        $user = $request->user();
        $unreadChatCount = $user
            ? ProjectInquiryMessage::query()
                ->where('sender_role', 'admin')
                ->whereNull('read_at')
                ->whereHas('inquiry', fn ($query) => $query->where('user_id', $user->id))
                ->count()
            : 0;

        return [
            ...parent::share($request),
            'auth' => [
                'unread_chat_count' => $unreadChatCount,
                'user' => $user
                    ? [
                        ...$user->only('id', 'name', 'email', 'avatar', 'created_at'),
                        'is_admin' => $user->isAdmin(),
                    ]
                    : null,
            ],
            'flash' => [
                'verification_sent' => $request->session()->get('verification_sent'),
                'verification_success' => $request->session()->get('verification_success'),
                'profile_updated' => $request->session()->get('profile_updated'),
                'account_deleted' => $request->session()->get('account_deleted'),
                'inquiry_requires_auth' => $request->session()->get('inquiry_requires_auth'),
                'inquiry_submitted' => $request->session()->get('inquiry_submitted'),
                'inquiry_ticket' => $request->session()->get('inquiry_ticket'),
                'inquiry_service' => $request->session()->get('inquiry_service'),
                'inquiry_budget' => $request->session()->get('inquiry_budget'),
            ],
            'registration' => [
                'email' => $request->session()->get('registration.email'),
                'code_sent' => (bool) $request->session()->get('registration.code_sent'),
                'verified' => (bool) $request->session()->get('registration.verified'),
            ],
        ];
    }
}
