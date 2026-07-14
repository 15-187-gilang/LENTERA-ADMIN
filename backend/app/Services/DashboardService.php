<?php

namespace App\Services;

use App\Repositories\Interfaces\DashboardRepositoryInterface;
use Illuminate\Support\Collection;

/**
 * --------------------------------------------------------------------------
 * Dashboard Service
 * --------------------------------------------------------------------------
 *
 * Menangani seluruh business logic Dashboard.
 *
 * Service tidak boleh berinteraksi langsung dengan database.
 * Seluruh pengambilan data dilakukan melalui Repository.
 *
 * @package App\Services
 */
class DashboardService
{
    /**
     * Dependency Injection Dashboard Repository.
     */
    public function __construct(
        private readonly DashboardRepositoryInterface $dashboardRepository
    ) {
    }

    /**
     * ----------------------------------------------------------------------
     * Mengambil seluruh data Dashboard.
     * ----------------------------------------------------------------------
     *
     * Data yang dikembalikan:
     *
     * - Ringkasan statistik
     * - Grafik tren prestasi
     * - Prestasi terbaru
     * - Aktivitas terbaru
     *
     * @param array<string,mixed> $filters
     *
     * @return array<string,mixed>
     */
    public function getDashboard(
        array $filters = []
    ): array {

        return [

            /*
            |--------------------------------------------------------------------------
            | Ringkasan Dashboard
            |--------------------------------------------------------------------------
            */

            'summary' => $this->getStatistics(),

            /*
            |--------------------------------------------------------------------------
            | Trend Prestasi
            |--------------------------------------------------------------------------
            */

            'achievement_trend' => $this->getAchievementTrend($filters),

            /*
            |--------------------------------------------------------------------------
            | Periode Grafik
            |--------------------------------------------------------------------------
            */

            'period' => $filters['period'] ?? 'year',

            /*
            |--------------------------------------------------------------------------
            | Prestasi Terbaru
            |--------------------------------------------------------------------------
            */

            'recent_achievements' => $this->getRecentAchievements(),



        ];
    }

    /**
     * ----------------------------------------------------------------------
     * Mengambil ringkasan statistik Dashboard.
     * ----------------------------------------------------------------------
     *
     * @return array<string,int>
     */
    public function getStatistics(): array
    {
        return $this->dashboardRepository
            ->getStatistics();
    }

    /**
     * ----------------------------------------------------------------------
     * Mengambil daftar prestasi terbaru.
     * ----------------------------------------------------------------------
     *
     * @param int $limit
     *
     * @return Collection
     */
    public function getRecentAchievements(
        int $limit = 5
    ): Collection {

        return $this->dashboardRepository
            ->getRecentAchievements($limit);
    }



    /**
     * ----------------------------------------------------------------------
     * Mengambil data tren prestasi.
     * ----------------------------------------------------------------------
     *
     * Default:
     * period = year
     *
     * Jika frontend mengirim:
     *
     * period=month&year=2026
     *
     * maka grafik akan menampilkan data bulanan.
     *
     * @param array<string,mixed> $filters
     *
     * @return Collection
     */
    public function getAchievementTrend(
        array $filters
    ): Collection {

        $period = $filters['period'] ?? 'year';

        if (
            $period === 'month'
            && !empty($filters['year'])
        ) {

            return $this->dashboardRepository
                ->getAchievementTrendByMonth(
                    (int) $filters['year']
                );

        }

        return $this->dashboardRepository
            ->getAchievementTrendByYear();
    }

    /**
     * ----------------------------------------------------------------------
     * Mengambil statistik berdasarkan kategori.
     * ----------------------------------------------------------------------
     *
     * Digunakan pada halaman Analytics.
     *
     * @return Collection
     */
    public function getAchievementByCategory(): Collection
    {
        return $this->dashboardRepository
            ->getAchievementByCategory();
    }

    /**
     * ----------------------------------------------------------------------
     * Mengambil statistik berdasarkan level.
     * ----------------------------------------------------------------------
     *
     * Digunakan pada halaman Analytics.
     *
     * @return Collection
     */
    public function getAchievementByLevel(): Collection
    {
        return $this->dashboardRepository
            ->getAchievementByLevel();
    }
}