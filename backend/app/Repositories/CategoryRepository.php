<?php

namespace App\Repositories;

use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;

/**
 * --------------------------------------------------------------------------
 * Category Repository
 * --------------------------------------------------------------------------
 *
 * Bertanggung jawab terhadap seluruh operasi database
 * yang berkaitan dengan kategori.
 */
class CategoryRepository implements CategoryRepositoryInterface
{
    /**
     * Mengambil seluruh kategori.
     */
    public function getAll(): Collection
    {
        return Category::withCount('achievements')->orderBy('name')->get();
    }

    /**
     * Mengambil kategori berdasarkan ID.
     */
    public function findById(int $id): ?Category
    {
        return Category::find($id);
    }

    /**
     * Menyimpan kategori baru.
     */
    public function create(array $data): Category
    {
        return Category::create($data);
    }

    /**
     * Memperbarui kategori.
     */
    public function update(Category $category, array $data): bool
    {
        return $category->update($data);
    }

    /**
     * Menghapus kategori.
     */
    public function delete(Category $category): bool
    {
        return $category->delete();
    }
}