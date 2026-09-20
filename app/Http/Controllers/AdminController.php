<?php

namespace App\Http\Controllers;

use App\Models\ProjectInquiry;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class AdminController extends Controller
{
    public function index(): RedirectResponse
    {
        return redirect()->route('admin.project-briefs');
    }

    public function projectBriefs(): Response
    {
        return Inertia::render('Admin/ProjectBriefs', [
            'inquiries' => $this->getInquiries(),
        ]);
    }

    public function registeredUsers(): Response
    {
        return Inertia::render('Admin/RegisteredUsers', [
            'users' => $this->getUsers(),
        ]);
    }

    private function getUsers()
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

        return $users;
    }

    private function getInquiries()
    {
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

        return $inquiries;
    }
}
