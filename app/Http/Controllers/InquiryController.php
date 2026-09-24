<?php

namespace App\Http\Controllers;

use App\Models\ProjectInquiry;
use Illuminate\Http\JsonResponse;
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

    public function account(Request $request): Response
    {
        $inquiries = ProjectInquiry::query()
            ->where('user_id', $request->user()->id)
            ->latest('created_at')
            ->limit(3)
            ->get(['id', 'service_type', 'status', 'created_at'])
            ->map(fn (ProjectInquiry $inquiry): array => [
                'id' => $inquiry->id,
                'ticket' => sprintf('#II-%04d', $inquiry->id),
                'service_type' => $inquiry->service_type,
                'status' => $inquiry->status,
                'created_at' => $inquiry->created_at?->toISOString(),
            ])
            ->values();

        return Inertia::render('Account', [
            'inquiries' => $inquiries,
        ]);
    }

    public function mine(Request $request): Response
    {
        $inquiries = ProjectInquiry::query()
            ->where('user_id', $request->user()->id)
            ->withCount([
                'messages as unread_count' => fn ($query) => $query
                    ->where('sender_role', 'admin')
                    ->whereNull('read_at'),
            ])
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
                'unread_count' => (int) $inquiry->unread_count,
            ])
            ->values();

        return Inertia::render('Account/ProjectBriefs', [
            'inquiries' => $inquiries,
        ]);
    }

    public function unreadCounts(Request $request): JsonResponse
    {
        $counts = ProjectInquiry::query()
            ->where('user_id', $request->user()->id)
            ->withCount([
                'messages as unread_count' => fn ($query) => $query
                    ->where('sender_role', 'admin')
                    ->whereNull('read_at'),
            ])
            ->get(['id'])
            ->map(fn (ProjectInquiry $inquiry): array => [
                'id' => $inquiry->id,
                'unread_count' => (int) $inquiry->unread_count,
            ])
            ->values();

        return response()->json([
            'unread_count' => $counts->sum('unread_count'),
            'inquiries' => $counts,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'service_type' => ['required', 'string', 'in:landing,corporate,redesign,ads,consultation,other'],
            'client_name' => ['required', 'string', 'max:120'],
            'client_email' => ['required_if:service_type,ads', 'nullable', 'email', 'max:255'],
            'client_contact' => ['nullable', 'string', 'max:255'],
            'client_budget' => ['nullable', 'string', 'max:120'],
            'project_comment' => ['required', 'string', 'max:10000'],
            'calculator_summary' => ['nullable', 'string', 'max:10000'],
            'brief_data' => ['nullable', 'json', 'max:40000'],
            'lead_context' => ['nullable', 'json', 'max:10000'],
            'ads_consent' => ['required_if:service_type,ads', 'accepted'],
        ], [
            'client_name.required' => 'Please enter your name.',
            'project_comment.required' => 'Please describe your project or task.',
        ]);

        $calculatorSummary = trim((string) ($data['calculator_summary'] ?? ''));
        $projectComment = trim($data['project_comment']);

        if ($calculatorSummary !== '') {
            $projectComment .= "\n\n--- Price calculator example ---\n".$calculatorSummary;
        }

        $data['project_comment'] = $projectComment;
        unset($data['calculator_summary']);

        $briefData = $this->decodeJson($data['brief_data'] ?? null);
        $leadContext = $this->decodeJson($data['lead_context'] ?? null);
        $websiteUrl = trim((string) ($briefData['website_url'] ?? ''));
        $isAdsBrief = $data['service_type'] === 'ads';
        $clientEmail = trim((string) ($data['client_email'] ?? ''));

        unset($data['client_email'], $data['brief_data'], $data['lead_context'], $data['ads_consent']);

        if (! $request->user() && ! $isAdsBrief) {
            $request->session()->put('pending_inquiry', $data);
            $request->session()->put('url.intended', $this->localizedRoute($request, 'inquiry.localized'));

            return redirect($this->localizedRoute($request, 'login.localized'))->with('inquiry_requires_auth', true);
        }

        $inquiry = ProjectInquiry::query()->create([
            ...$data,
            'user_id' => $request->user()?->id,
            'client_email' => $request->user()?->email ?: $clientEmail,
            'brief_data' => $briefData,
            'lead_context' => $leadContext,
            'site_audit' => $isAdsBrief && $websiteUrl !== '' ? [
                'status' => 'pending',
                'url' => $websiteUrl,
            ] : null,
            'status' => 'new',
        ]);

        $request->session()->forget('pending_inquiry');

        return redirect($this->localizedRoute($request, 'inquiry.localized'))->with([
            'inquiry_submitted' => true,
            'inquiry_ticket' => sprintf('#II-%04d', $inquiry->id),
            'inquiry_service' => $inquiry->service_type,
            'inquiry_budget' => $inquiry->client_budget,
        ]);
    }

    private function localizedRoute(Request $request, string $routeName): string
    {
        $locale = $request->route('locale') ?: $request->session()->get('site_language', 'en');
        $urlLocale = $locale === 'uk' ? 'ua' : $locale;

        return route($routeName, ['locale' => $urlLocale]);
    }

    private function decodeJson(?string $value): ?array
    {
        if (! $value) return null;

        $decoded = json_decode($value, true);

        return is_array($decoded) ? $decoded : null;
    }
}
