<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * --------------------------------------------------------------------------
 * Category Resource
 * --------------------------------------------------------------------------
 *
 * Mengatur format JSON yang dikirim ke frontend.
 */
class CategoryResource extends JsonResource
{
    /**
     * Transform data menjadi array.
     */
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'name' => $this->name,

            'slug' => $this->slug,

            'description' => $this->description,

            'achievements_count' => $this->achievements_count ?? 0,

            'created_at' => $this->created_at?->format('Y-m-d H:i'),

            'updated_at' => $this->updated_at?->format('Y-m-d H:i'),

        ];
    }
}