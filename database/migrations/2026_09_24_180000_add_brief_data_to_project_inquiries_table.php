<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('project_inquiries', function (Blueprint $table): void {
            $table->json('brief_data')->nullable()->after('project_comment');
            $table->json('lead_context')->nullable()->after('brief_data');
            $table->json('site_audit')->nullable()->after('lead_context');
        });
    }

    public function down(): void
    {
        Schema::table('project_inquiries', function (Blueprint $table): void {
            $table->dropColumn(['brief_data', 'lead_context', 'site_audit']);
        });
    }
};
