<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('project_inquiry_messages', function (Blueprint $table): void {
            $table->timestamp('read_at')->nullable()->after('attachment_size');
            $table->index(
                ['project_inquiry_id', 'sender_role', 'read_at'],
                'project_inquiry_messages_unread_index',
            );
        });

        // Messages that existed before unread tracking was introduced must not
        // appear as new notifications for conversations already viewed.
        DB::table('project_inquiry_messages')
            ->whereNull('read_at')
            ->update(['read_at' => DB::raw('updated_at')]);
    }

    public function down(): void
    {
        Schema::table('project_inquiry_messages', function (Blueprint $table): void {
            $table->dropIndex('project_inquiry_messages_unread_index');
            $table->dropColumn('read_at');
        });
    }
};
