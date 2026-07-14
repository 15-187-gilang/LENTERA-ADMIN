<?php

namespace App\Repositories;

use App\Models\Setting;
use App\Repositories\Interfaces\SettingRepositoryInterface;

/**
 * -----------------------------------------------------------------------------
 * Setting Repository
 * -----------------------------------------------------------------------------
 *
 * Bertanggung jawab terhadap seluruh operasi database
 * yang berkaitan dengan pengaturan website.
 */
class SettingRepository implements SettingRepositoryInterface
{
    /**
     * Mengambil data setting.
     *
     * Jika belum ada, otomatis membuat data default.
     */
    public function get(): Setting
    {
        return Setting::firstOrCreate(
            ['id' => 1],
            [
                'site_name' => 'LANTERA',
                'site_description' => null,
                'maintenance_mode' => false,
            ]
        );
    }

    /**
     * Memperbarui data setting.
     */
    public function update(array $data): Setting
    {
        $setting = $this->get();

        $setting->update($data);

        return $setting->fresh();
    }
}