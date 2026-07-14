<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    public function run(): void
    {
        Admin::updateOrCreate(
            [
                'email' => 'admin@bps.go.id',
            ],
            [
                'name' => 'Administrator BPS',
                'password' => Hash::make('admin123'),
            ]
        );
    }
}