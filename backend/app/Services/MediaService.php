<?php

namespace App\Services;

use App\Models\Media;
use App\Repositories\Interfaces\MediaRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

/**
 * -----------------------------------------------------------------------------
 * Media Service
 * -----------------------------------------------------------------------------
 *
 * Bertanggung jawab terhadap seluruh business logic
 * yang berkaitan dengan manajemen media/file.
 */
class MediaService
{
    public function __construct(
        private readonly MediaRepositoryInterface $mediaRepository
    ) {}

    /**
     * Mengambil daftar media dengan filter.
     */
    public function filter(array $filters): LengthAwarePaginator
    {
        return $this->mediaRepository->paginate($filters);
    }

    /**
     * Mengambil detail media berdasarkan ID.
     */
    public function findById(int $id): ?Media
    {
        return $this->mediaRepository->findById($id);
    }

    /**
     * Mengupload file baru dan menyimpan metadata-nya.
     */
    public function upload(UploadedFile $file, int $adminId, ?UploadedFile $thumbnail = null): Media
    {
        // Generate nama file unik dengan UUID
        $originalName = $file->getClientOriginalName();
        $size = $file->getSize();
        $extension = strtolower($file->getClientOriginalExtension());
        $filename  = Str::uuid() . '.' . $extension;
        $directory = 'media';

        // Simpan file via native PHP menggunakan file_get_contents (tanpa Storage/finfo)
        $path = $directory . '/' . $filename;
        $fullPath = storage_path('app/public/' . $path);
        if (!is_dir(dirname($fullPath))) { mkdir(dirname($fullPath), 0775, true); }
        file_put_contents($fullPath, file_get_contents($file->getPathname()));

        // Buat URL publik
        $url = asset('storage/' . $path);

        $thumbnailPath = null;
        $thumbnailUrl = null;

        if ($thumbnail) {
            $thumbExtension = strtolower($thumbnail->getClientOriginalExtension());
            $thumbFilename  = 'thumb_' . Str::uuid() . '.' . $thumbExtension;
            $thumbnailPath  = $directory . '/thumbnails/' . $thumbFilename;
            $thumbFullPath = storage_path('app/public/' . $thumbnailPath);
            if (!is_dir(dirname($thumbFullPath))) { mkdir(dirname($thumbFullPath), 0775, true); }
            file_put_contents($thumbFullPath, file_get_contents($thumbnail->getPathname()));
            $thumbnailUrl   = asset('storage/' . $thumbnailPath);
        }

        // Tentukan mime type manual (karena finfo dimatikan)
        $mimes = [
            'jpg' => 'image/jpeg',
            'jpeg' => 'image/jpeg',
            'png' => 'image/png',
            'webp' => 'image/webp',
            'gif' => 'image/gif',
            'pdf' => 'application/pdf',
        ];
        $mimeType = $mimes[$extension] ?? 'application/octet-stream';

        // Simpan metadata ke database
        $media = $this->mediaRepository->create([
            'original_name'  => $originalName,
            'filename'       => $filename,
            'mime_type'      => $mimeType,
            'extension'      => $extension,
            'size'           => $size,
            'disk'           => 'public',
            'directory'      => $directory,
            'path'           => $path,
            'url'            => $url,
            'thumbnail_path' => $thumbnailPath,
            'thumbnail_url'  => $thumbnailUrl,
            'uploaded_by'    => $adminId,
        ]);



        return $media;
    }

    /**
     * Menghapus media beserta file-nya dari storage.
     */
    public function delete(Media $media): bool
    {
        // Hapus file dari storage via native PHP (tanpa Storage/finfo)
        if (file_exists(storage_path('app/public/' . $media->path))) {
            unlink(storage_path('app/public/' . $media->path));
        }

        if ($media->thumbnail_path && file_exists(storage_path('app/public/' . $media->thumbnail_path))) {
            unlink(storage_path('app/public/' . $media->thumbnail_path));
        }

        $originalName = $media->original_name;
        $mediaId      = $media->id;

        $result = $this->mediaRepository->delete($media);



        return $result;
    }
}
