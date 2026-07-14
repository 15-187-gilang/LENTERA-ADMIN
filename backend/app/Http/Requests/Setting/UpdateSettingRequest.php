<?php

namespace App\Http\Requests\Setting;

use Illuminate\Foundation\Http\FormRequest;

class UpdateSettingRequest extends FormRequest
{
    /**
     * Otorisasi request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Validasi data.
     */
    public function rules(): array
    {
        return [

            'site_name' => ['required', 'string', 'max:255'],

            'site_description' => ['nullable', 'string'],

            'logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],

            'institution_logo' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:2048'],

            'favicon' => ['nullable', 'image', 'mimes:png,ico', 'max:1024'],

            'hero_image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],

            'email' => ['nullable', 'email'],

            'phone' => ['nullable', 'string', 'max:30'],

            'address' => ['nullable', 'string'],

            'facebook' => ['nullable', 'url'],

            'instagram' => ['nullable', 'url'],

            'youtube' => ['nullable', 'url'],

            'twitter' => ['nullable', 'url'],

            'copyright' => ['nullable', 'string'],

            'seo_title' => ['nullable', 'string', 'max:255'],

            'seo_description' => ['nullable', 'string'],

            'maintenance_mode' => ['boolean'],

            'maintenance_message' => ['nullable', 'string'],

        ];
    }
}