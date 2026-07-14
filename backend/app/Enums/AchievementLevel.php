<?php

namespace App\Enums;

/**
 * --------------------------------------------------------------------------
 * AchievementLevel
 * --------------------------------------------------------------------------
 *
 * Enum ini berisi daftar level prestasi yang digunakan
 * pada seluruh aplikasi.
 *
 * Keuntungan:
 * - Menghindari typo.
 * - Mudah digunakan pada validasi.
 * - Mudah digunakan pada dropdown.
 *
 */
enum AchievementLevel:string
{
    case KABUPATEN = 'Kabupaten';

    case PROVINSI = 'Provinsi';

    case NASIONAL = 'Nasional';

    case INTERNASIONAL = 'Internasional';

    /**
     * Mengembalikan seluruh value enum.
     *
     * Contoh:
     * [
     *   "Kabupaten",
     *   "Provinsi",
     *   ...
     * ]
     */
    public static function values(): array
    {
        return array_column(self::cases(),'value');
    }
}