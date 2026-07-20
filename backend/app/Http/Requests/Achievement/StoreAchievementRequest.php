<?php

namespace App\Http\Requests\Achievement;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * -----------------------------------------------------------------------------
 * Store Achievement Request
 * -----------------------------------------------------------------------------
 *
 * Validasi ketika admin menambahkan data prestasi baru.
 */
class StoreAchievementRequest extends FormRequest
{
    /**
     * Semua admin yang telah login diperbolehkan.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Aturan validasi.
     */
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
                'required',
                'boolean'
            ],

            'is_published' => [
                'required',
                'boolean'
            ]

        ];
    }

    /**
     * Pesan validasi.
     */
    public function messages(): array
    {
        return [

            'category_id.required' => 'Kategori wajib dipilih.',

            'category_id.exists' => 'Kategori tidak ditemukan.',

            'title.required' => 'Judul prestasi wajib diisi.',

            'recipient.required' => 'Penerima prestasi wajib diisi.',

            'organizer.required' => 'Penyelenggara wajib diisi.',

            'level.required' => 'Level prestasi wajib dipilih.',

            'achievement_date.required' => 'Tanggal prestasi wajib diisi.',

            'description.required' => 'Deskripsi wajib diisi.'

        ];
    }
}