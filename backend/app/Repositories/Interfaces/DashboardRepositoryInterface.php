<?php

namespace App\Repositories\Interfaces;

use Illuminate\Support\Collection;

/**
 * --------------------------------------------------------------------------
 * Dashboard Repository Interface
 * --------------------------------------------------------------------------
 *
 * Kontrak repository untuk pengambilan seluruh data Dashboard.
 *
 * Repository hanya bertanggung jawab mengambil data dari database,
 * tanpa mengandung business logic.
 *
 * @package App\Repositories\Interfaces
 */
interface DashboardRepositoryInterface
{
    /**
     * ----------------------------------------------------------------------
     * Mengambil ringkasan statistik dashboard.
     * ----------------------------------------------------------------------
     *
     * Data yang dikembalikan:
     * - Total Prestasi
     * - Total Kategori
     * - Total Published
     * - Total Draft
     * - Total Featured
     *
     * @return array<string, int>
     */
    public function getStatistics(): array;

    /**
     * ----------------------------------------------------------------------
     * Mengambil daftar prestasi terbaru.
     * ----------------------------------------------------------------------
     *
     * @param int $limit Jumlah data yang diambil.
     *
     * @return Collection
     */
    public function getRecentAchievements(
        int $limit = 5
    ): Collection;



    /**
     * ----------------------------------------------------------------------
     * Mengambil tren prestasi per tahun.
     * ----------------------------------------------------------------------
     *
     * Digunakan ketika Dashboard pertama kali dibuka.
     *
     * Contoh:
     *
     * 2022 → 12
     * 2023 → 15
     * 2024 → 18
     *
     * @return Collection
     */
    public function getAchievementTrendByYear(): Collection;

    /**
     * ----------------------------------------------------------------------
     * Mengambil tren prestasi per bulan.
     * ----------------------------------------------------------------------
     *
     * Digunakan ketika admin memilih filter tahun.
     *
     * Contoh:
     *
     * Jan → 3
     * Feb → 6
     * Mar → 4
     *
     * @param int $year
     *
     * @return Collection
     */
    public function getAchievementTrendByMonth(
        int $year
    ): Collection;

    /**
     * ----------------------------------------------------------------------
     * Mengambil jumlah prestasi berdasarkan kategori.
     * ----------------------------------------------------------------------
     *
     * Digunakan pada halaman Analytics.
     *
     * @return Collection
     */
    public function getAchievementByCategory(): Collection;

    /**
     * ----------------------------------------------------------------------
     * Mengambil jumlah prestasi berdasarkan level.
     * ----------------------------------------------------------------------
     *
     * Digunakan pada halaman Analytics.
     *
     * @return Collection
     */
    public function getAchievementByLevel(): Collection;
}