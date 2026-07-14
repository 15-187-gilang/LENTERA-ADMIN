<?php

namespace Tests\Unit\Services;

use App\Models\Achievement;
use App\Models\Admin;
use App\Models\Category;
use App\Services\DashboardService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class DashboardServiceTest extends TestCase
{
    use RefreshDatabase;

    private DashboardService $service;

    protected function setUp(): void
    {
        parent::setUp();

        $this->authenticateAdmin();

        $this->service = app(DashboardService::class);
    }

    /**
     * Service dapat mengambil ringkasan statistik.
     */
    public function test_service_can_get_statistics(): void
    {
        Category::factory()->count(3)->create();

        Achievement::factory()->count(5)->create([
            'is_published' => true,
        ]);

        Achievement::factory()->count(2)->create([
            'is_published' => false,
        ]);

        Achievement::factory()->count(1)->create([
            'featured' => true,
        ]);

        $statistics = $this->service->getStatistics();

        $this->assertIsArray($statistics);

        $this->assertArrayHasKey('total_achievements', $statistics);
        $this->assertArrayHasKey('total_categories', $statistics);
        $this->assertArrayHasKey('published', $statistics);
        $this->assertArrayHasKey('draft', $statistics);
        $this->assertArrayHasKey('featured', $statistics);
    }

    /**
     * Service dapat mengambil prestasi terbaru.
     */
    public function test_service_can_get_recent_achievements(): void
    {
        Achievement::factory()->count(8)->create();

        $result = $this->service->getRecentAchievements();

        $this->assertCount(5, $result);
    }

    /**
     * Service dapat mengambil statistik kategori.
     */
    public function test_service_can_get_category_statistics(): void
    {
        $category = Category::factory()->create();

        Achievement::factory()->count(3)->create([
            'category_id' => $category->id,
        ]);

        $result = $this->service->getAchievementByCategory();

        $this->assertGreaterThan(0, $result->count());

        $this->assertEquals(
            $category->name,
            $result->first()->name
        );
    }

    /**
     * Service dapat mengambil statistik level.
     */
    public function test_service_can_get_level_statistics(): void
    {
        Achievement::factory()->count(3)->create([
            'level' => 'Nasional',
        ]);

        $result = $this->service->getAchievementByLevel();

        $this->assertGreaterThan(0, $result->count());

        $this->assertEquals(
            'Nasional',
            $result->first()->level
        );
    }





    /**
     * Statistik dashboard memiliki nilai yang benar.
     */
    public function test_dashboard_statistics_values_are_correct(): void
    {
        $categories = Category::factory()
            ->count(2)
            ->create();

        Achievement::factory()->count(4)->create([
            'category_id' => $categories->first()->id,
            'is_published' => true,
            'featured' => false,
        ]);

        Achievement::factory()->count(2)->create([
            'category_id' => $categories->last()->id,
            'is_published' => false,
            'featured' => true,
        ]);

        $statistics = $this->service->getStatistics();

        $this->assertEquals(6, $statistics['total_achievements']);
        $this->assertEquals(2, $statistics['total_categories']);
        $this->assertEquals(4, $statistics['published']);
        $this->assertEquals(2, $statistics['draft']);
        $this->assertEquals(2, $statistics['featured']);
    }
}