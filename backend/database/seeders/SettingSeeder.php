<?php

namespace Database\Seeders;

use App\Models\Setting;
use Illuminate\Database\Seeder;

/**
 * --------------------------------------------------------------------------
 * Setting Seeder
 * --------------------------------------------------------------------------
 *
 * Membuat konfigurasi awal website LANTERA.
 */
class SettingSeeder extends Seeder
{
    /**
     * Jalankan seeder.
     */
    public function run(): void
    {
        Setting::updateOrCreate(

            ['id' => 1],

            [

                /*
                |--------------------------------------------------------------------------
                | Website
                |--------------------------------------------------------------------------
                */

                'site_name' => 'LANTERA',

                'site_description' =>
                    'Website Prestasi BPS Kabupaten Pringsewu',

                /*
                |--------------------------------------------------------------------------
                | Logo
                |--------------------------------------------------------------------------
                */

                'logo' => null,

                'institution_logo' => null,

                'favicon' => null,

                'hero_image' => null,

                /*
                |--------------------------------------------------------------------------
                | Contact
                |--------------------------------------------------------------------------
                */

                'email' => 'admin@bps.go.id',

                'phone' => '(0721) 482909',

                'address' =>
                    'BPS Kabupaten Pringsewu, Pringsewu',

                /*
                |--------------------------------------------------------------------------
                | Social Media
                |--------------------------------------------------------------------------
                */

                'facebook' => null,

                'instagram' => null,

                'youtube' => null,

                'twitter' => null,

                /*
                |--------------------------------------------------------------------------
                | SEO
                |--------------------------------------------------------------------------
                */

                'seo_title' =>
                    'LANTERA - Website Prestasi BPS Kabupaten Pringsewu',

                'seo_description' =>
                    'Website dokumentasi prestasi pegawai BPS Kabupaten Pringsewu.',

                /*
                |--------------------------------------------------------------------------
                | Footer
                |--------------------------------------------------------------------------
                */

                'copyright' =>
                    '© ' . now()->year . ' BPS Kabupaten Pringsewu',

                /*
                |--------------------------------------------------------------------------
                | Maintenance
                |--------------------------------------------------------------------------
                */

                'maintenance_mode' => false,

                'maintenance_message' =>
                    'Website sedang dalam pemeliharaan. Silakan kembali beberapa saat lagi.',

            ]

        );
    }
}