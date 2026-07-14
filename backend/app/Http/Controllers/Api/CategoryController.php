<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\StoreCategoryRequest;
use App\Http\Requests\Category\UpdateCategoryRequest;
use App\Http\Resources\CategoryResource;
use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Http\JsonResponse;

/**
 * -----------------------------------------------------------------------------
 * Category Controller
 * -----------------------------------------------------------------------------
 *
 * Mengelola endpoint kategori prestasi.
 *
 * Controller hanya bertugas:
 * - menerima request
 * - memanggil Service
 * - mengembalikan response
 */
class CategoryController extends Controller
{
    /**
     * Dependency Injection CategoryService.
     */
    public function __construct(
        private readonly CategoryService $categoryService
    ) {
    }

    /**
     * Menampilkan seluruh kategori.
     */
    public function index(): JsonResponse
    {
        $categories = CategoryResource::collection(
            $this->categoryService->getAll()
        );

        return $this->success(
            $categories,
            'Data kategori berhasil diambil.'
        );
    }

    /**
     * Menyimpan kategori baru.
     */
    public function store(StoreCategoryRequest $request): JsonResponse
    {
        $category = $this->categoryService->create(
            $request->validated()
        );

        return $this->success(
            new CategoryResource($category),
            'Kategori berhasil dibuat.',
            201
        );
    }

    /**
     * Menampilkan detail kategori.
     */
    public function show(Category $category): JsonResponse
    {
        return $this->success(
            new CategoryResource($category),
            'Detail kategori berhasil diambil.'
        );
    }

    /**
     * Memperbarui kategori.
     */
    public function update(
        UpdateCategoryRequest $request,
        Category $category
    ): JsonResponse {

        $this->categoryService->update(
            $category,
            $request->validated()
        );

        return $this->success(
            new CategoryResource($category->fresh()),
            'Kategori berhasil diperbarui.'
        );
    }

    /**
     * Menghapus kategori.
     */
    public function destroy(Category $category): JsonResponse
    {
        $this->categoryService->delete($category);

        return $this->success(
            null,
            'Kategori berhasil dihapus.'
        );
    }
}