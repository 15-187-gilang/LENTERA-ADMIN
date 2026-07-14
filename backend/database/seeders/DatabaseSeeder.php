<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\AdminSeeder;   

/**
 * --------------------------------------------------------------------------
 * Database Seeder
 * --------------------------------------------------------------------------
 *
 * Seeder utama aplikasi LENTERA.
 */

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([

            AdminSeeder::class,

            SettingSeeder::class,

            CategorySeeder::class,

            AchievementSeeder::class,

        ]);
    }
}