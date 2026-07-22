<?php

namespace App\Services;

use App\Models\Setting;
use App\Repositories\Interfaces\SettingRepositoryInterface;
use Illuminate\Support\Facades\Storage;

/**
 * -----------------------------------------------------------------------------
 * Setting Service
 * -----------------------------------------------------------------------------
 *
 * Bertanggung jawab terhadap seluruh business logic
 * pengaturan website.
 */
class SettingService
{
    public function __construct(
        private readonly SettingRepositoryInterface $settingRepository
    ) {
    }

    /**
     * Mengambil data setting.
     */
    public function get(): Setting
    {
        return $this->settingRepository->get();
    }

    /**
     * Memperbarui pengaturan website.
     */
    public function update(array $data): Setting
    {
        $setting = $this->settingRepository->get();

        /*
        |--------------------------------------------------------------------------
        | Upload Logo
        |--------------------------------------------------------------------------
        */

        if (
            isset($data['logo']) &&
            $data['logo'] !== null
        ) {
            if ($setting->logo && file_exists(storage_path('app/public/' . $setting->logo))) {
                unlink(storage_path('app/public/' . $setting->logo));
            }
            $ext = strtolower($data['logo']->getClientOriginalExtension());
            $uniqueName = uniqid() . '.' . $ext;
            $filePath = 'settings/' . $uniqueName;
            $fullPath = storage_path('app/public/' . $filePath);
            if (!is_dir(dirname($fullPath))) { mkdir(dirname($fullPath), 0775, true); }
            file_put_contents($fullPath, file_get_contents($data['logo']->getPathname()));
            $data['logo'] = $filePath;
        }

        /*
        |--------------------------------------------------------------------------
        | Upload Institution Logo
        |--------------------------------------------------------------------------
        */

        if (
            isset($data['institution_logo']) &&
            $data['institution_logo'] !== null
        ) {
            if ($setting->institution_logo && file_exists(storage_path('app/public/' . $setting->institution_logo))) {
                unlink(storage_path('app/public/' . $setting->institution_logo));
            }
            $ext = strtolower($data['institution_logo']->getClientOriginalExtension());
            $uniqueName = uniqid() . '.' . $ext;
            $filePath = 'settings/' . $uniqueName;
            $fullPath = storage_path('app/public/' . $filePath);
            if (!is_dir(dirname($fullPath))) { mkdir(dirname($fullPath), 0775, true); }
            file_put_contents($fullPath, file_get_contents($data['institution_logo']->getPathname()));
            $data['institution_logo'] = $filePath;
        }

        /*
        |--------------------------------------------------------------------------
        | Upload Favicon
        |--------------------------------------------------------------------------
        */

        if (
            isset($data['favicon']) &&
            $data['favicon'] !== null
        ) {
            if ($setting->favicon && file_exists(storage_path('app/public/' . $setting->favicon))) {
                unlink(storage_path('app/public/' . $setting->favicon));
            }
            $ext = strtolower($data['favicon']->getClientOriginalExtension());
            $uniqueName = uniqid() . '.' . $ext;
            $filePath = 'settings/' . $uniqueName;
            $fullPath = storage_path('app/public/' . $filePath);
            if (!is_dir(dirname($fullPath))) { mkdir(dirname($fullPath), 0775, true); }
            file_put_contents($fullPath, file_get_contents($data['favicon']->getPathname()));
            $data['favicon'] = $filePath;
        }

        /*
        |--------------------------------------------------------------------------
        | Upload Hero Image
        |--------------------------------------------------------------------------
        */

        if (
            isset($data['hero_image']) &&
            $data['hero_image'] !== null
        ) {
            if ($setting->hero_image && file_exists(storage_path('app/public/' . $setting->hero_image))) {
                unlink(storage_path('app/public/' . $setting->hero_image));
            }
            $ext = strtolower($data['hero_image']->getClientOriginalExtension());
            $uniqueName = uniqid() . '.' . $ext;
            $filePath = 'settings/' . $uniqueName;
            $fullPath = storage_path('app/public/' . $filePath);
            if (!is_dir(dirname($fullPath))) { mkdir(dirname($fullPath), 0775, true); }
            file_put_contents($fullPath, file_get_contents($data['hero_image']->getPathname()));
            $data['hero_image'] = $filePath;
        }

        $setting = $this->settingRepository->update($data);

        return $setting;
    }
}