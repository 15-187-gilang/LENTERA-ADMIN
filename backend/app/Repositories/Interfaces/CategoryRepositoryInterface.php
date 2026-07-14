<?php

namespace App\Repositories\Interfaces;

use App\Models\Category;
use Illuminate\Database\Eloquent\Collection;

/**
 * --------------------------------------------------------------------------
 * Category Repository Interface
 * --------------------------------------------------------------------------
 *
 * Kontrak (contract) yang harus dipenuhi oleh CategoryRepository.
 */
interface CategoryRepositoryInterface
{
    /**
     * Mengambil seluruh kategori.
     */
    public function getAll(): Collection;

    /**
     * Mengambil kategori berdasarkan ID.
     */
    public function findById(int $id): ?Category;

    /**
     * Membuat kategori baru.
     */
    public function create(array $data): Category;

    /**
     * Memperbarui kategori.
     */
    public function update(Category $category, array $data): bool;

    /**
     * Menghapus kategori.
     */
    public function delete(Category $category): bool;
}