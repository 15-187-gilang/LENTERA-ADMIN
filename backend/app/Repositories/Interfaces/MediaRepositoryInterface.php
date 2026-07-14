<?php

namespace App\Repositories\Interfaces;

use App\Models\Media;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;

interface MediaRepositoryInterface
{
    public function paginate(array $filters = []): LengthAwarePaginator;

    public function findById(int $id): ?Media;

    public function create(array $data): Media;

    public function delete(Media $media): bool;
}
