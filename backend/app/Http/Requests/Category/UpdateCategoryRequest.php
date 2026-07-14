<?php

namespace App\Http\Requests\Category;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

/**
 * --------------------------------------------------------------------------
 * Update Category Request
 * --------------------------------------------------------------------------
 *
 * Validasi ketika memperbarui kategori.
 */
class UpdateCategoryRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $category = $this->route('category');

        return [

            'name' => [

                'required',

                'string',

                'max:100',

                Rule::unique('categories')
                    ->ignore($this->route('category'))

            ],

            'description' => [
                'nullable',
                'string'
            ]

        ];
    }
}