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

            'logo' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    if (is_string($value)) return;
                    if (!($value instanceof \Illuminate\Http\UploadedFile)) { $fail('Logo tidak valid.'); return; }
                    if ($value->getSize() > 2097152) { $fail('Ukuran maksimal 2 MB.'); }
                    $ext = strtolower($value->getClientOriginalExtension());
                    if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) { $fail('Format gambar tidak valid.'); }
                }
            ],

            'institution_logo' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    if (is_string($value)) return;
                    if (!($value instanceof \Illuminate\Http\UploadedFile)) { $fail('Logo Institusi tidak valid.'); return; }
                    if ($value->getSize() > 2097152) { $fail('Ukuran maksimal 2 MB.'); }
                    $ext = strtolower($value->getClientOriginalExtension());
                    if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) { $fail('Format gambar tidak valid.'); }
                }
            ],

            'favicon' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    if (is_string($value)) return;
                    if (!($value instanceof \Illuminate\Http\UploadedFile)) { $fail('Favicon tidak valid.'); return; }
                    if ($value->getSize() > 1048576) { $fail('Ukuran maksimal 1 MB.'); }
                    $ext = strtolower($value->getClientOriginalExtension());
                    if (!in_array($ext, ['png', 'ico'])) { $fail('Format gambar tidak valid.'); }
                }
            ],

            'hero_image' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    if (is_string($value)) return;
                    if (!($value instanceof \Illuminate\Http\UploadedFile)) { $fail('Hero image tidak valid.'); return; }
                    if ($value->getSize() > 4194304) { $fail('Ukuran maksimal 4 MB.'); }
                    $ext = strtolower($value->getClientOriginalExtension());
                    if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) { $fail('Format gambar tidak valid.'); }
                }
            ],

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