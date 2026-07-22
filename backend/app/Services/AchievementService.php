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
     *
     * @var AchievementRepositoryInterface
     */
    protected $achievementRepository;

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

        // Default values for drafts to prevent database constraint errors
        if (empty($data['is_published'])) {
            if (empty($data['description'])) $data['description'] = '-';
            if (empty($data['recipient'])) $data['recipient'] = '-';
            if (empty($data['organizer'])) $data['organizer'] = '-';
            if (empty($data['level'])) $data['level'] = 'Kabupaten';
            if (empty($data['achievement_date'])) $data['achievement_date'] = now()->toDateString();
            if (empty($data['category_id'])) {
                $category = \App\Models\Category::first();
                $data['category_id'] = $category ? $category->id : 1;
            }
        }

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
                // Handle base64 thumbnail
                $image_parts = explode(";base64,", $data['thumbnail']);
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1];
                $image_base64 = base64_decode($image_parts[1]);
                $fileName = 'achievements/' . uniqid() . '.' . $image_type;
                $fullPath = storage_path('app/public/' . $fileName);
                if (!is_dir(dirname($fullPath))) { mkdir(dirname($fullPath), 0775, true); }
                file_put_contents($fullPath, $image_base64);
                $data['thumbnail'] = $fileName;
            } else {
                // Handle uploaded file - simpan langsung tanpa finfo/Storage
                $ext = strtolower($data['thumbnail']->getClientOriginalExtension());
                $uniqueName = uniqid() . '.' . $ext;
                $filePath = 'achievements/' . $uniqueName;
                $fullPath = storage_path('app/public/' . $filePath);
                if (!is_dir(dirname($fullPath))) { mkdir(dirname($fullPath), 0775, true); }
                file_put_contents($fullPath, file_get_contents($data['thumbnail']->getPathname()));
                $data['thumbnail'] = $filePath;
            }
        }

        if (isset($data['attachment']) && $data['attachment'] !== null) {
            $ext = strtolower($data['attachment']->getClientOriginalExtension());
            $uniqueName = uniqid() . '.' . $ext;
            $filePath = 'attachments/' . $uniqueName;
            $fullPath = storage_path('app/public/' . $filePath);
            if (!is_dir(dirname($fullPath))) { mkdir(dirname($fullPath), 0775, true); }
            file_put_contents($fullPath, file_get_contents($data['attachment']->getPathname()));
            $data['attachment'] = $filePath;
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
            // Hapus thumbnail lama jika ada dan bukan dari library
            if (
                $achievement->thumbnail &&
                str_starts_with($achievement->thumbnail, 'achievements/') &&
                file_exists(storage_path('app/public/' . $achievement->thumbnail))
            ) {
                unlink(storage_path('app/public/' . $achievement->thumbnail));
            }

            $parsedUrl = parse_url($data['thumbnail_media_url'], PHP_URL_PATH);
            $data['thumbnail'] = preg_replace('/^\/?storage\//', '', $parsedUrl);
        } elseif (
            isset($data['thumbnail']) &&
            $data['thumbnail'] !== null
        ) {
            // Hapus thumbnail lama jika ada
            if (
                $achievement->thumbnail &&
                str_starts_with($achievement->thumbnail, 'achievements/') &&
                file_exists(storage_path('app/public/' . $achievement->thumbnail))
            ) {
                unlink(storage_path('app/public/' . $achievement->thumbnail));
            }

            if (is_string($data['thumbnail']) && preg_match('/^data:image\/(\w+);base64,/', $data['thumbnail'])) {
                $image_parts = explode(";base64,", $data['thumbnail']);
                $image_type_aux = explode("image/", $image_parts[0]);
                $image_type = $image_type_aux[1];
                $image_base64 = base64_decode($image_parts[1]);
                $fileName = 'achievements/' . uniqid() . '.' . $image_type;
                $fullPath = storage_path('app/public/' . $fileName);
                if (!is_dir(dirname($fullPath))) { mkdir(dirname($fullPath), 0775, true); }
                file_put_contents($fullPath, $image_base64);
                $data['thumbnail'] = $fileName;
            } else if (!is_string($data['thumbnail'])) {
                $ext = strtolower($data['thumbnail']->getClientOriginalExtension());
                $uniqueName = uniqid() . '.' . $ext;
                $filePath = 'achievements/' . $uniqueName;
                $fullPath = storage_path('app/public/' . $filePath);
                if (!is_dir(dirname($fullPath))) { mkdir(dirname($fullPath), 0775, true); }
                file_put_contents($fullPath, file_get_contents($data['thumbnail']->getPathname()));
                $data['thumbnail'] = $filePath;
            }
        }

        if (isset($data['attachment']) && $data['attachment'] !== null && !is_string($data['attachment'])) {
            if (
                $achievement->attachment &&
                file_exists(storage_path('app/public/' . $achievement->attachment))
            ) {
                unlink(storage_path('app/public/' . $achievement->attachment));
            }
            $ext = strtolower($data['attachment']->getClientOriginalExtension());
            $uniqueName = uniqid() . '.' . $ext;
            $filePath = 'attachments/' . $uniqueName;
            $fullPath = storage_path('app/public/' . $filePath);
            if (!is_dir(dirname($fullPath))) { mkdir(dirname($fullPath), 0775, true); }
            file_put_contents($fullPath, file_get_contents($data['attachment']->getPathname()));
            $data['attachment'] = $filePath;
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
            file_exists(storage_path('app/public/' . $achievement->thumbnail))
        ) {
            unlink(storage_path('app/public/' . $achievement->thumbnail));
        }
        if (
            $achievement->attachment &&
            file_exists(storage_path('app/public/' . $achievement->attachment))
        ) {
            unlink(storage_path('app/public/' . $achievement->attachment));
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