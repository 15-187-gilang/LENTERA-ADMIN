<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Facades\Storage;

class SettingResource extends JsonResource
{
    /**
     * Transform resource.
     */
    public function toArray(Request $request): array
    {
        return [

            'id' => $this->id,

            'site_name' => $this->site_name,

            'site_description' => $this->site_description,

            'logo' => $this->logo
                ? Storage::url($this->logo)
                : null,

            'institution_logo' => $this->institution_logo
                ? Storage::url($this->institution_logo)
                : null,

            'favicon' => $this->favicon
                ? Storage::url($this->favicon)
                : null,

            'hero_image' => $this->hero_image
                ? Storage::url($this->hero_image)
                : null,

            'email' => $this->email,

            'phone' => $this->phone,

            'address' => $this->address,

            'facebook' => $this->facebook,

            'instagram' => $this->instagram,

            'youtube' => $this->youtube,

            'twitter' => $this->twitter,

            'copyright' => $this->copyright,

            'seo_title' => $this->seo_title,

            'seo_description' => $this->seo_description,

            'maintenance_mode' => (bool) $this->maintenance_mode,

            'maintenance_message' => $this->maintenance_message,

            'created_at' => $this->created_at,

            'updated_at' => $this->updated_at,
        ];
    }
}