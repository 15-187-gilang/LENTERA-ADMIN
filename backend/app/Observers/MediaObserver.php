<?php

namespace App\Observers;

use App\Models\Media;
use Illuminate\Support\Facades\Storage;

class MediaObserver
{
    /**
     * Hapus file fisik dari storage ketika record media dihapus.
     * Ini berfungsi sebagai safety net - MediaService sudah menghapus
     * file sebelum delete, tapi observer ini memastikan tidak ada file orphan.
     */
    public function deleted(Media $media): void
    {
        if (Storage::disk($media->disk)->exists($media->path)) {
            Storage::disk($media->disk)->delete($media->path);
        }
    }
}
