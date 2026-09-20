<?php

namespace App\Http\Controllers;

use App\Models\ProjectInquiry;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InquiryController extends Controller
{
    public function show(): Response
    {
        return Inertia::render('Inquiry');
    }

    public function mine(Request $request): Response
    {
        $inquiries = ProjectInquiry::query()
            ->where('user_id', $request->user()->id)
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
            ])
            ->values();

        return Inertia::render('Account/ProjectBriefs', [
            'inquiries' => $inquiries,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'service_type' => ['required', 'string', 'in:landing,corporate,redesign,ads,consultation,other'],
            'client_name' => ['required', 'string', 'max:120'],
            'client_contact' => ['nullable', 'string', 'max:255'],
            'client_budget' => ['nullable', 'string', 'max:120'],
            'project_comment' => ['required', 'string', 'max:10000'],
        ], [
            'client_name.required' => 'Please enter your name.',
            'project_comment.required' => 'Please describe your project or task.',
        ]);

        if (! $request->user()) {
            $request->session()->put('pending_inquiry', $data);
            $request->session()->put('url.intended', route('inquiry'));

            return redirect()->route('login')->with('inquiry_requires_auth', true);
        }

        $inquiry = ProjectInquiry::query()->create([
            ...$data,
            'user_id' => $request->user()->id,
            'client_email' => $request->user()->email,
            'status' => 'new',
        ]);

        $request->session()->forget('pending_inquiry');

        return redirect()->route('inquiry')->with([
            'inquiry_submitted' => true,
            'inquiry_ticket' => sprintf('#II-%04d', $inquiry->id),
            'inquiry_service' => $inquiry->service_type,
            'inquiry_budget' => $inquiry->client_budget,
        ]);
    }
}
