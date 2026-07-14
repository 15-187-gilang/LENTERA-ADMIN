<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Profile\ChangePasswordRequest;
use App\Http\Requests\Profile\UpdateProfileRequest;
use App\Http\Resources\ProfileResource;
use App\Services\ProfileService;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

/**
 * -----------------------------------------------------------------------------
 * Profile Controller
 * -----------------------------------------------------------------------------
 *
 * Mengelola profil administrator yang sedang login.
 * Tidak ada list, tambah, atau hapus — hanya satu data (admin aktif).
 *
 * Endpoint:
 *   GET  /api/profile          → show()
 *   PUT  /api/profile          → update()
 *   PUT  /api/profile/password → changePassword()
 */
class ProfileController extends Controller
{
    /**
     * Dependency Injection ProfileService.
     */
    public function __construct(
        private readonly ProfileService $profileService
    ) {
    }

    /**
     * Menampilkan profil admin yang sedang login.
     *
     * GET /api/profile
     */
    public function show(): JsonResponse
    {
        $admin = request()->user();

        return $this->success(
            new ProfileResource(
                $this->profileService->getProfile($admin)
            ),
            'Profil berhasil diambil.'
        );
    }

    /**
     * Memperbarui nama dan email admin.
     *
     * PUT /api/profile
     */
    public function update(UpdateProfileRequest $request): JsonResponse
    {
        $admin = $request->user();

        $updated = $this->profileService->updateProfile(
            $admin,
            $request->validated()
        );

        return $this->success(
            new ProfileResource($updated),
            'Profil berhasil diperbarui.'
        );
    }

    /**
     * Mengganti password admin.
     *
     * PUT /api/profile/password
     */
    public function changePassword(ChangePasswordRequest $request): JsonResponse
    {
        $admin = $request->user();

        try {
            $this->profileService->changePassword(
                $admin,
                $request->validated()
            );
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Password lama tidak sesuai.',
                'errors'  => $e->errors(),
            ], 422);
        }

        return $this->success(
            null,
            'Password berhasil diubah.'
        );
    }
}
