<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * --------------------------------------------------------------------------
 * Create Achievements Table
 * --------------------------------------------------------------------------
 *
 * Tabel ini digunakan untuk menyimpan seluruh data prestasi
 * yang akan ditampilkan pada website publik LENTERA.
 *
 * Relasi:
 * - category_id -> categories.id
 * - created_by  -> admins.id
 *
 * Setiap prestasi memiliki informasi seperti:
 * - Judul prestasi
 * - Deskripsi
 * - Tingkat prestasi
 * - Penyelenggara
 * - Penerima prestasi
 * - Thumbnail
 * - Status publikasi
 *
 * Digunakan oleh:
 * - Admin Panel (CRUD Prestasi)
 * - Website Publik
 */
return new class extends Migration
{
    /**
     * Menjalankan migration.
     */
    public function up(): void
    {
        Schema::create('achievements', function (Blueprint $table) {

            /*
            |--------------------------------------------------------------------------
            | Primary Key
            |--------------------------------------------------------------------------
            |
            | ID unik setiap prestasi.
            |
            */
            $table->id();

            /*
            |--------------------------------------------------------------------------
            | Foreign Key
            |--------------------------------------------------------------------------
            |
            | category_id
            | Menghubungkan prestasi dengan kategori.
            |
            */
            $table->foreignId('category_id')
                ->constrained()
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            /*
            |--------------------------------------------------------------------------
            | Foreign Key
            |--------------------------------------------------------------------------
            |
            | created_by
            | Menyimpan admin yang membuat data prestasi.
            |
            */
            $table->foreignId('created_by')
                ->constrained('admins')
                ->cascadeOnUpdate()
                ->restrictOnDelete();

            /*
            |--------------------------------------------------------------------------
            | Informasi Prestasi
            |--------------------------------------------------------------------------
            */
            $table->string('title');
            $table->string('slug')->unique();

            /*
            |--------------------------------------------------------------------------
            | Ringkasan Prestasi
            |--------------------------------------------------------------------------
            |
            | Digunakan pada card di halaman utama.
            |
            */
            $table->text('excerpt')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Deskripsi Lengkap
            |--------------------------------------------------------------------------
            |
            | Menggunakan longText karena deskripsi dapat
            | berisi informasi yang cukup panjang.
            |
            */
            $table->longText('description');

            /*
            |--------------------------------------------------------------------------
            | Informasi Penerima dan Penyelenggara
            |--------------------------------------------------------------------------
            */
            $table->string('recipient');
            $table->string('organizer');

            /*
            |--------------------------------------------------------------------------
            | Tingkat Prestasi
            |--------------------------------------------------------------------------
            |
            | Menggunakan string agar lebih fleksibel apabila
            | di masa depan terdapat level baru.
            |
            */
            $table->string('level', 30);

            /*
            |--------------------------------------------------------------------------
            | Tanggal Prestasi
            |--------------------------------------------------------------------------
            */
            $table->date('achievement_date');

            /*
            |--------------------------------------------------------------------------
            | Thumbnail
            |--------------------------------------------------------------------------
            |
            | Menyimpan path gambar utama prestasi.
            |
            */
            $table->string('thumbnail', 500)->nullable();

            /*
            |--------------------------------------------------------------------------
            | Statistik
            |--------------------------------------------------------------------------
            |
            | Jumlah kunjungan halaman detail prestasi.
            |
            */
            $table->unsignedInteger('views')->default(0);

            /*
            |--------------------------------------------------------------------------
            | Urutan Tampilan
            |--------------------------------------------------------------------------
            |
            | Digunakan apabila admin ingin menentukan
            | urutan prestasi pada halaman publik.
            |
            */
            $table->unsignedInteger('sort_order')->default(0);

            /*
            |--------------------------------------------------------------------------
            | Status Prestasi
            |--------------------------------------------------------------------------
            */
            $table->boolean('featured')->default(false);
            $table->boolean('is_published')->default(false);

            /*
            |--------------------------------------------------------------------------
            | Waktu Publikasi
            |--------------------------------------------------------------------------
            |
            | Bernilai NULL jika masih berupa draft.
            |
            */
            $table->timestamp('published_at')->nullable();

            /*
            |--------------------------------------------------------------------------
            | Soft Delete
            |--------------------------------------------------------------------------
            |
            | Data tidak langsung dihapus dari database,
            | sehingga masih dapat dipulihkan apabila diperlukan.
            |
            */
            $table->softDeletes();

            /*
            |--------------------------------------------------------------------------
            | Timestamp
            |--------------------------------------------------------------------------
            */
            $table->timestamps();

            /*
            |--------------------------------------------------------------------------
            | Index
            |--------------------------------------------------------------------------
            |
            | Digunakan untuk mempercepat proses pencarian.
            |
            */
            $table->index('achievement_date');
            $table->index('level');
            $table->index('featured');
            $table->index('is_published');
            $table->index(['featured', 'is_published']);
        });
    }

    /**
     * Menghapus tabel achievements.
     */
    public function down(): void
    {
        Schema::dropIfExists('achievements');
    }
};