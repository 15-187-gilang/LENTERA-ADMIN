<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LoginResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [

            'admin' => [
                'id' => $this['admin']->id,
                'name' => $this['admin']->name,
                'email' => $this['admin']->email,
            ],

            'token' => $this['token'],

            'token_type' => 'Bearer',

        ];
    }
}