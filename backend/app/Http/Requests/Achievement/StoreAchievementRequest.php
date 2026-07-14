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
                'image',
                'mimes:jpg,jpeg,png,webp',
                'max:2048',
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