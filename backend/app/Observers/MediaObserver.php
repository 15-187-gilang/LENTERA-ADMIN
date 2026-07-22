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
        // Menggunakan fungsi native PHP untuk menghindari error finfo pada Storage
        $fullPath = storage_path('app/public/' . $media->path);
        if ($media->path && file_exists($fullPath) && !is_dir($fullPath)) {
            unlink($fullPath);
        }

        if ($media->thumbnail_path) {
            $thumbPath = storage_path('app/public/' . $media->thumbnail_path);
            if (file_exists($thumbPath) && !is_dir($thumbPath)) {
                unlink($thumbPath);
            }
        }
    }
}
