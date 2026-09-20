<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('project_inquiry_messages', function (Blueprint $table): void {
            $table->id();
            $table->foreignId('project_inquiry_id')->constrained()->cascadeOnDelete();
            $table->foreignId('sender_id')->nullable()->constrained('users')->nullOnDelete();
            $table->string('sender_role', 20);
            $table->string('sender_name', 120);
            $table->text('body');
            $table->timestamps();

            $table->index(['project_inquiry_id', 'created_at']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('project_inquiry_messages');
    }
};
