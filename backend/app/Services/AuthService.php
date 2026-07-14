<?php

namespace App\Services;

use App\Models\Admin;
use App\Repositories\Interfaces\AdminRepositoryInterface;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Validation\ValidationException;

class AuthService
{
    public function __construct(
        private readonly AdminRepositoryInterface $adminRepository
    ) {
    }

    public function login(array $credentials, string $ip): array
    {
        $throttleKey = strtolower($credentials['email']).'|'.$ip;

        /*
        |--------------------------------------------------------------------------
        | Cek Rate Limiter
        |--------------------------------------------------------------------------
        */

        if (RateLimiter::tooManyAttempts($throttleKey, 5)) {

            $seconds = RateLimiter::availableIn($throttleKey);

            throw ValidationException::withMessages([
                'email' => [
                    "Terlalu banyak percobaan login. Silakan coba lagi dalam {$seconds} detik."
                ]
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Cari Admin
        |--------------------------------------------------------------------------
        */

        $admin = $this->adminRepository->findByEmail(
            $credentials['email']
        );

        /*
        |--------------------------------------------------------------------------
        | Password Salah
        |--------------------------------------------------------------------------
        */

        if (! $admin || ! Hash::check($credentials['password'], $admin->password)) {

            RateLimiter::hit(
                $throttleKey,
                30 // lock selama 30 detik setelah batas percobaan tercapai
            );

            throw ValidationException::withMessages([
                'email' => [
                    'Email atau password salah.'
                ]
            ]);
        }

        /*
        |--------------------------------------------------------------------------
        | Login Berhasil
        |--------------------------------------------------------------------------
        */

        RateLimiter::clear($throttleKey);

        $token = $admin
            ->createToken('admin-token')
            ->plainTextToken;

        /*
        |--------------------------------------------------------------------------
        | Activity Log
        |--------------------------------------------------------------------------
        */



        return [

            'admin' => $admin,

            'token' => $token,

        ];
    }

    public function logout(Admin $admin): void
    {


        $admin->tokens()->delete();
    }
}