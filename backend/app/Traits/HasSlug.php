<?php

namespace App\Traits;

use Illuminate\Support\Str;

/**
 * --------------------------------------------------------------------------
 * HasSlug Trait
 * --------------------------------------------------------------------------
 *
 * Trait ini digunakan untuk membuat slug secara otomatis
 * berdasarkan nama atau judul data.
 *
 * Digunakan oleh:
 * - Category
 * - Achievement
 */
trait HasSlug
{
    /**
     * Menghasilkan slug dari teks yang diberikan.
     *
     * @param string $text
     * @return string
     */
    protected function generateSlug(string $text): string
    {
        return Str::slug($text);
    }
}