<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;


/**
 * --------------------------------------------------------------------------
 * Admin Model
 * --------------------------------------------------------------------------
 *
 * Model ini merepresentasikan tabel `admins`.
 *
 * Fungsi:
 * - Menyimpan data administrator.
 * - Digunakan untuk proses autentikasi (login).
 * - Mencatat admin yang membuat atau mengubah data prestasi.
 */
class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;
    /**
     * Nama tabel yang digunakan.
     */
    protected $table = 'admins';

    /**
     * Kolom yang boleh diisi menggunakan Mass Assignment.
     */
    protected $fillable = [
        'name',
        'email',
        'password',
    ];

    /**
     * Kolom yang tidak akan ditampilkan ketika model diubah menjadi JSON.
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Cast otomatis pada atribut.
     */
    protected function casts(): array
    {
        return [
            'password'       => 'hashed',
            'last_login_at'  => 'datetime',
        ];
    }

    /**
     * Relasi:
     * Satu admin dapat membuat banyak prestasi.
     */
    public function achievements(): HasMany
    {
        return $this->hasMany(
            Achievement::class,
            'created_by'
        );
    }

    /**
     * Relasi:
     * Satu admin dapat mengubah banyak prestasi.
     */

}