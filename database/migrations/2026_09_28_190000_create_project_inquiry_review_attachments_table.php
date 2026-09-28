<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_inquiry_review_attachments', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('project_inquiry_review_id')->constrained()->cascadeOnDelete();
            $table->string('attachment_path');
            $table->string('attachment_name');
            $table->string('attachment_mime', 100)->nullable();
            $table->unsignedInteger('attachment_size')->nullable();
            $table->timestamps();
            $table->index(['project_inquiry_review_id', 'id']);
        });

        DB::table('project_inquiry_reviews')
            ->whereNotNull('attachment_path')
            ->orderBy('id')
            ->each(function (object $review): void {
                DB::table('project_inquiry_review_attachments')->insert([
                    'project_inquiry_review_id' => $review->id,
                    'attachment_path' => $review->attachment_path,
                    'attachment_name' => $review->attachment_name ?: 'review-photo',
                    'attachment_mime' => $review->attachment_mime,
                    'attachment_size' => $review->attachment_size,
                    'created_at' => $review->created_at,
                    'updated_at' => $review->updated_at,
                ]);
            });
    }

    public function down(): void
    {
        DB::table('project_inquiry_review_attachments')
            ->orderBy('id')
            ->get()
            ->groupBy('project_inquiry_review_id')
            ->each(function ($attachments, int $reviewId): void {
                $attachment = $attachments->first();
                DB::table('project_inquiry_reviews')->where('id', $reviewId)->update([
                    'attachment_path' => $attachment->attachment_path,
                    'attachment_name' => $attachment->attachment_name,
                    'attachment_mime' => $attachment->attachment_mime,
                    'attachment_size' => $attachment->attachment_size,
                ]);
            });

        Schema::dropIfExists('project_inquiry_review_attachments');
    }
};
