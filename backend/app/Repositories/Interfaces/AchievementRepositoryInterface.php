<?php

namespace App\Repositories\Interfaces;

use App\Models\Achievement;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface AchievementRepositoryInterface
{
    public function paginate(int $perPage = 10): LengthAwarePaginator;

    public function findById(int $id): ?Achievement;

    public function create(array $data): Achievement;

    public function update(Achievement $achievement, array $data): bool;

    public function delete(Achievement $achievement): bool;

    public function getFeatured(int $limit = 5);

    public function getPublished(int $perPage = 10): LengthAwarePaginator;

    public function search(string $keyword);

    public function filterByCategory(int $categoryId);

    public function filterByLevel(string $level);
    /**
     * Mengurutkan data prestasi.
     */
    public function sort(string $sort): LengthAwarePaginator;

    public function statistics(): array;
    
    public function filter(array $filters);
    
}