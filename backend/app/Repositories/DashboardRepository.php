<?php

namespace App\Repositories;

use App\Models\Achievement;
use App\Models\Category;
use App\Repositories\Interfaces\DashboardRepositoryInterface;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Cache;

/**
 * --------------------------------------------------------------------------
 * Dashboard Repository
 * --------------------------------------------------------------------------
 *
 * Bertanggung jawab mengambil seluruh data Dashboard
 * dari database.
 *
 * Repository TIDAK boleh berisi business logic.
 *
 * @package App\Repositories
 */
class DashboardRepository implements DashboardRepositoryInterface
{
    /**
     * ----------------------------------------------------------------------
     * Mengambil ringkasan statistik Dashboard.
     * ----------------------------------------------------------------------
     *
     * @return array<string,int>
     */
    public function getStatistics(): array
    {
        return Cache::remember(

            'dashboard.statistics',

            now()->addMinutes(5),

            function () {

                return [

                    'total_achievements' => Achievement::query()->count(),

                    'total_categories' => Category::query()->count(),

                    'published' => Achievement::query()
                        ->where('is_published', true)
                        ->count(),

                    'draft' => Achievement::query()
                        ->where('is_published', false)
                        ->count(),

                    'featured' => Achievement::query()
                        ->where('featured', true)
                        ->count(),

                ];

            }

        );
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

        return Cache::remember(

            "dashboard.recent_achievements.$limit",

            now()->addMinutes(5),

            function () use ($limit) {

                return Achievement::query()

                    ->with([
                        'category',
                        'creator'
                    ])

                    ->latest()

                    ->limit($limit)

                    ->get();

            }

        );
    }



    /**
     * ----------------------------------------------------------------------
     * Mengambil tren prestasi per tahun.
     * ----------------------------------------------------------------------
     *
     * Contoh:
     *
     * 2022 -> 5
     * 2023 -> 10
     * 2024 -> 18
     *
     * @return Collection
     */
    public function getAchievementTrendByYear(): Collection
    {
        return Achievement::query()

            ->selectRaw("
                EXTRACT(YEAR FROM achievement_date) AS label,
                COUNT(*) AS total
            ")

            ->where('is_published', true)

            ->groupByRaw("
                EXTRACT(YEAR FROM achievement_date)
            ")

            ->orderByRaw("
                EXTRACT(YEAR FROM achievement_date)
            ")

            ->get();
    }

    /**
     * ----------------------------------------------------------------------
     * Mengambil tren prestasi per bulan.
     * ----------------------------------------------------------------------
     *
     * Digunakan ketika admin memilih filter tahun.
     *
     * @param int $year
     *
     * @return Collection
     */
    public function getAchievementTrendByMonth(
        int $year
    ): Collection {

        return Achievement::query()

            ->selectRaw("
                EXTRACT(MONTH FROM achievement_date) AS month_number,

                TO_CHAR(
                    achievement_date,
                    'Mon'
                ) AS label,

                COUNT(*) AS total
            ")

            ->whereYear(
                'achievement_date',
                $year
            )

            ->where(
                'is_published',
                true
            )

            ->groupByRaw("
                EXTRACT(MONTH FROM achievement_date),

                TO_CHAR(
                    achievement_date,
                    'Mon'
                )
            ")

            ->orderByRaw("
                EXTRACT(MONTH FROM achievement_date)
            ")

            ->get();
    }

    /**
     * ----------------------------------------------------------------------
     * Mengambil jumlah prestasi berdasarkan kategori.
     * ----------------------------------------------------------------------
     *
     * Digunakan untuk halaman Analytics.
     *
     * @return Collection
     */
    public function getAchievementByCategory(): Collection
    {
        return Achievement::query()

            ->join(
                'categories',
                'categories.id',
                '=',
                'achievements.category_id'
            )

            ->select([
                'categories.name',
            ])

            ->selectRaw("
                COUNT(*) AS total
            ")

            ->groupBy('categories.name')

            ->orderByDesc('total')

            ->get();
    }

    /**
     * ----------------------------------------------------------------------
     * Mengambil jumlah prestasi berdasarkan level.
     * ----------------------------------------------------------------------
     *
     * Digunakan untuk halaman Analytics.
     *
     * @return Collection
     */
    public function getAchievementByLevel(): Collection
    {
        return Achievement::query()

            ->select('level')

            ->selectRaw("
                COUNT(*) AS total
            ")

            ->groupBy('level')

            ->orderBy('level')

            ->get();
    }
}