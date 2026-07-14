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
                'boolean'
            ],

            'is_published' => [
                'boolean'
            ]

        ];
    }
}