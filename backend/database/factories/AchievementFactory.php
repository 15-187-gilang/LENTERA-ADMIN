<?php

namespace Database\Factories;

use App\Models\Achievement;
use App\Models\Admin;
use App\Models\Category;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use App\Enums\AchievementLevel;

/**
 * --------------------------------------------------------------------------
 * Achievement Factory
 * --------------------------------------------------------------------------
 *
 * Menghasilkan data dummy prestasi.
 */

class AchievementFactory extends Factory
{
    protected $model = Achievement::class;

    public function definition(): array
    {
        $title = fake()->sentence(4);

        return [

            'category_id' => Category::factory(),

            'created_by' => Admin::factory(),

            'title' => $title,

            'slug' => Str::slug($title),

            'recipient' => fake()->company(),

            'organizer' => fake()->company(),

            'level' => fake()->randomElement([
                'Kabupaten',
                'Provinsi',
                'Nasional',
                'Internasional'
            ]),

            'achievement_date' => fake()->date(),

            'description' => fake()->paragraph(4),

            'thumbnail' => null,

            'featured' => fake()->boolean(20),

            'is_published' => true,

            'published_at' => now(),
        ];
    }
}