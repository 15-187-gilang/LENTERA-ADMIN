<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Services\AuthService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Resources\LoginResource;

/**
 * Authentication Controller
 *
 * Menyediakan endpoint autentikasi Administrator
 * untuk backend LANTERA menggunakan Laravel Sanctum.
 */
class AuthController extends Controller
{
    public function __construct(
        private readonly AuthService $authService
    ) {
    }

    /**
     * Login Administrator
     *
     * Melakukan autentikasi administrator menggunakan
     * email dan password.
     *
     * Jika berhasil akan mengembalikan Sanctum Token
     * yang digunakan pada endpoint yang dilindungi.
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $result = $this->authService->login(
            $request->validated(),
            $request->ip()
        );

        return $this->success(
            new LoginResource($result),
            'Login berhasil.'
        );
    }

    /**
     * Logout Administrator
     *
     * Menghapus token autentikasi administrator
     * yang sedang digunakan.
     */
    public function logout(Request $request): JsonResponse
    {
        $this->authService->logout($request->user());

        return $this->success(
            null,
            'Logout berhasil.'
        );
    }
}