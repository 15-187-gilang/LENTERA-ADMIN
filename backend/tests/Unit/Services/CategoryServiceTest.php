<?php

namespace Tests\Unit\Services;

use App\Models\Category;
use App\Services\CategoryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CategoryServiceTest extends TestCase
{
    use RefreshDatabase;

    private CategoryService $service;

    protected function setUp(): void
    {
        parent::setUp();

        $this->service = app(CategoryService::class);

        $this->authenticateAdmin();
    }

    /**
     * Service dapat membuat kategori.
     */
    public function test_service_can_create_category(): void
    {
        $category = $this->service->create([
            'name' => 'Prestasi Nasional',
            'description' => 'Kategori Nasional',
        ]);

        $this->assertInstanceOf(Category::class, $category);

        $this->assertDatabaseHas('categories', [
            'name' => 'Prestasi Nasional',
            'description' => 'Kategori Nasional',
        ]);
    }

    /**
     * Service membuat slug otomatis.
     */
    public function test_service_generates_slug(): void
    {
        $category = $this->service->create([
            'name' => 'Prestasi Tingkat Nasional',
            'description' => 'Kategori',
        ]);

        $this->assertEquals(
            'prestasi-tingkat-nasional',
            $category->slug
        );
    }

    /**
     * Service dapat memperbarui kategori.
     */
    public function test_service_can_update_category(): void
    {
        $category = Category::factory()->create();

        $result = $this->service->update(
            $category,
            [
                'name' => 'Kategori Baru',
                'description' => 'Deskripsi Baru',
            ]
        );

        $this->assertTrue($result);

        $this->assertDatabaseHas('categories', [
            'id' => $category->id,
            'name' => 'Kategori Baru',
            'slug' => 'kategori-baru',
            'description' => 'Deskripsi Baru',
        ]);
    }

    /**
     * Slug ikut berubah ketika nama diubah.
     */
    public function test_service_updates_slug_when_name_changes(): void
    {
        $category = Category::factory()->create([
            'name' => 'Kategori Lama',
            'slug' => 'kategori-lama',
        ]);

        $this->service->update($category, [
            'name' => 'Kategori Baru',
        ]);

        $category->refresh();

        $this->assertEquals(
            'kategori-baru',
            $category->slug
        );
    }

    /**
     * Service dapat menghapus kategori.
     */
    public function test_service_can_delete_category(): void
    {
        $category = Category::factory()->create();

        $result = $this->service->delete($category);

        $this->assertTrue($result);

        $this->assertDatabaseMissing('categories', [
            'id' => $category->id,
        ]);
    }

    /**
     * Service dapat mengambil seluruh kategori.
     */
    public function test_service_can_get_all_categories(): void
    {
        Category::factory()
            ->count(5)
            ->create();

        $categories = $this->service->getAll();

        $this->assertCount(5, $categories);
    }

    /**
     * Service dapat mengambil kategori berdasarkan ID.
     */
    public function test_service_can_find_category_by_id(): void
    {
        $category = Category::factory()->create();

        $result = $this->service->findById($category->id);

        $this->assertInstanceOf(
            Category::class,
            $result
        );

        $this->assertEquals(
            $category->id,
            $result->id
        );
    }


}