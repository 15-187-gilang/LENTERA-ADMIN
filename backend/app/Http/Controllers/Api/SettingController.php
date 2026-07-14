<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Setting\UpdateSettingRequest;
use App\Http\Resources\SettingResource;
use App\Services\SettingService;
use Illuminate\Http\JsonResponse;

class SettingController extends Controller
{
    public function __construct(
        private readonly SettingService $settingService
    ) {
    }

    /**
     * Menampilkan setting website.
     */
    public function show(): JsonResponse
    {
        return $this->success(

            new SettingResource(

                $this->settingService->get()

            ),

            'Pengaturan website berhasil diambil.'

        );
    }

    /**
     * Memperbarui setting website.
     */
    public function update(
        UpdateSettingRequest $request
    ): JsonResponse {

        $setting = $this->settingService
            ->update(
                $request->validated()
            );

        return $this->success(

            new SettingResource($setting),

            'Pengaturan website berhasil diperbarui.'

        );
    }
}