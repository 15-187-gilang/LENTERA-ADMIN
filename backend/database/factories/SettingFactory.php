<?php

namespace Database\Factories;

use App\Models\Setting;
use Illuminate\Database\Eloquent\Factories\Factory;

class SettingFactory extends Factory
{
    protected $model = Setting::class;

    public function definition(): array
    {
        return [

            'site_name' => 'LANTERA',

            'site_description' => fake()->sentence(),

            'email' => fake()->safeEmail(),

            'phone' => fake()->phoneNumber(),

            'address' => fake()->address(),

            'maintenance_mode' => false,

        ];
    }
}