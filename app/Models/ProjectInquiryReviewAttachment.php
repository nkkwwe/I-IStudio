<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ProjectInquiryReviewAttachment extends Model
{
    protected $fillable = [
        'project_inquiry_review_id',
        'attachment_path',
        'attachment_name',
        'attachment_mime',
        'attachment_size',
    ];

    public function review(): BelongsTo
    {
        return $this->belongsTo(ProjectInquiryReview::class, 'project_inquiry_review_id');
    }
}
