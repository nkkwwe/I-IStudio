<?php

namespace App\Http\Controllers;

use App\Models\ProjectInquiry;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
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

    public function userDetails(User $user): JsonResponse
    {
        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'avatar' => $user->avatar,
            'created_at' => $user->created_at?->toISOString(),
            'updated_at' => $user->updated_at?->toISOString(),
            'email_verified_at' => $user->email_verified_at?->toISOString(),
            'is_admin' => $user->isAdmin(),
            'login_method' => $user->google_id ? 'Google' : 'Email',
            'inquiries' => $this->getInquiries($user->id),
        ]);
    }

    public function updateInquiryStatus(Request $request, ProjectInquiry $inquiry): RedirectResponse
    {
        $data = $request->validate([
            'status' => ['required', 'string', 'in:new,ready_to_start,in_progress,completed'],
        ]);

        $inquiry->forceFill(['status' => $data['status']])->save();

        return back();
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

    private function getInquiries(?int $userId = null)
    {
        $inquiries = ProjectInquiry::query()
            ->when($userId !== null, fn ($query) => $query->where('user_id', $userId))
            ->with('user:id,name,email')
            ->with('review.attachments')
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
                'brief_data' => $inquiry->brief_data,
                'lead_context' => $inquiry->lead_context,
                'site_audit' => $inquiry->site_audit,
                'status' => $inquiry->status,
                'created_at' => $inquiry->created_at?->toISOString(),
                'user' => $inquiry->user ? [
                    'id' => $inquiry->user->id,
                    'name' => $inquiry->user->name,
                    'email' => $inquiry->user->email,
                ] : null,
                'review' => $inquiry->review ? [
                    'rating' => (float) $inquiry->review->rating,
                    'body' => $inquiry->review->body,
                    'attachments' => $inquiry->review->attachments
                        ->map(fn ($attachment): array => [
                            'id' => $attachment->id,
                            'name' => $attachment->attachment_name,
                            'url' => route('project-inquiry-review-attachments.show', ['attachment' => $attachment->id]),
                        ])
                        ->values(),
                ] : null,
            ])
            ->values();

        return $inquiries;
    }
}
