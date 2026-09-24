<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;

class ProjectInquiry extends Model
{
    use HasFactory;

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
    ];

    protected function casts(): array
    {
        return [
            'brief_data' => 'array',
            'lead_context' => 'array',
            'site_audit' => 'array',
        ];
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function messages(): HasMany
    {
        return $this->hasMany(ProjectInquiryMessage::class);
    }
}
