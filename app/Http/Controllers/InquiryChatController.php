<?php

namespace App\Http\Controllers;

use App\Models\ProjectInquiry;
use App\Models\ProjectInquiryMessage;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class InquiryChatController extends Controller
{
    public function activityForUser(Request $request, ProjectInquiry $inquiry): JsonResponse
    {
        $this->ensureOwnInquiry($request, $inquiry);

        return $this->activityResponse($request, $inquiry, 'user');
    }

    public function activityForAdmin(Request $request, ProjectInquiry $inquiry): JsonResponse
    {
        $this->ensureCanAccess($request, $inquiry);

        return $this->activityResponse($request, $inquiry, 'admin');
    }

    private function activityResponse(Request $request, ProjectInquiry $inquiry, string $role): JsonResponse
    {
        $data = $request->validate([
            'client_id' => ['required', 'uuid'],
            'active' => ['required', 'boolean'],
            'typing' => ['required', 'boolean'],
        ]);
        $identity = ['project_inquiry_id' => $inquiry->id, 'user_id' => $request->user()->id, 'client_id' => $data['client_id']];
        if ($data['active']) {
            DB::table('inquiry_chat_activities')->updateOrInsert($identity, [
                'role' => $role,
                'last_seen_at' => now(),
                'typing_until' => $data['typing'] ? now()->addSeconds(6) : null,
            ]);
        } else {
            DB::table('inquiry_chat_activities')->where($identity)->delete();
        }
        DB::table('inquiry_chat_activities')->where('last_seen_at', '<', now()->subMinute())->delete();
        $peers = DB::table('inquiry_chat_activities')
            ->where('project_inquiry_id', $inquiry->id)->where('role', '!=', $role)
            ->where('last_seen_at', '>=', now()->subSeconds(12));

        return response()->json([
            'peer_present' => (clone $peers)->exists(),
            'peer_typing' => $peers->where('typing_until', '>', now())->exists(),
        ])->header('Cache-Control', 'no-store');
    }

    public function unreadCountsForAdmin(): JsonResponse
    {
        $counts = ProjectInquiry::query()->withCount([
            'messages as unread_count' => fn ($query) => $query
                ->where('sender_role', 'user')->whereNull('read_at'),
        ])->get(['id', 'status'])->map(fn ($inquiry) => [
            'id' => $inquiry->id,
            'status' => $inquiry->status,
            'unread_count' => (int) $inquiry->unread_count,
        ]);

        return response()->json(['unread_count' => $counts->sum('unread_count'), 'inquiries' => $counts]);
    }

    public function indexForUser(Request $request, ProjectInquiry $inquiry): JsonResponse
    {
        $this->ensureOwnInquiry($request, $inquiry);

        return $this->messagesResponse($inquiry, 'user');
    }

    public function indexForAdmin(Request $request, ProjectInquiry $inquiry): JsonResponse
    {
        $this->ensureCanAccess($request, $inquiry);

        return $this->messagesResponse($inquiry, 'admin');
    }

    public function storeForUser(Request $request, ProjectInquiry $inquiry): JsonResponse|RedirectResponse
    {
        $this->ensureOwnInquiry($request, $inquiry);

        return $this->storeMessage($request, $inquiry, 'user');
    }

    public function storeForAdmin(Request $request, ProjectInquiry $inquiry): JsonResponse|RedirectResponse
    {
        $this->ensureCanAccess($request, $inquiry);

        return $this->storeMessage($request, $inquiry, 'admin');
    }

    public function updateForUser(Request $request, ProjectInquiry $inquiry, ProjectInquiryMessage $message): JsonResponse
    {
        $this->ensureOwnInquiry($request, $inquiry);
        return $this->updateMessage($request, $inquiry, $message, 'user');
    }

    public function updateForAdmin(Request $request, ProjectInquiry $inquiry, ProjectInquiryMessage $message): JsonResponse
    {
        $this->ensureCanAccess($request, $inquiry);
        return $this->updateMessage($request, $inquiry, $message, 'admin');
    }

    public function destroyForUser(Request $request, ProjectInquiry $inquiry, ProjectInquiryMessage $message): JsonResponse
    {
        $this->ensureOwnInquiry($request, $inquiry);
        return $this->destroyMessage($request, $inquiry, $message, 'user');
    }

    public function destroyForAdmin(Request $request, ProjectInquiry $inquiry, ProjectInquiryMessage $message): JsonResponse
    {
        $this->ensureCanAccess($request, $inquiry);
        return $this->destroyMessage($request, $inquiry, $message, 'admin');
    }

    private function ensureOwnMessage(Request $request, ProjectInquiry $inquiry, ProjectInquiryMessage $message, string $role): void
    {
        abort_unless((int) $message->project_inquiry_id === (int) $inquiry->id, 404);
        abort_unless((int) $message->sender_id === (int) $request->user()->id && $message->sender_role === $role, 403);
    }

    private function updateMessage(Request $request, ProjectInquiry $inquiry, ProjectInquiryMessage $message, string $role): JsonResponse
    {
        $this->ensureOwnMessage($request, $inquiry, $message, $role);
        $data = $request->validate(['body' => ['present', 'nullable', 'string', 'max:5000']]);
        $body = trim((string) ($data['body'] ?? ''));
        if ($body === '' && ! $this->messagePhotos($message)) {
            throw ValidationException::withMessages(['body' => 'Write a message or attach an image first.']);
        }
        if ($body !== $message->body) {
            $message->update(['body' => $body, 'edited_at' => now()]);
        }
        return response()->json(['message' => $this->serializeMessage($message)]);
    }

    private function destroyMessage(Request $request, ProjectInquiry $inquiry, ProjectInquiryMessage $message, string $role): JsonResponse
    {
        $this->ensureOwnMessage($request, $inquiry, $message, $role);
        $paths = array_column($this->messagePhotos($message), 'path');
        $message->delete();
        Storage::disk('local')->delete($paths);
        return response()->json(['deleted_id' => $message->id]);
    }

    private function storeMessage(Request $request, ProjectInquiry $inquiry, string $senderRole): JsonResponse|RedirectResponse
    {
        $data = $request->validate([
            'body' => ['nullable', 'string', 'max:5000'],
            'attachment' => ['nullable', 'image', 'mimes:jpg,jpeg,png,gif,webp', 'max:5120'],
            'attachments' => ['nullable', 'array', 'max:6'],
            'attachments.*' => ['required', 'image', 'mimes:jpg,jpeg,png,gif,webp', 'max:5120'],
        ], [
            'body.max' => 'The message cannot be longer than 5000 characters.',
            'attachment.image' => 'The attachment must be an image.',
            'attachment.mimes' => 'Please use a JPG, PNG, GIF, or WEBP image.',
            'attachment.max' => 'The image cannot be larger than 5 MB.',
        ]);

        $body = trim((string) ($data['body'] ?? ''));
        $attachment = $request->file('attachment');
        $files = $request->file('attachments', []);
        if ($attachment) $files[] = $attachment;
        if (count($files) > 6) {
            throw ValidationException::withMessages(['attachments' => 'Attach up to 6 photos per message.']);
        }

        if ($body === '' && ! $files) {
            throw ValidationException::withMessages([
                'body' => 'Write a message or attach an image first.',
            ]);
        }

        $user = $request->user();
        $photos = [];
        try {
            foreach ($files as $file) {
                $photos[] = ['path' => $file->store('inquiry-chat/'.$inquiry->id, 'local'),
                    'name' => $file->getClientOriginalName(), 'mime' => $file->getMimeType(), 'size' => $file->getSize()];
            }
            $message = ProjectInquiryMessage::query()->create([
                'project_inquiry_id' => $inquiry->id,
                'sender_id' => $user->id,
                'sender_role' => $senderRole,
                'sender_name' => trim((string) $user->name) ?: $user->email,
                'body' => $body,
                'attachment_path' => $photos[0]['path'] ?? null,
                'attachment_name' => $photos[0]['name'] ?? null,
                'attachment_mime' => $photos[0]['mime'] ?? null,
                'attachment_size' => $photos[0]['size'] ?? null,
                'attachments' => $photos ?: null,
            ]);
        } catch (\Throwable $error) {
            Storage::disk('local')->delete(array_column($photos, 'path'));
            throw $error;
        }

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
        $index = filter_var($request->query('index', 0), FILTER_VALIDATE_INT, ['options' => ['min_range' => 0]]);
        abort_if($index === false, 404);
        $photo = $this->messagePhotos($message)[$index] ?? null;
        abort_unless($photo, 404);

        $disk = Storage::disk('local');
        abort_unless($disk->exists($photo['path']), 404);

        return response()->file($disk->path($photo['path']), [
            'Content-Type' => $photo['mime'] ?: 'application/octet-stream',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    private function ensureCanAccess(Request $request, ProjectInquiry $inquiry): void
    {
        $user = $request->user();

        abort_unless($user && ($user->isAdmin() || (int) $inquiry->user_id === (int) $user->id), 403);
    }

    private function ensureOwnInquiry(Request $request, ProjectInquiry $inquiry): void
    {
        $user = $request->user();

        abort_unless($user && (int) $inquiry->user_id === (int) $user->id, 403);
    }

    private function messagesResponse(ProjectInquiry $inquiry, string $viewerRole): JsonResponse
    {
        $messages = $inquiry->messages()
            ->oldest('created_at')
            ->get();

        $unreadMessageIds = $messages
            ->where('sender_role', '!=', $viewerRole)
            ->whereNull('read_at')
            ->pluck('id');

        if ($unreadMessageIds->isNotEmpty()) {
            $readAt = now();
            ProjectInquiryMessage::query()
                ->whereIn('id', $unreadMessageIds)
                ->update(['read_at' => $readAt]);
            foreach ($messages->whereIn('id', $unreadMessageIds) as $message) $message->read_at = $readAt;
        }

        return response()->json([
            'messages' => $messages
                ->map(fn (ProjectInquiryMessage $message): array => $this->serializeMessage($message))
                ->values()
                ->all(),
            'unread_count' => 0,
        ]);
    }

    private function serializeMessage(ProjectInquiryMessage $message): array
    {
        return [
            'id' => $message->id,
            'sender_role' => $message->sender_role,
            'sender_name' => $message->sender_name,
            'body' => $message->body,
            'created_at' => $message->created_at?->toISOString(),
            'read_at' => $message->read_at?->toISOString(),
            'edited_at' => $message->edited_at?->toISOString(),
            'can_manage' => (int) $message->sender_id === (int) request()->user()?->id,
            'attachments' => collect($this->messagePhotos($message))->map(fn ($photo, $index) => [
                'url' => route('project-inquiry-messages.attachment', ['message' => $message->id, 'index' => $index]),
                'name' => $photo['name'],
            ])->values()->all(),
            'attachment_url' => $message->attachment_path
                ? route('project-inquiry-messages.attachment', ['message' => $message->id])
                : null,
            'attachment_name' => $message->attachment_name,
        ];
    }

    private function messagePhotos(ProjectInquiryMessage $message): array
    {
        return $message->attachments ?: ($message->attachment_path ? [[
            'path' => $message->attachment_path, 'name' => $message->attachment_name,
            'mime' => $message->attachment_mime, 'size' => $message->attachment_size,
        ]] : []);
    }
}
