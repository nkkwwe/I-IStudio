<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('inquiry_chat_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('project_inquiry_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete();
            $table->uuid('client_id');
            $table->string('role', 10);
            $table->timestamp('last_seen_at')->index();
            $table->timestamp('typing_until')->nullable();
            $table->unique(['project_inquiry_id', 'user_id', 'client_id'], 'inquiry_chat_activity_client');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('inquiry_chat_activities');
    }
};
