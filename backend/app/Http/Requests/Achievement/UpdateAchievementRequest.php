<?php

namespace App\Http\Requests\Achievement;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
/**
 * -----------------------------------------------------------------------------
 * Update Achievement Request
 * -----------------------------------------------------------------------------
 *
 * Validasi ketika admin memperbarui data prestasi.
 *
 * Validasi bersifat kondisional:
 * - Draft (is_published = false) : hanya title yang wajib
 * - Publish (is_published = true): semua field wajib diisi
 */
class UpdateAchievementRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $publishing = $this->input('is_published') == '1' || $this->input('is_published') === true;

        return [

            'category_id' => [
                $publishing ? 'required' : 'nullable',
                'exists:categories,id'
            ],

            'title' => [
                'required',
                'string',
                'max:255'
            ],

            'recipient' => [
                $publishing ? 'required' : 'nullable',
                'string',
                'max:255'
            ],

            'organizer' => [
                $publishing ? 'required' : 'nullable',
                'string',
                'max:255'
            ],

            'level' => [
                $publishing ? 'required' : 'nullable',
                Rule::in([
                    'Kabupaten',
                    'Provinsi',
                    'Nasional',
                    'Internasional'
                ])
            ],

            'achievement_date' => [
                $publishing ? 'required' : 'nullable',
                'date'
            ],

            'description' => [
                $publishing ? 'required' : 'nullable',
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
                        $ext = strtolower($value->getClientOriginalExtension());
                        if (!in_array($ext, ['jpg', 'jpeg', 'png', 'webp'])) {
                            $fail('Thumbnail harus berupa file gambar (jpg, jpeg, png, webp).');
                        }
                    } else {
                        $fail('Format thumbnail tidak valid.');
                    }
                }
            ],

            'attachment' => [
                'nullable',
                function ($attribute, $value, $fail) {
                    if (is_string($value)) {
                        return;
                    } elseif ($value instanceof \Illuminate\Http\UploadedFile) {
                        if ($value->getSize() > 5242880) { // 5MB
                            $fail('Ukuran lampiran maksimal 5MB.');
                        }
                        $ext = strtolower($value->getClientOriginalExtension());
                        if ($ext !== 'pdf') {
                            $fail('Lampiran harus berupa file PDF.');
                        }
                    } else {
                        $fail('Format lampiran tidak valid.');
                    }
                }
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