<?php

namespace App\Repositories;

use App\Models\Admin;
use App\Repositories\Interfaces\AdminRepositoryInterface;

/**
 * --------------------------------------------------------------------------
 * Admin Repository
 * --------------------------------------------------------------------------
 *
 * Mengelola seluruh query database yang berkaitan dengan Admin.
 */
class AdminRepository implements AdminRepositoryInterface
{
    /**
     * Mengambil data admin berdasarkan email.
     */
    public function findByEmail(string $email): ?Admin
    {
        return Admin::where('email', $email)->first();
    }
}