<?php

namespace App\Http\Controllers;

use App\Models\ProjectInquiry;
use App\Models\ProjectInquiryMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

class InquiryChatController extends Controller
{
    public function index(Request $request, ProjectInquiry $inquiry): JsonResponse
    {
        $this->ensureCanAccess($request, $inquiry);

        return response()->json([
            'messages' => $this->serializeMessages($request, $inquiry),
        ]);
    }

    public function store(Request $request, ProjectInquiry $inquiry): JsonResponse|RedirectResponse
    {
        $this->ensureCanAccess($request, $inquiry);

        $data = $request->validate([
            'body' => ['nullable', 'string', 'max:5000'],
            'attachment' => ['nullable', 'image', 'mimes:jpg,jpeg,png,gif,webp', 'max:5120'],
        ], [
            'body.max' => 'The message cannot be longer than 5000 characters.',
            'attachment.image' => 'The attachment must be an image.',
            'attachment.mimes' => 'Please use a JPG, PNG, GIF, or WEBP image.',
            'attachment.max' => 'The image cannot be larger than 5 MB.',
        ]);

        $body = trim((string) ($data['body'] ?? ''));
        $attachment = $request->file('attachment');

        if ($body === '' && !$attachment) {
            throw ValidationException::withMessages([
                'body' => 'Write a message or attach an image first.',
            ]);
        }

        $user = $request->user();
        $attachmentPath = $attachment?->store('inquiry-chat/'.$inquiry->id, 'local');
        $senderRole = $request->routeIs('admin.project-briefs.messages.store') ? 'admin' : 'user';
        $message = ProjectInquiryMessage::query()->create([
            'project_inquiry_id' => $inquiry->id,
            'sender_id' => $user->id,
            'sender_role' => $senderRole,
            'sender_name' => trim((string) $user->name) ?: $user->email,
            'body' => $body,
            'attachment_path' => $attachmentPath,
            'attachment_name' => $attachment?->getClientOriginalName(),
            'attachment_mime' => $attachment?->getMimeType(),
            'attachment_size' => $attachment?->getSize(),
        ]);

        if ($request->header('X-Inertia')) {
            return back();
        }

        return response()->json([
            'message' => $this->serializeMessage($message),
        ], 201);
    }

    public function attachment(Request $request, ProjectInquiryMessage $message)
    {
        $inquiry = $message->inquiry;
        abort_unless($inquiry, 404);
        $this->ensureCanAccess($request, $inquiry);
        abort_unless($message->attachment_path, 404);

        $disk = Storage::disk('local');
        abort_unless($disk->exists($message->attachment_path), 404);

        return response()->file($disk->path($message->attachment_path), [
            'Content-Type' => $message->attachment_mime ?: 'application/octet-stream',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    private function ensureCanAccess(Request $request, ProjectInquiry $inquiry): void
    {
        $user = $request->user();

        abort_unless($user && ($user->isAdmin() || (int) $inquiry->user_id === (int) $user->id), 403);
    }

    private function serializeMessages(Request $request, ProjectInquiry $inquiry): array
    {
        return $inquiry->messages()
            ->with('sender:id,name,email')
            ->oldest('created_at')
            ->get()
            ->map(function (ProjectInquiryMessage $message) use ($request, $inquiry): array {
                $senderRole = $message->sender_role;

                if (
                    $request->routeIs('account.project-briefs.messages')
                    && $senderRole === 'admin'
                    && (int) $message->sender_id === (int) $inquiry->user_id
                ) {
                    $senderRole = 'user';
                }

                return $this->serializeMessage($message, $senderRole);
            })
            ->values()
            ->all();
    }

    private function serializeMessage(ProjectInquiryMessage $message, ?string $senderRole = null): array
    {
        return [
            'id' => $message->id,
            'sender_role' => $senderRole ?? $message->sender_role,
            'sender_name' => $message->sender_name,
            'body' => $message->body,
            'created_at' => $message->created_at?->toISOString(),
            'attachment_url' => $message->attachment_path
                ? route('project-inquiry-messages.attachment', ['message' => $message->id])
                : null,
            'attachment_name' => $message->attachment_name,
        ];
    }
}
