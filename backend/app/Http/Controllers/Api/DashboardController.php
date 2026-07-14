<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\DashboardResource;
use App\Services\DashboardService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

/**
 * --------------------------------------------------------------------------
 * Dashboard Controller
 * --------------------------------------------------------------------------
 *
 * Menangani seluruh endpoint Dashboard Admin.
 *
 * Controller hanya bertugas:
 * - Menerima HTTP Request
 * - Memanggil DashboardService
 * - Mengembalikan HTTP Response
 *
 * Business Logic tidak boleh ditulis di Controller.
 *
 * @package App\Http\Controllers\Api
 */
class DashboardController extends Controller
{
    /**
     * Dependency Injection Dashboard Service.
     */
    public function __construct(
        private readonly DashboardService $dashboardService
    ) {
    }

    /**
     * ----------------------------------------------------------------------
     * Dashboard Utama
     * ----------------------------------------------------------------------
     *
     * Endpoint:
     *
     * GET /api/dashboard
     *
     * Query Parameter (Opsional):
     *
     * period = year
     *
     * atau
     *
     * period = month
     * year = 2025
     *
     * Response:
     *
     * - Ringkasan statistik
     * - Grafik tren prestasi
     * - Prestasi terbaru
     * - Aktivitas terbaru
     */
    public function index(
        Request $request
    ): JsonResponse {

        $filters = $request->only([
            'period',
            'year',
        ]);

        return $this->success(

            DashboardResource::make(

                $this->dashboardService
                    ->getDashboard($filters)

            ),

            'Data dashboard berhasil diambil.'

        );
    }

    /**
     * ----------------------------------------------------------------------
     * Statistik Prestasi Berdasarkan Kategori
     * ----------------------------------------------------------------------
     *
     * Endpoint:
     *
     * GET /api/dashboard/category
     *
     * Digunakan pada halaman Analytics.
     */
    public function achievementByCategory(): JsonResponse
    {
        return $this->success(

            $this->dashboardService
                ->getAchievementByCategory(),

            'Data prestasi berdasarkan kategori berhasil diambil.'

        );
    }

    /**
     * ----------------------------------------------------------------------
     * Statistik Prestasi Berdasarkan Level
     * ----------------------------------------------------------------------
     *
     * Endpoint:
     *
     * GET /api/dashboard/level
     *
     * Digunakan pada halaman Analytics.
     */
    public function achievementByLevel(): JsonResponse
    {
        return $this->success(

            $this->dashboardService
                ->getAchievementByLevel(),

            'Data prestasi berdasarkan level berhasil diambil.'

        );
    }
}