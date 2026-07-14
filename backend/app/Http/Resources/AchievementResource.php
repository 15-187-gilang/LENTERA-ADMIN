<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

/**
 * -----------------------------------------------------------------------------
 * Achievement Resource
 * -----------------------------------------------------------------------------
 *
 * Bertugas mengubah data Achievement menjadi format JSON
 * yang akan dikirimkan kepada Frontend.
 *
 * Resource ini menjaga agar struktur response API tetap konsisten
 * serta mencegah pengiriman field yang tidak diperlukan.
 */
class AchievementResource extends JsonResource
{
    /**
     * Transform resource menjadi array.
     */
    public function toArray(Request $request): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | Informasi Utama
            |--------------------------------------------------------------------------
            */

            'id' => $this->id,

            'title' => $this->title,

            'slug' => $this->slug,

            'recipient' => $this->recipient,

            'organizer' => $this->organizer,

            'level' => $this->level,

            'achievement_date' => optional(
                $this->achievement_date
            )->format('Y-m-d'),

            'description' => $this->description,

            'short_description' => Str::limit(
                $this->description,
                120
            ),

            'level_badge' => match ($this->level) {

                'Kabupaten' => 'secondary',

                'Provinsi' => 'info',

                'Nasional' => 'success',

                'Internasional' => 'danger',

                default => 'primary',

            },

            'status' => [
                'published' => (bool) $this->is_published,
                'label' => $this->is_published ? 'Published' : 'Draft',
            ],

            'is_featured' => $this->featured,

            'featured_label' => $this->featured? 'Unggulan': 'Biasa',



            /*
            |--------------------------------------------------------------------------
            | Thumbnail
            |--------------------------------------------------------------------------
            */

            'thumbnail_url' => $this->thumbnail
                ? asset('storage/'.$this->thumbnail): null,

            /*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */

            'featured' => $this->featured,

            'is_published' => $this->is_published,

            'published_at' => optional(
                $this->published_at
            )->format('Y-m-d H:i'),

            /*
            |--------------------------------------------------------------------------
            | Relasi
            |--------------------------------------------------------------------------
            */

            'category' => [
                'id' => $this->category?->id,
                'name' => $this->category?->name,
                'slug' => $this->category?->slug,
            ],

            'creator' => [
                'id' => $this->creator?->id,
                'name' => $this->creator?->name,
                'email'=>$this->creator?->email,
            ],

            /*
            |--------------------------------------------------------------------------
            | Timestamp
            |--------------------------------------------------------------------------
            */

            'created_at' => optional(
                $this->created_at
            )->format('Y-m-d H:i'),

            'updated_at' => optional(
                $this->updated_at
            )->format('Y-m-d H:i'),

        ];
    }
}