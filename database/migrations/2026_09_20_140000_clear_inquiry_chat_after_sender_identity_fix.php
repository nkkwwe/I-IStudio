<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    public function up(): void
    {
        DB::table('project_inquiry_messages')->delete();
    }

    public function down(): void
    {
        // Deleted chat history cannot be restored.
    }
};
