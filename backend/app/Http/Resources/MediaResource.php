<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * -----------------------------------------------------------------------------
 * Media Resource
 * -----------------------------------------------------------------------------
 *
 * Bertugas mengubah data Media menjadi format JSON
 * yang akan dikirimkan kepada Frontend.
 */
class MediaResource extends JsonResource
{
    /**
     * Transform resource menjadi array.
     */
    public function toArray(Request $request): array
    {
        return [
            'id'             => $this->id,
            'original_name'  => $this->original_name,
            'filename'       => $this->filename,
            'mime_type'      => $this->mime_type,
            'extension'      => strtoupper($this->extension),
            'size'           => $this->size,
            'size_formatted' => $this->size_formatted,
            'path'           => $this->path,
            'url'            => $this->url,

            'uploaded_by' => [
                'id'    => $this->uploader?->id,
                'name'  => $this->uploader?->name,
                'email' => $this->uploader?->email,
            ],

            'created_at' => optional($this->created_at)->format('Y-m-d H:i'),
            'updated_at' => optional($this->updated_at)->format('Y-m-d H:i'),
        ];
    }
}
