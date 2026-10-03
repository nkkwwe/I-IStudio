<?php

namespace App\Http\Controllers;

use App\Models\ProjectInquiry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Illuminate\Validation\Rule;
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
            ->with('review.attachments')
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
                'review' => $inquiry->review ? [
                    'rating' => (float) $inquiry->review->rating,
                    'body' => $inquiry->review->body,
                    'attachments' => $inquiry->review->attachments
                        ->map(fn ($attachment): array => [
                            'id' => $attachment->id,
                            'name' => $attachment->attachment_name,
                            'url' => route('project-inquiry-review-attachments.show', ['attachment' => $attachment->id]),
                        ])
                        ->values()
                        ->all(),
                ] : null,
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
            ->get(['id', 'status'])
            ->map(fn (ProjectInquiry $inquiry): array => [
                'id' => $inquiry->id,
                'status' => $inquiry->status,
                'unread_count' => (int) $inquiry->unread_count,
            ])
            ->values();

        return response()->json([
            'unread_count' => $counts->sum('unread_count'),
            'inquiries' => $counts,
        ]);
    }

    public function cancel(Request $request, ProjectInquiry $inquiry): RedirectResponse
    {
        abort_unless((int) $inquiry->user_id === (int) $request->user()->id, 403);

        DB::transaction(function () use ($inquiry): void {
            $locked = ProjectInquiry::query()->lockForUpdate()->findOrFail($inquiry->id);
            if ($locked->status === 'completed') {
                throw ValidationException::withMessages(['status' => 'Completed briefs cannot be cancelled.']);
            }
            if ($locked->status !== 'cancelled') {
                $locked->forceFill(['status' => 'cancelled', 'cancelled_at' => now()])->save();
            }
        });

        return back();
    }

    public function store(Request $request): RedirectResponse
    {
        $isInitial = $request->input('submission_kind') === 'initial';
        $isStructured = ! $isInitial && $request->input('brief_version') == 1;
        $structuredServices = ['ads', 'meta-ads', 'tiktok-ads', 'marketplaces'];
        $requiresContact = $isInitial || in_array($request->input('service_type'), $structuredServices, true);
        $data = $request->validate([
            'submission_kind' => ['nullable', 'in:initial,detailed'],
            'brief_version' => ['nullable', 'integer', 'in:1', Rule::prohibitedIf(! in_array($request->input('service_type'), $structuredServices, true))],
            'service_type' => ['required', 'string', 'in:landing,corporate,redesign,ads,meta-ads,tiktok-ads,marketplaces,consultation,other'],
            'client_name' => ['required', 'string', 'max:120'],
            'client_email' => [Rule::requiredIf($requiresContact), 'nullable', 'email', 'max:255'],
            'client_contact' => ['nullable', 'string', 'max:255'],
            'client_budget' => ['nullable', 'string', 'max:120'],
            'project_comment' => [Rule::requiredIf(! $isInitial), 'nullable', 'string', $isInitial ? 'max:1000' : 'max:10000'],
            'calculator_summary' => ['nullable', 'string', 'max:10000'],
            'brief_data' => [Rule::requiredIf(! $isInitial && ($isStructured || $request->input('service_type') === 'meta-ads')), 'nullable', 'json', 'max:40000'],
            'lead_context' => ['nullable', 'json', 'max:10000'],
            'ads_consent' => $requiresContact ? ['required', 'accepted'] : ['sometimes', 'accepted'],
        ], [
            'client_name.required' => 'Please enter your name.',
            'project_comment.required' => 'Please describe your project or task.',
        ]);

        // New service types always use the structured contract outside initial contact.
        if (! $isInitial && in_array($data['service_type'], ['tiktok-ads', 'marketplaces'], true)) {
            Validator::make($data, ['brief_version' => ['required', 'integer', 'in:1']])->validate();
        }

        $calculatorSummary = trim((string) ($data['calculator_summary'] ?? ''));
        $projectComment = trim((string) ($data['project_comment'] ?? ''));
        if ($isInitial && $projectComment === '') $projectComment = 'Initial inquiry — '.$data['service_type'];

        if ($calculatorSummary !== '') {
            $projectComment .= "\n\n--- Price calculator example ---\n".$calculatorSummary;
        }

        $data['project_comment'] = $projectComment;
        unset($data['calculator_summary']);

        $briefData = $isInitial ? ['consent' => true] : $this->decodeJson($data['brief_data'] ?? null);
        if ($isStructured) {
            $briefData = $this->validateStartupBrief($briefData ?? [], $data['service_type']);
            $briefData['schema_version'] = 1;
            $briefData['consent'] = true;
            $data['client_name'] = $briefData['client_name'];
            $data['client_email'] = $briefData['client_email'];
            $data['client_budget'] = ! empty($briefData['budget']) ? $briefData['budget'].' '.$briefData['currency'] : null;
        } elseif (! $isInitial && $data['service_type'] === 'meta-ads') {
            $rules = [
                'brief.brand_name' => ['required', 'string', 'max:255'],
                'brief.website_url' => ['nullable', 'url:http,https', 'max:255'],
                'brief.destinations' => ['nullable', 'array', 'max:6'],
                'brief.destinations.*' => ['string', 'in:website,instagram,messengerChat,whatsapp,leadForm,advice'],
                'brief.available_assets' => ['nullable', 'array', 'max:5'],
                'brief.available_assets.*' => ['string', 'in:photos,videos,branding,reviews,none'],
            ];
            foreach (['business_type', 'business_description', 'promoted_offer', 'promoted_url', 'average_order_value', 'advantage', 'special_offer', 'locations', 'advertising_languages', 'audience_description', 'competitors', 'main_goal', 'monthly_result', 'monthly_budget', 'launch_timing', 'ads_history', 'previous_results', 'facebook_page', 'instagram_profile', 'creative_support', 'materials_url', 'client_name', 'client_email', 'phone', 'messenger', 'contact_method', 'additional_comments'] as $field) {
                $rules['brief.'.$field] = ['nullable', 'string', 'max:3000'];
            }
            $briefData = Validator::make(['brief' => $briefData], $rules)->validate()['brief'];
            $briefData['platform'] = 'meta';
            $briefData['consent'] = true;
        }
        $leadContext = $this->decodeJson($data['lead_context'] ?? null);
        $websiteUrl = trim((string) ($briefData['website_url'] ?? ''));
        $isAdsBrief = in_array($data['service_type'], ['ads', 'meta-ads'], true);
        $clientEmail = trim((string) ($data['client_email'] ?? ''));

        unset($data['client_email'], $data['brief_data'], $data['lead_context'], $data['ads_consent'], $data['submission_kind'], $data['brief_version']);

        if (! $request->user() && ! $isAdsBrief && ! $isInitial && ! $isStructured) {
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

        return redirect($this->localizedRoute($request, $isInitial ? 'home.localized' : 'inquiry.localized').($isInitial ? '#inquiry' : '?service='.urlencode($inquiry->service_type)))->with([
            'inquiry_submitted' => true,
            'inquiry_ticket' => sprintf('#II-%04d', $inquiry->id),
            'inquiry_service' => $inquiry->service_type,
            'inquiry_budget' => $inquiry->client_budget,
        ]);
    }

    private function validateStartupBrief(array $answers, string $service): array
    {
        $schema = json_decode(file_get_contents(resource_path('js/content/serviceBriefs.json')), true, flags: JSON_THROW_ON_ERROR);
        $rules = [];
        $activeAnswers = [];
        foreach ($schema['fields'] as $key => $field) {
            if (isset($field['services']) && ! in_array($service, $field['services'], true)) continue;
            if (in_array($service, $field['exclude'] ?? [], true)) continue;
            if (isset($field['when'])) {
                $condition = $field['when'];
                $value = $answers[$condition['field']] ?? null;
                $visible = ! empty($condition['filled']) ? filled($value) : in_array($value, $condition['values'], true);
                if (! $visible) continue;
            }
            $type = $field['type'] ?? 'text';
            $fieldRules = [! empty($field['required']) ? 'required' : 'nullable'];
            if ($type === 'number') {
                $fieldRules = [...$fieldRules, 'numeric', 'gt:0', 'max:1000000000'];
            } else {
                $fieldRules[] = 'string';
                $fieldRules[] = $type === 'textarea' ? 'max:1000' : ($key === 'client_name' ? 'max:120' : 'max:255');
                if ($type === 'email') $fieldRules[] = 'email';
                if ($type === 'url') $fieldRules[] = 'url:http,https';
                if (isset($field['options'])) $fieldRules[] = Rule::in($field['options']);
            }
            $rules['brief.'.$key] = $fieldRules;
            $activeAnswers[$key] = $answers[$key] ?? null;
        }

        return Validator::make(['brief' => $activeAnswers], $rules)->validate()['brief'];
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
