<?php

namespace Tests\Traits;

use App\Models\Admin;
use Laravel\Sanctum\Sanctum;

trait AuthenticateAdmin
{
    protected function authenticateAdmin(): Admin
    {
        $admin = Admin::factory()->create();

        Sanctum::actingAs($admin);

        return $admin;
    }
}