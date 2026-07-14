<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Category;
use App\Models\Achievement;
use Illuminate\Database\Seeder;

class AchievementSeeder extends Seeder
{
    public function run(): void
    {
        $admin = Admin::first();

        Category::all()->each(function (Category $category) use ($admin) {

            Achievement::factory()

                ->count(8)

                ->create([

                    'category_id' => $category->id,

                    'created_by' => $admin->id,

                ]);

        });
    }
}