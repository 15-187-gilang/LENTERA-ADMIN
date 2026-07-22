<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('achievements', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable()->change();
            $table->longText('description')->nullable()->change();
            $table->string('recipient')->nullable()->change();
            $table->string('organizer')->nullable()->change();
            $table->string('level', 30)->nullable()->change();
            $table->date('achievement_date')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('achievements', function (Blueprint $table) {
            $table->foreignId('category_id')->nullable(false)->change();
            $table->longText('description')->nullable(false)->change();
            $table->string('recipient')->nullable(false)->change();
            $table->string('organizer')->nullable(false)->change();
            $table->string('level', 30)->nullable(false)->change();
            $table->date('achievement_date')->nullable(false)->change();
        });
    }
};
