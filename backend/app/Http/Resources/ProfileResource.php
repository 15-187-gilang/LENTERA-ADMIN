<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * -----------------------------------------------------------------------------
 * Profile Resource
 * -----------------------------------------------------------------------------
 *
 * Mengubah model Admin menjadi format JSON untuk response profil.
 * Hanya field yang relevan yang diekspos — password dan remember_token
 * tidak pernah ditampilkan.
 */
class ProfileResource extends JsonResource
{
    /**
     * Transform resource menjadi array.
     */
    public function toArray(Request $request): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | Identitas
            |--------------------------------------------------------------------------
            */

            'id'    => $this->id,

            'name'  => $this->name,

            'email' => $this->email,

            /*
            |--------------------------------------------------------------------------
            | Timestamp Login & Akun
            |--------------------------------------------------------------------------
            */

            'last_login_at' => $this->last_login_at
                ? $this->last_login_at->format('d M Y, H:i')
                : null,

            'created_at' => optional($this->created_at)->format('d M Y'),

        ];
    }
}
