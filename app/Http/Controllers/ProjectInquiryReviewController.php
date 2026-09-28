<?php

namespace App\Http\Controllers;

use App\Models\ProjectInquiry;
use App\Models\ProjectInquiryReview;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;
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
            'attachment' => ['nullable', 'image', 'mimes:jpg,jpeg,png,gif,webp', 'max:5120'],
            'remove_attachment' => ['nullable', 'boolean'],
        ]);

        $attachment = $request->file('attachment');
        $newPath = $attachment?->store('project-inquiry-reviews/'.$inquiry->id, 'local');

        try {
            $oldPath = DB::transaction(function () use ($inquiry, $user, $data, $attachment, $newPath, $request): ?string {
                $lockedInquiry = ProjectInquiry::query()->lockForUpdate()->findOrFail($inquiry->id);
                abort_unless((int) $lockedInquiry->user_id === (int) $user->id, 403);
                abort_unless($lockedInquiry->status === 'completed', 409);

                $review = $lockedInquiry->review()->first();
                $oldPath = $review?->attachment_path;
                $review ??= new ProjectInquiryReview(['project_inquiry_id' => $lockedInquiry->id]);
                $review->user_id = $user->id;
                $review->rating = $data['rating'];
                $review->body = trim($data['body']);

                if ($attachment && $newPath) {
                    $review->attachment_path = $newPath;
                    $review->attachment_name = $attachment->getClientOriginalName();
                    $review->attachment_mime = $attachment->getMimeType();
                    $review->attachment_size = $attachment->getSize();
                } elseif ($request->boolean('remove_attachment')) {
                    $review->attachment_path = null;
                    $review->attachment_name = null;
                    $review->attachment_mime = null;
                    $review->attachment_size = null;
                }

                $review->save();

                return $oldPath;
            });
        } catch (Throwable $exception) {
            if ($newPath) {
                Storage::disk('local')->delete($newPath);
            }

            throw $exception;
        }

        if ($oldPath && ($newPath || $request->boolean('remove_attachment'))) {
            Storage::disk('local')->delete($oldPath);
        }

        return back();
    }

    public function attachment(Request $request, ProjectInquiryReview $review)
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
