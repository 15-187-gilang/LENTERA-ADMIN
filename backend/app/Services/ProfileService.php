<?php

namespace App\Services;

use App\Models\Admin;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * -----------------------------------------------------------------------------
 * Profile Service
 * -----------------------------------------------------------------------------
 *
 * Bertanggung jawab terhadap business logic profil administrator.
 * Langsung menggunakan model Admin tanpa repository terpisah
 * karena hanya ada satu entitas (admin yang sedang login).
 */
class ProfileService
{
    /**
     * Mengambil data profil admin yang sedang login.
     */
    public function getProfile(Admin $admin): Admin
    {
        return $admin->fresh();
    }

    /**
     * Memperbarui nama dan email admin.
     */
    public function updateProfile(Admin $admin, array $data): Admin
    {
        $admin->update([
            'name'  => $data['name'],
            'email' => $data['email'],
        ]);

        return $admin->fresh();
    }

    /**
     * Mengganti password admin.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function changePassword(Admin $admin, array $data): void
    {
        /*
        |--------------------------------------------------------------------------
        | Verifikasi password lama
        |--------------------------------------------------------------------------
        */

        if (! Hash::check($data['current_password'], $admin->password)) {
            throw ValidationException::withMessages([
                'current_password' => ['Password lama tidak sesuai.'],
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Simpan password baru
        |--------------------------------------------------------------------------
        */

        $admin->update([
            'password' => Hash::make($data['password']),
        ]);
    }
}
