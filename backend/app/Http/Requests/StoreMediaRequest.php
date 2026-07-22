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
                function ($attribute, $value, $fail) {
                    if (!($value instanceof \Illuminate\Http\UploadedFile)) {
                        $fail('File tidak valid.');
                        return;
                    }
                    if ($value->getSize() > 5242880) { // 5 MB
                        $fail('Ukuran file maksimal adalah 5 MB.');
                    }
                    $ext = strtolower($value->getClientOriginalExtension());
                    if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp', 'gif', 'pdf'])) {
                        $fail('Format file yang diizinkan: JPG, JPEG, PNG, WEBP, GIF, PDF.');
                    }
                },
            ],
            'thumbnail' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    if (!($value instanceof \Illuminate\Http\UploadedFile)) {
                        $fail('Thumbnail tidak valid.');
                        return;
                    }
                    if ($value->getSize() > 1048576) { // 1 MB
                        $fail('Ukuran thumbnail maksimal 1 MB.');
                    }
                    $ext = strtolower($value->getClientOriginalExtension());
                    if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) {
                        $fail('Thumbnail harus berupa file gambar.');
                    }
                },
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
