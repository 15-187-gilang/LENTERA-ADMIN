<?php

namespace App\Services;

use App\Models\Achievement;
use App\Repositories\Interfaces\AchievementRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

/**
 * -----------------------------------------------------------------------------
 * Achievement Service
 * -----------------------------------------------------------------------------
 *
 * Bertanggung jawab terhadap seluruh business logic
 * yang berkaitan dengan data prestasi.
 */
class AchievementService
{
    /**
     * Repository yang digunakan.
     */
    protected AchievementRepositoryInterface $achievementRepository;

    /**
     * Constructor Dependency Injection.
     */
    public function __construct(
        AchievementRepositoryInterface $achievementRepository
    ) {
        $this->achievementRepository = $achievementRepository;
    }

    /**
     * Mengambil seluruh data prestasi.
     */
    public function paginate(int $perPage = 10): LengthAwarePaginator
    {
        return $this->achievementRepository->paginate($perPage);
    }

    /**
     * Mengambil detail prestasi berdasarkan ID.
     */
    public function findById(int $id): ?Achievement
    {
        return $this->achievementRepository->findById($id);
    }

    /**
     * Menyimpan data prestasi baru.
     */
    public function create(array $data): Achievement
    {
        /*
        |--------------------------------------------------------------------------
        | Business Logic
        |--------------------------------------------------------------------------
        */
        
        // Generate slug otomatis
        $data['slug'] = Str::slug($data['title']);

        if (
            isset($data['thumbnail_source']) && 
            $data['thumbnail_source'] === 'library' && 
            !empty($data['thumbnail_media_url'])
        ) {
            $parsedUrl = parse_url($data['thumbnail_media_url'], PHP_URL_PATH);
            $data['thumbnail'] = preg_replace('/^\/?storage\//', '', $parsedUrl);
        } elseif (
            isset($data['thumbnail']) &&
            $data['thumbnail'] !== null
        ) {
            if (is_string($data['thumbnail']) && preg_match('/^data:image\/(\w+);base64,/', $data['thumbnail'])) {
                $image_parts = explode(";base64,", $data['thumbnail']);
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1];
                $image_base64 = base64_decode($image_parts[1]);
                $fileName = 'achievements/' . uniqid() . '.' . $image_type;
                Storage::disk('public')->put($fileName, $image_base64);
                $data['thumbnail'] = $fileName;
            } else {
                $data['thumbnail'] = $data['thumbnail']->store(
                    'achievements',
                    'public'
                );
            }
        }

        if (isset($data['attachment']) && $data['attachment'] !== null) {
            $data['attachment'] = $data['attachment']->store(
                'attachments',
                'public'
            );
        }

        // Jika langsung dipublish
        if (!empty($data['is_published'])) {
            $data['published_at'] = now();
        }

        $achievement = $this->achievementRepository->create($data);



        return $achievement;
    }

    /**
     * Memperbarui data prestasi.
     */
    public function update(
        Achievement $achievement,
        array $data
    ): bool {

        // Update slug jika judul berubah
        if (isset($data['title'])) {
            $data['slug'] = Str::slug($data['title']);
        }

        // Atur tanggal publish
        if (!empty($data['is_published']) && empty($achievement->published_at)) {
            $data['published_at'] = now();
        }

        if (
            isset($data['thumbnail_source']) && 
            $data['thumbnail_source'] === 'library' && 
            !empty($data['thumbnail_media_url'])
        ) {
            // Hapus thumbnail lama jika ada
            if (
                $achievement->thumbnail &&
                Storage::disk('public')->exists($achievement->thumbnail)
            ) {
                // Cek apakah thumbnail lama bukan dari library (yakni di folder achievements)
                if (str_starts_with($achievement->thumbnail, 'achievements/')) {
                    Storage::disk('public')->delete($achievement->thumbnail);
                }
            }

            $parsedUrl = parse_url($data['thumbnail_media_url'], PHP_URL_PATH);
            $data['thumbnail'] = preg_replace('/^\/?storage\//', '', $parsedUrl);
        } elseif (
            isset($data['thumbnail']) &&
            $data['thumbnail'] !== null
        ) {
            if (
                $achievement->thumbnail &&
                Storage::disk('public')->exists($achievement->thumbnail)
            ) {
                if (str_starts_with($achievement->thumbnail, 'achievements/')) {
                    Storage::disk('public')->delete($achievement->thumbnail);
                }
            }

            if (is_string($data['thumbnail']) && preg_match('/^data:image\/(\w+);base64,/', $data['thumbnail'])) {
                $image_parts = explode(";base64,", $data['thumbnail']);
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1];
                $image_base64 = base64_decode($image_parts[1]);
                $fileName = 'achievements/' . uniqid() . '.' . $image_type;
                Storage::disk('public')->put($fileName, $image_base64);
                $data['thumbnail'] = $fileName;
            } else {
                $data['thumbnail'] = $data['thumbnail']->store(
                    'achievements',
                    'public'
                );
            }
        }

        if (isset($data['attachment']) && $data['attachment'] !== null) {
            if (
                $achievement->attachment &&
                Storage::disk('public')->exists($achievement->attachment)
            ) {
                Storage::disk('public')->delete($achievement->attachment);
            }
            $data['attachment'] = $data['attachment']->store(
                'attachments',
                'public'
            );
        }

        $result = $this->achievementRepository->update(
            $achievement,
            $data
        );

        $title = $data['title'] ?? $achievement->title;



        return $result;
    }

    /**
     * Menghapus data prestasi.
     */
    public function delete(Achievement $achievement): bool
    {
        if (
            $achievement->thumbnail &&
            str_starts_with($achievement->thumbnail, 'achievements/') &&
            Storage::disk('public')->exists($achievement->thumbnail)
        ) {
            Storage::disk('public')->delete($achievement->thumbnail);
        }
        if (
            $achievement->attachment &&
            Storage::disk('public')->exists($achievement->attachment)
        ) {
            Storage::disk('public')->delete($achievement->attachment);
        }
        $title = $achievement->title;
        $result = $this->achievementRepository->delete($achievement);



        return $result; 
    }

    /**
     * Mengambil prestasi unggulan.
     */
    public function getFeatured(int $limit = 5): Collection
    {
        return $this->achievementRepository->getFeatured($limit);
    }

    /**
     * Mengambil prestasi yang telah dipublikasikan.
     */
    public function getPublished(int $perPage = 10): LengthAwarePaginator
    {
        return $this->achievementRepository->getPublished($perPage);
    }

    /**
     * Mencari data prestasi.
     */
    public function search(string $keyword): LengthAwarePaginator
    {
        return $this->achievementRepository->search($keyword);
    }

    /**
     * Filter berdasarkan kategori.
     */
    public function filterByCategory(int $categoryId): LengthAwarePaginator
    {
        return $this->achievementRepository->filterByCategory($categoryId);
    }

    /**
     * Filter berdasarkan level.
     */
    public function filterByLevel(string $level): LengthAwarePaginator
    {
        return $this->achievementRepository->filterByLevel($level);
    }

   /**
     * Mengurutkan data.
     */
    public function sort(string $sort): LengthAwarePaginator
    {
        return $this->achievementRepository->sort($sort);
    }

    /**
     * Mengambil statistik prestasi.
     */
    public function statistics(): array
    {
        return $this->achievementRepository->statistics();
    }

    public function filter(array $filters)
    {
        return $this->achievementRepository
            ->filter($filters);
    }
}