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
            $data['thumbnail'] = $data['thumbnail']->store(
                'achievements',
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

            $data['thumbnail'] = $data['thumbnail']->store(
                'achievements',
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