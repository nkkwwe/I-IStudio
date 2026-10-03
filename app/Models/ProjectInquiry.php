<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Prunable;
use Illuminate\Support\Facades\Storage;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class ProjectInquiry extends Model
{
    use HasFactory;
    use Prunable;

    protected $fillable = [
        'user_id',
        'client_name',
        'client_email',
        'client_contact',
        'client_budget',
        'service_type',
        'project_comment',
        'brief_data',
        'lead_context',
        'site_audit',
        'status',
        'cancelled_at',
    ];

    protected function casts(): array
    {
        return [
            'cancelled_at' => 'datetime',
            'brief_data' => 'array',
            'lead_context' => 'array',
            'site_audit' => 'array',
        ];
    }

    public function prunable(): Builder
    {
        return static::query()->where('status', 'cancelled')
            ->where('cancelled_at', '<=', now()->subDays(14));
    }

    protected function pruning(): void
    {
        $disk = Storage::disk('local');
        foreach (['inquiry-chat/', 'project-inquiry-reviews/'] as $directory) {
            if (! $disk->deleteDirectory($directory.$this->id)) {
                throw new \RuntimeException('Unable to remove inquiry attachments.');
            }
        }
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(ProjectInquiryMessage::class);
    }

    public function review(): HasOne
    {
        return $this->hasOne(ProjectInquiryReview::class);
    }
}
