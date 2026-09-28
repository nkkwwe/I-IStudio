<?php

namespace App\Http\Controllers;

use App\Models\ProjectInquiryReview;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function show(): Response
    {
        $reviews = ProjectInquiryReview::query()
            ->whereHas('inquiry', fn ($query) => $query->where('status', 'completed'))
            ->whereHas('user')
            ->with(['user:id,name', 'inquiry:id,service_type'])
            ->latest('id')
            ->limit(50)
            ->get(['id', 'user_id', 'project_inquiry_id', 'rating', 'body'])
            ->map(function (ProjectInquiryReview $review): array {
                $name = trim($review->user->name ?? '');

                return [
                    'id' => $review->id,
                    'author' => str_contains($name, '@') ? '' : (preg_split('/\s+/u', $name)[0] ?? ''),
                    'rating' => (float) $review->rating,
                    'body' => $review->body,
                    'service' => $review->inquiry->service_type,
                ];
            });

        return Inertia::render('Home', ['reviews' => $reviews]);
    }
}
