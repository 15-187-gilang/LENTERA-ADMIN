<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * -----------------------------------------------------------------------------
 * Store Media Request
 * -----------------------------------------------------------------------------
 *
 * Validasi ketika admin mengupload file media baru.
 */
class StoreMediaRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'file' => [
                'required',
                'image',
                'mimes:jpg,jpeg,png,webp,gif',
                'max:5120', // 5 MB
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'File gambar wajib diunggah.',
            'file.image'    => 'File harus berupa gambar.',
            'file.mimes'    => 'Format gambar yang diizinkan: JPG, JPEG, PNG, WEBP, GIF.',
            'file.max'      => 'Ukuran file maksimal adalah 5 MB.',
        ];
    }
}
