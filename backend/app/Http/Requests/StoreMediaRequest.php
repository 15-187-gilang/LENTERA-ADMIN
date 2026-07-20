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
                'file',
                'mimes:jpg,jpeg,png,webp,gif,pdf',
                'max:5120', // 5 MB
            ],
            'thumbnail' => [
                'nullable',
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:1024', // 1 MB untuk thumbnail
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'file.required' => 'File wajib diunggah.',
            'file.file'     => 'File tidak valid.',
            'file.mimes'    => 'Format file yang diizinkan: JPG, JPEG, PNG, WEBP, GIF, PDF.',
            'file.max'      => 'Ukuran file maksimal adalah 5 MB.',
        ];
    }
}
