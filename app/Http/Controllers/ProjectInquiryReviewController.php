<?php

namespace App\Http\Controllers;

use App\Models\ProjectInquiry;
use App\Models\ProjectInquiryReview;
use App\Models\ProjectInquiryReviewAttachment;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
use Illuminate\Validation\ValidationException;
use Throwable;

class ProjectInquiryReviewController extends Controller
{
    public function save(Request $request, ProjectInquiry $inquiry): RedirectResponse
    {
        $user = $request->user();
        abort_unless($user && (int) $inquiry->user_id === (int) $user->id, 403);
        abort_unless($inquiry->status === 'completed', 409);

        $allowedRatings = [];
        for ($quarter = 4; $quarter <= 20; $quarter++) {
            $rating = $quarter / 4;
            $allowedRatings[] = (string) $rating;
            $allowedRatings[] = number_format($rating, 2, '.', '');
        }

        $data = $request->validate([
            'rating' => ['required', 'numeric', Rule::in($allowedRatings)],
            'body' => ['required', 'string', 'max:5000'],
            'attachments' => ['nullable', 'array', 'max:6'],
            'attachments.*' => ['image', 'mimes:jpg,jpeg,png,gif,webp', 'max:5120'],
            'attachment_ids_json' => ['required', 'json', 'max:2000'],
        ]);

        $keepIds = json_decode($data['attachment_ids_json'], true);
        if (! is_array($keepIds) || count($keepIds) > 6 || count(array_unique($keepIds)) !== count($keepIds)) {
            throw ValidationException::withMessages([
                'attachment_ids_json' => 'Keep up to six different review photos.',
            ]);
        }

        foreach ($keepIds as $id) {
            if (! is_int($id) || $id < 1) {
                throw ValidationException::withMessages([
                    'attachment_ids_json' => 'The selected review photos are invalid.',
                ]);
            }
        }

        $attachments = $request->file('attachments', []);
        if (count($keepIds) + count($attachments) > 6) {
            throw ValidationException::withMessages([
                'attachments' => 'A review can include up to six photos.',
            ]);
        }

        $newPaths = [];
        foreach ($attachments as $attachment) {
            $newPaths[] = $attachment->store('project-inquiry-reviews/'.$inquiry->id, 'local');
        }

        try {
            $pathsToDelete = DB::transaction(function () use ($inquiry, $user, $data, $attachments, $newPaths, $keepIds): array {
                $lockedInquiry = ProjectInquiry::query()->lockForUpdate()->findOrFail($inquiry->id);
                abort_unless((int) $lockedInquiry->user_id === (int) $user->id, 403);
                abort_unless($lockedInquiry->status === 'completed', 409);

                $review = $lockedInquiry->review()->first();
                $review ??= new ProjectInquiryReview(['project_inquiry_id' => $lockedInquiry->id]);
                $existingAttachments = $review->exists ? $review->attachments()->get() : collect();
                $existingIds = $existingAttachments->pluck('id')->map(fn ($id): int => (int) $id)->all();

                if (array_diff($keepIds, $existingIds)) {
                    throw ValidationException::withMessages([
                        'attachment_ids_json' => 'One or more selected photos are not part of this review.',
                    ]);
                }

                $removedAttachments = $existingAttachments->reject(fn (ProjectInquiryReviewAttachment $attachment): bool => in_array((int) $attachment->id, $keepIds, true));
                $pathsToDelete = $removedAttachments->pluck('attachment_path')->all();
                $keptPaths = $existingAttachments
                    ->reject(fn (ProjectInquiryReviewAttachment $attachment): bool => ! in_array((int) $attachment->id, $keepIds, true))
                    ->pluck('attachment_path')
                    ->all();

                if ($review->attachment_path && ! in_array($review->attachment_path, $keptPaths, true)) {
                    $pathsToDelete[] = $review->attachment_path;
                }

                $removedIds = $removedAttachments->pluck('id')->all();
                if ($removedIds !== []) {
                    $review->attachments()->whereIn('id', $removedIds)->delete();
                }

                $review->user_id = $user->id;
                $review->rating = $data['rating'];
                $review->body = trim($data['body']);
                $review->attachment_path = null;
                $review->attachment_name = null;
                $review->attachment_mime = null;
                $review->attachment_size = null;

                $review->save();

                foreach ($attachments as $index => $attachment) {
                    $review->attachments()->create([
                        'attachment_path' => $newPaths[$index],
                        'attachment_name' => $attachment->getClientOriginalName(),
                        'attachment_mime' => $attachment->getMimeType(),
                        'attachment_size' => $attachment->getSize(),
                    ]);
                }

                return array_values(array_unique($pathsToDelete));
            });
        } catch (Throwable $exception) {
            if ($newPaths !== []) {
                Storage::disk('local')->delete($newPaths);
            }

            throw $exception;
        }

        if ($pathsToDelete !== []) {
            Storage::disk('local')->delete($pathsToDelete);
        }

        return back();
    }

    public function attachment(Request $request, ProjectInquiryReviewAttachment $attachment)
    {
        $user = $request->user();
        $review = $attachment->review;
        abort_unless($user && $review && ((int) $review->user_id === (int) $user->id || $user->isAdmin()), 403);
        abort_unless($attachment->attachment_path, 404);

        $disk = Storage::disk('local');
        abort_unless($disk->exists($attachment->attachment_path), 404);

        return response()->file($disk->path($attachment->attachment_path), [
            'Content-Type' => $attachment->attachment_mime ?: 'application/octet-stream',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }

    public function legacyAttachment(Request $request, ProjectInquiryReview $review)
    {
        $user = $request->user();
        abort_unless($user && ((int) $review->user_id === (int) $user->id || $user->isAdmin()), 403);
        abort_unless($review->attachment_path, 404);

        $disk = Storage::disk('local');
        abort_unless($disk->exists($review->attachment_path), 404);

        return response()->file($disk->path($review->attachment_path), [
            'Content-Type' => $review->attachment_mime ?: 'application/octet-stream',
            'X-Content-Type-Options' => 'nosniff',
        ]);
    }
}
