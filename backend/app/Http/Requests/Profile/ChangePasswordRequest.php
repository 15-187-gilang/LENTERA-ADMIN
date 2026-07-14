<?php

namespace App\Http\Requests\Profile;

use Illuminate\Foundation\Http\FormRequest;

/**
 * -----------------------------------------------------------------------------
 * Change Password Request
 * -----------------------------------------------------------------------------
 *
 * Validasi ketika admin mengganti password.
 */
class ChangePasswordRequest extends FormRequest
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

            'current_password' => [
                'required',
                'string',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],

            'password_confirmation' => [
                'required',
                'string',
            ],

        ];
    }

    /**
     * Pesan validasi kustom.
     */
    public function messages(): array
    {
        return [

            'current_password.required' => 'Password lama wajib diisi.',

            'password.required'         => 'Password baru wajib diisi.',

            'password.min'              => 'Password baru minimal 8 karakter.',

            'password.confirmed'        => 'Konfirmasi password tidak cocok.',

            'password_confirmation.required' => 'Konfirmasi password wajib diisi.',

        ];
    }
}
