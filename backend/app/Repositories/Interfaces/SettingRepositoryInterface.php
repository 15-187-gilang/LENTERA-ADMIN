<?php

namespace App\Repositories\Interfaces;

use App\Models\Setting;

interface SettingRepositoryInterface
{
    /**
     * Mengambil setting website.
     */
    public function get(): ?Setting;

    /**
     * Memperbarui setting website.
     */
    public function update(array $data): Setting;
}