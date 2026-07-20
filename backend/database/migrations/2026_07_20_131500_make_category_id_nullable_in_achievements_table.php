<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * --------------------------------------------------------------------------
 * Make category_id Nullable in Achievements Table
 * --------------------------------------------------------------------------
 *
 * Mengubah kolom category_id menjadi nullable agar admin dapat
 * menyimpan prestasi sebagai draft tanpa harus memilih kategori.
 *
 * Saat dipublikasikan, kategori tetap wajib diisi
 * (validasi dilakukan di Request layer).
 */
return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('achievements', function (Blueprint $table) {
            // Hapus foreign key constraint lama
            $table->dropForeign(['category_id']);

            // Ubah kolom menjadi nullable
            $table->unsignedBigInteger('category_id')->nullable()->change();

            // Tambahkan kembali foreign key constraint dengan nullable
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->cascadeOnUpdate()
                ->nullOnDelete();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('achievements', function (Blueprint $table) {
            // Hapus foreign key nullable
            $table->dropForeign(['category_id']);

            // Kembalikan ke not null
            $table->unsignedBigInteger('category_id')->nullable(false)->change();

            // Tambahkan kembali foreign key constraint asal
            $table->foreign('category_id')
                ->references('id')
                ->on('categories')
                ->cascadeOnUpdate()
                ->restrictOnDelete();
        });
    }
};
