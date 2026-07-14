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
    public function upload(UploadedFile $file, int $adminId): Media
    {
        // Generate nama file unik dengan UUID
        $extension = strtolower($file->getClientOriginalExtension());
        $filename  = Str::uuid() . '.' . $extension;
        $directory = 'media';

        // Simpan file ke storage
        $path = $file->storeAs($directory, $filename, 'public');

        // Buat URL publik
        $url = Storage::disk('public')->url($path);

        // Simpan metadata ke database
        $media = $this->mediaRepository->create([
            'original_name' => $file->getClientOriginalName(),
            'filename'      => $filename,
            'mime_type'     => $file->getMimeType(),
            'extension'     => $extension,
            'size'          => $file->getSize(),
            'disk'          => 'public',
            'directory'     => $directory,
            'path'          => $path,
            'url'           => $url,
            'uploaded_by'   => $adminId,
        ]);



        return $media;
    }

    /**
     * Menghapus media beserta file-nya dari storage.
     */
    public function delete(Media $media): bool
    {
        // Hapus file dari storage
        if (Storage::disk($media->disk)->exists($media->path)) {
            Storage::disk($media->disk)->delete($media->path);
        }

        $originalName = $media->original_name;
        $mediaId      = $media->id;

        $result = $this->mediaRepository->delete($media);



        return $result;
    }
}
