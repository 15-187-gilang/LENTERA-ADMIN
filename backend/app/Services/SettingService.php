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

            if (
                $setting->logo &&
                Storage::disk('public')->exists($setting->logo)
            ) {
                Storage::disk('public')->delete($setting->logo);
            }

            $data['logo'] = $data['logo']->store(
                'settings',
                'public'
            );
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

            if (
                $setting->institution_logo &&
                Storage::disk('public')->exists($setting->institution_logo)
            ) {
                Storage::disk('public')->delete(
                    $setting->institution_logo
                );
            }

            $data['institution_logo'] = $data['institution_logo']->store(
                'settings',
                'public'
            );
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

            if (
                $setting->favicon &&
                Storage::disk('public')->exists($setting->favicon)
            ) {
                Storage::disk('public')->delete(
                    $setting->favicon
                );
            }

            $data['favicon'] = $data['favicon']->store(
                'settings',
                'public'
            );
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

            if (
                $setting->hero_image &&
                Storage::disk('public')->exists(
                    $setting->hero_image
                )
            ) {
                Storage::disk('public')->delete(
                    $setting->hero_image
                );
            }

            $data['hero_image'] = $data['hero_image']->store(
                'settings',
                'public'
            );
        }

        $setting = $this->settingRepository->update($data);

        return $setting;
    }
}