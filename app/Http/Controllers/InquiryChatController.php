<?php

namespace App\Http\Controllers;

use App\Models\ProjectInquiry;
use App\Models\ProjectInquiryMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class InquiryChatController extends Controller
{
    public function index(Request $request, ProjectInquiry $inquiry): JsonResponse
    {
        $this->ensureCanAccess($request, $inquiry);

        return response()->json([
            'messages' => $this->serializeMessages($inquiry),
        ]);
    }

    public function store(Request $request, ProjectInquiry $inquiry): JsonResponse|RedirectResponse
    {
        $this->ensureCanAccess($request, $inquiry);

        $data = $request->validate([
            'body' => ['required', 'string', 'max:5000'],
        ], [
            'body.required' => 'Write a message first.',
            'body.max' => 'The message cannot be longer than 5000 characters.',
        ]);

        $user = $request->user();
        $message = ProjectInquiryMessage::query()->create([
            'project_inquiry_id' => $inquiry->id,
            'sender_id' => $user->id,
            'sender_role' => $user->isAdmin() ? 'admin' : 'user',
            'sender_name' => trim((string) $user->name) ?: $user->email,
            'body' => trim($data['body']),
        ]);

        if ($request->header('X-Inertia')) {
            return back();
        }

        return response()->json([
            'message' => $this->serializeMessage($message),
        ], 201);
    }

    private function ensureCanAccess(Request $request, ProjectInquiry $inquiry): void
    {
        $user = $request->user();

        abort_unless($user && ($user->isAdmin() || (int) $inquiry->user_id === (int) $user->id), 403);
    }

    private function serializeMessages(ProjectInquiry $inquiry): array
    {
        return $inquiry->messages()
            ->with('sender:id,name,email')
            ->oldest('created_at')
            ->get()
            ->map(fn (ProjectInquiryMessage $message): array => $this->serializeMessage($message))
            ->values()
            ->all();
    }

    private function serializeMessage(ProjectInquiryMessage $message): array
    {
        return [
            'id' => $message->id,
            'sender_role' => $message->sender_role,
            'sender_name' => $message->sender_name,
            'body' => $message->body,
            'created_at' => $message->created_at?->toISOString(),
        ];
    }
}
