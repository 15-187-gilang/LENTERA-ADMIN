<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

/**
 * --------------------------------------------------------------------------
 * Category Seeder
 * --------------------------------------------------------------------------
 *
 * Membuat kategori default.
 */

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [

            [
                'name' => 'Penghargaan',
                'slug' => 'penghargaan',
                'description' => 'Prestasi berupa penghargaan.'
            ],

            [
                'name' => 'Kompetisi',
                'slug' => 'kompetisi',
                'description' => 'Prestasi hasil kompetisi.'
            ],

            [
                'name' => 'Inovasi',
                'slug' => 'inovasi',
                'description' => 'Prestasi inovasi instansi.'
            ],

            [
                'name' => 'Publikasi',
                'slug' => 'publikasi',
                'description' => 'Publikasi ilmiah.'
            ],

        ];

        foreach ($categories as $category) {

            Category::updateOrCreate(

                ['slug' => $category['slug']],

                $category
            );
        }
    }
}