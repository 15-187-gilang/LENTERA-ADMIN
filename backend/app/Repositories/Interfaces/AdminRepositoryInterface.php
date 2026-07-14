<?php

namespace App\Repositories\Interfaces;

use App\Models\Admin;

interface AdminRepositoryInterface
{
    /**
     * Mencari admin berdasarkan email.
     */
    public function findByEmail(string $email): ?Admin;
}