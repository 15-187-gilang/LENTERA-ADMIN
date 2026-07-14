<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;

/**
 * --------------------------------------------------------------------------
 * Store Category Request
 * --------------------------------------------------------------------------
 *
 * Validasi ketika membuat kategori baru.
 */
class StoreCategoryRequest extends FormRequest
{
    /**
     * Semua admin yang telah login boleh mengakses.
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

            'name' => [
                'required',
                'string',
                'max:100',
                'unique:categories,name'
            ],

            'description' => [
                'nullable',
                'string'
            ]

        ];
    }

    /**
     * Pesan error yang lebih mudah dipahami.
     */
    public function messages(): array
    {
        return [

            'name.required' => 'Nama kategori wajib diisi.',

            'name.unique' => 'Kategori sudah tersedia.',

            'name.max' => 'Nama kategori maksimal 100 karakter.'

        ];
    }
}