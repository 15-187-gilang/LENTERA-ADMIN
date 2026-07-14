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
        Schema::create('media', function (Blueprint $table) {
            $table->id();

            // File info
            $table->string('original_name');
            $table->string('filename')->unique();
            $table->string('mime_type');
            $table->string('extension', 10);
            $table->unsignedBigInteger('size'); // dalam bytes

            // Storage info
            $table->string('disk')->default('public');
            $table->string('directory')->default('media');
            $table->string('path');
            $table->text('url');

            // Relations
            $table->foreignId('uploaded_by')
                ->nullable()
                ->constrained('admins')
                ->nullOnDelete();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('media');
    }
};
