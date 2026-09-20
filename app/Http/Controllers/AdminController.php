<?php

namespace App\Http\Controllers;

use App\Models\ProjectInquiry;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function index(): Response
    {
        $users = User::query()
            ->latest('created_at')
            ->get(['id', 'name', 'email', 'avatar', 'created_at'])
            ->map(fn (User $user): array => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar,
                'created_at' => $user->created_at?->toISOString(),
            ])
            ->values();

        $inquiries = ProjectInquiry::query()
            ->with('user:id,name,email')
            ->latest('created_at')
            ->get()
            ->map(fn (ProjectInquiry $inquiry): array => [
                'id' => $inquiry->id,
                'ticket' => sprintf('#II-%04d', $inquiry->id),
                'name' => $inquiry->client_name,
                'email' => $inquiry->client_email,
                'contact' => $inquiry->client_contact,
                'budget' => $inquiry->client_budget,
                'service_type' => $inquiry->service_type,
                'comment' => $inquiry->project_comment,
                'status' => $inquiry->status,
                'created_at' => $inquiry->created_at?->toISOString(),
                'user' => $inquiry->user ? [
                    'id' => $inquiry->user->id,
                    'name' => $inquiry->user->name,
                    'email' => $inquiry->user->email,
                ] : null,
            ])
            ->values();

        return Inertia::render('Admin/Index', [
            'users' => $users,
            'inquiries' => $inquiries,
        ]);
    }
}
