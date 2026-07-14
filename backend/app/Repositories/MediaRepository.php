<?php

namespace App\Repositories;

use App\Models\Media;
use App\Repositories\Interfaces\MediaRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

/**
 * -----------------------------------------------------------------------------
 * Media Repository
 * -----------------------------------------------------------------------------
 *
 * Bertanggung jawab terhadap seluruh operasi database
 * yang berkaitan dengan data media.
 */
class MediaRepository implements MediaRepositoryInterface
{
    /**
     * Mengambil daftar media dengan filter dan pagination.
     */
    public function paginate(array $filters = []): LengthAwarePaginator
    {
        $query = Media::query()->with('uploader');

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */
        if (!empty($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('original_name', 'LIKE', "%{$search}%")
                  ->orWhere('extension', 'LIKE', "%{$search}%");
            });
        }

        /*
        |--------------------------------------------------------------------------
        | Sorting
        |--------------------------------------------------------------------------
        */
        $query->orderBy('created_at', 'desc');

        return $query->paginate($filters['per_page'] ?? 24);
    }

    /**
     * Mengambil media berdasarkan ID.
     */
    public function findById(int $id): ?Media
    {
        return Media::with('uploader')->find($id);
    }

    /**
     * Menyimpan metadata media baru.
     */
    public function create(array $data): Media
    {
        return Media::create($data);
    }

    /**
     * Menghapus record media dari database.
     */
    public function delete(Media $media): bool
    {
        return $media->delete();
    }
}
