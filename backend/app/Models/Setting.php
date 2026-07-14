<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * -----------------------------------------------------------------------------
 * Setting Model
 * -----------------------------------------------------------------------------
 *
 * Menyimpan konfigurasi website.
 *
 * Hanya terdapat satu record pada tabel settings.
 */
class Setting extends Model
{
    use HasFactory;

    /**
     * Mass Assignment.
     */
    protected $fillable = [

        'site_name',

        'site_description',

        'logo',

        'institution_logo',

        'favicon',

        'hero_image',

        'email',

        'phone',

        'address',

        'facebook',

        'instagram',

        'youtube',

        'twitter',

        'copyright',

        'seo_title',

        'seo_description',

        'maintenance_mode',

        'maintenance_message',
    ];

    /**
     * Attribute Casting.
     */
    protected function casts(): array
    {
        return [

            'maintenance_mode' => 'boolean',

        ];
    }
}