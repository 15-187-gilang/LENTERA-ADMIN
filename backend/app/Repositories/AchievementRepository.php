<?php

namespace App\Repositories;

use App\Models\Achievement;
use App\Repositories\Interfaces\AchievementRepositoryInterface;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Collection;

/**
 * -----------------------------------------------------------------------------
 * Achievement Repository
 * -----------------------------------------------------------------------------
 *
 * Bertanggung jawab terhadap seluruh operasi database
 * yang berkaitan dengan data prestasi.
 *
 * Repository hanya berisi query database.
 * Tidak diperbolehkan menyimpan business logic di sini.
 */
class AchievementRepository implements AchievementRepositoryInterface
{
    /**
     * Mengambil seluruh data prestasi dengan pagination.
     */
    public function paginate(int $perPage = 10): LengthAwarePaginator
    {
        return Achievement::with(['category', 'creator'])
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Mengambil prestasi berdasarkan ID.
     */
    public function findById(int $id): ?Achievement
    {
        return Achievement::with([
            'category',
            'creator',
            'images'
        ])->find($id);
    }

    /**
     * Menyimpan data prestasi baru.
     */
    public function create(array $data): Achievement
    {
        return Achievement::create($data);
    }

    /**
     * Memperbarui data prestasi.
     */
    public function update(Achievement $achievement, array $data): bool
    {
        return $achievement->update($data);
    }

    /**
     * Menghapus data prestasi.
     */
    public function delete(Achievement $achievement): bool
    {
        return $achievement->delete();
    }

    /**
     * Mengambil prestasi unggulan.
     */
    public function getFeatured(int $limit = 5): Collection
    {
        return Achievement::with(['category', 'creator'])
            ->where('featured', true)
            ->where('is_published', true)
            ->latest()
            ->take($limit)
            ->get();
    }

    /**
     * Mengambil seluruh prestasi yang telah dipublikasikan.
     */
    public function getPublished(
        int $perPage = 10
    ): LengthAwarePaginator {

        return Achievement::with([
                'category',
                'creator'
            ])
            ->where('is_published', true)
            ->latest()
            ->paginate($perPage);

    }

    /**
     * Melakukan pencarian prestasi berdasarkan judul atau penerima.
     */
    public function search(string $keyword): LengthAwarePaginator
    {
        return Achievement::with(['category', 'creator'])
            ->where(function ($query) use ($keyword) {

                $query->where('title', 'ILIKE', "%{$keyword}%")
                    ->orWhere('recipient', 'ILIKE', "%{$keyword}%")
                    ->orWhere('organizer', 'ILIKE', "%{$keyword}%");

            })
            ->latest()
            ->paginate(10);
    }

    /**
     * Mengambil prestasi berdasarkan kategori.
     */
    public function filterByCategory(int $categoryId): LengthAwarePaginator
    {
        return Achievement::with(['category', 'creator'])
            ->where('category_id', $categoryId)
            ->latest()
            ->paginate(10);
    }

    /**
     * Mengambil prestasi berdasarkan level.
     */
    public function filterByLevel(string $level): LengthAwarePaginator
    {
        return Achievement::with(['category', 'creator'])
            ->where('level', $level)
            ->latest()
            ->paginate(10);
    }

    /**
     * Mengurutkan data prestasi.
     */
    public function sort(string $sort): LengthAwarePaginator
    {
        $query = Achievement::with([
            'category',
            'creator'
        ]);

        if ($sort === 'oldest') {

            return $query
                ->orderBy('achievement_date', 'asc')
                ->paginate(10);

        }

        return $query
            ->orderBy('achievement_date', 'desc')
            ->paginate(10);
    }

    /**
     * Mengambil statistik prestasi.
     */
    public function statistics(): array
    {
        return [

            'total'         => Achievement::count(),

            'published'     => Achievement::where('is_published', true)->count(),

            'draft'         => Achievement::where('is_published', false)->count(),

            'featured'      => Achievement::where('featured', true)->count(),

            'national'      => Achievement::where('is_published', true)
                                ->where('level', 'Nasional')
                                ->count(),

            'international' => Achievement::where('is_published', true)
                                ->where('level', 'Internasional')
                                ->count(),

            'total_achievements' => Achievement::where('is_published', true)->count(),

            'total_categories' => \App\Models\Category::count(),

        ];
    }

    /**
     * Mengambil prestasi berdasarkan filter.
     */
    public function filter(array $filters)
    {
        $query = Achievement::query()
            ->with([
                'category',
                'creator'
            ]);

        /*
        |--------------------------------------------------------------------------
        | Search
        |--------------------------------------------------------------------------
        */

        if (!empty($filters['search'])) {

            $query->where(function ($q) use ($filters) {

                $q->where(
                    'title',
                    'ILIKE',
                    "%{$filters['search']}%"
                )

                ->orWhere(
                    'recipient',
                    'ILIKE',
                    "%{$filters['search']}%"
                )

                ->orWhere(
                    'organizer',
                    'ILIKE',
                    "%{$filters['search']}%"
                );

            });
        }

        /*
        |--------------------------------------------------------------------------
        | Category
        |--------------------------------------------------------------------------
        */

        if (!empty($filters['category_id'])) {

            $query->where(

                'category_id',

                $filters['category_id']

            );

        }
        /*
        |--------------------------------------------------------------------------
        | Level
        |--------------------------------------------------------------------------
        */

        if (!empty($filters['level'])) {

            $query->where(
                'level',
                $filters['level']
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Featured
        |--------------------------------------------------------------------------
        */

        if (isset($filters['featured'])) {

            $query->where(
                'featured',
                filter_var(
                    $filters['featured'],
                    FILTER_VALIDATE_BOOLEAN
                )
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Published
        |--------------------------------------------------------------------------
        */

        if (isset($filters['published'])) {

            $query->where(
                'is_published',
                filter_var(
                    $filters['published'],
                    FILTER_VALIDATE_BOOLEAN
                )
            );
        }

        /*
        |--------------------------------------------------------------------------
        | Sorting
        |--------------------------------------------------------------------------
        */

        switch ($filters['sort'] ?? 'latest') {

            case 'oldest':

                $query->orderBy('achievement_date', 'asc');

                break;

            case 'title':

                $query->orderBy('title');

                break;

            case 'level':

                $query->orderBy('level');

                break;

            default:

                $query->orderBy('achievement_date', 'desc');

        }

        return $query->paginate(

            $filters['per_page'] ?? 10

        );
    }
}