<?php

namespace App\Http\Requests\Achievement;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Nette\Schema\Message;

/**
 * -----------------------------------------------------------------------------
 * Update Achievement Request
 * -----------------------------------------------------------------------------
 *
 * Validasi ketika admin memperbarui data prestasi.
 */
class UpdateAchievementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [

            'category_id' => [
                'required',
                'exists:categories,id'
            ],

            'title' => [
                'required',
                'string',
                'max:255'
            ],

            'recipient' => [
                'required',
                'string',
                'max:255'
            ],

            'organizer' => [
                'required',
                'string',
                'max:255'
            ],

            'level' => [
                'required',
                Rule::in([
                    'Kabupaten',
                    'Provinsi',
                    'Nasional',
                    'Internasional'
                ])
            ],

            'achievement_date' => [
                'required',
                'date'
            ],

            'description' => [
                'required',
                'string'
            ],

            'thumbnail' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    if (is_string($value)) {
                        return;
                    } elseif ($value instanceof \Illuminate\Http\UploadedFile) {
                        if ($value->getSize() > 4194304) {
                            $fail('Ukuran thumbnail maksimal 4MB.');
                        }
                        if (!in_array(strtolower($value->extension()), ['jpg', 'jpeg', 'png', 'webp'])) {
                            $fail('Thumbnail harus berupa file gambar (jpg, jpeg, png, webp).');
                        }
                    } else {
                        $fail('Format thumbnail tidak valid.');
                    }
                }
            ],

            'attachment' => [
                'nullable',
                'file',
                'mimes:pdf',
                'max:5120',
            ],

            'thumbnail_source' => [
                'nullable',
                Rule::in(['upload', 'library'])
            ],

            'thumbnail_media_url' => [
                'nullable',
                'string'
            ],

            'featured' => [
                'boolean'
            ],

            'is_published' => [
                'boolean'
            ]

        ];
    }
}