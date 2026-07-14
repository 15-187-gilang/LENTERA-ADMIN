<?php

namespace Database\Factories;

use App\Models\Achievement;
use App\Models\AchievementImage;
use Illuminate\Database\Eloquent\Factories\Factory;

class AchievementImageFactory extends Factory
{
    protected $model = AchievementImage::class;

    public function definition(): array
    {
        return [

            'achievement_id' => Achievement::factory(),

            'image' => 'achievements/sample.jpg',

            'caption' => fake()->sentence(),

            'sort_order' => fake()->numberBetween(0, 20),

        ];
    }
}