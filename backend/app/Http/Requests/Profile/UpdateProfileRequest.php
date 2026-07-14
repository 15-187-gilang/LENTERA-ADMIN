<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * -----------------------------------------------------------------------------
 * Update Profile Request
 * -----------------------------------------------------------------------------
 *
 * Validasi ketika admin memperbarui nama dan email profil.
 */
class UpdateProfileRequest extends FormRequest
{
    /**
     * Admin yang telah login diperbolehkan.
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
                'max:255',
            ],

            'email' => [
                'required',
                'email',
                'max:255',
                // Email unik kecuali milik admin sendiri
                Rule::unique('admins', 'email')->ignore($this->user()->id),
            ],

        ];
    }

    /**
     * Pesan validasi kustom.
     */
    public function messages(): array
    {
        return [

            'name.required'  => 'Nama wajib diisi.',

            'name.max'       => 'Nama maksimal 255 karakter.',

            'email.required' => 'Email wajib diisi.',

            'email.email'    => 'Format email tidak valid.',

            'email.unique'   => 'Email sudah digunakan oleh akun lain.',

        ];
    }
}
