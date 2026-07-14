<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

/**
 * --------------------------------------------------------------------------
 * Dashboard Request
 * --------------------------------------------------------------------------
 *
 * Validasi request Dashboard.
 *
 * Digunakan untuk memvalidasi filter Dashboard
 * sebelum diteruskan ke Service.
 */
class DashboardRequest extends FormRequest
{
    /**
     * Menentukan apakah request diizinkan.
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

            /*
            |--------------------------------------------------------------------------
            | Jenis Grafik
            |--------------------------------------------------------------------------
            */

            'period' => [

                'nullable',

                'string',

                'in:year,month',

            ],

            /*
            |--------------------------------------------------------------------------
            | Tahun
            |--------------------------------------------------------------------------
            */

            'year' => [

                'nullable',

                'integer',

                'digits:4',

                'min:2000',

                'max:' . now()->year,

            ],

        ];
    }

    /**
     * Pesan validasi.
     */
    public function messages(): array
    {
        return [

            'period.in' => 'Period harus berupa year atau month.',

            'year.integer' => 'Tahun harus berupa angka.',

            'year.digits' => 'Format tahun tidak valid.',

            'year.max' => 'Tahun tidak boleh melebihi tahun saat ini.',

            'year.min' => 'Tahun tidak valid.',

        ];
    }
}