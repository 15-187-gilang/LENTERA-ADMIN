<?php

namespace App\Services;

use App\Models\Category;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Support\Str;

/**
 * -----------------------------------------------------------------------------
 * Category Service
 * -----------------------------------------------------------------------------
 *
 * Bertanggung jawab terhadap seluruh business logic kategori.
 *
 * Controller tidak diperbolehkan mengakses Repository secara langsung.
 */
class CategoryService
{
    /**
     * Repository kategori.
     */
    protected CategoryRepositoryInterface $categoryRepository;

    /**
     * Constructor Dependency Injection.
     */
     public function __construct(
        CategoryRepositoryInterface $categoryRepository
    ) {
        $this->categoryRepository = $categoryRepository;
    }

    /**
     * Mengambil seluruh kategori.
     */
    public function getAll(): Collection
    {
        return $this->categoryRepository->getAll();
    }

    /**
     * Mengambil kategori berdasarkan ID.
     */
    public function findById(int $id): ?Category
    {
        return $this->categoryRepository->findById($id);
    }

    /**
     * Membuat kategori baru.
     */
    public function create(array $data): Category
    {
        /*
        |--------------------------------------------------------------------------
        | Business Logic
        |--------------------------------------------------------------------------
        */

        // Generate slug otomatis
        $data['slug'] = Str::slug($data['name']);
        

        $category = $this->categoryRepository->create($data);



        return $category;
    }

    /**
     * Memperbarui kategori.
     */
    public function update(Category $category, array $data): bool
    {
        // Generate ulang slug apabila nama berubah
        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

       $result = $this->categoryRepository->update($category, $data);

        if ($result) {

            $category->refresh();


        }

        return $result;
    }

    /**
     * Menghapus kategori.
     */
    public function delete(Category $category): bool
    {
        $result = $this->categoryRepository->delete($category);

        if ($result) {

        }

        return $result;
    }
}