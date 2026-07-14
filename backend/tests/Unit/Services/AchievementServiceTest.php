<?php

namespace Tests\Unit\Services;

use App\Models\Achievement;
use App\Models\Category;
use App\Services\AchievementService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;


class AchievementServiceTest extends TestCase
{
    use RefreshDatabase;

    private AchievementService $service;

    protected function setUp(): void
    {
        parent::setUp();

        $this->authenticateAdmin();

        $this->service = app(AchievementService::class);
    }

    /**
     * Data default achievement.
     */
    private function payload(array $override = []): array
    {
        return array_merge([

            'category_id' => Category::factory()->create()->id,

            'created_by' => auth('sanctum')->id(),

            'title' => 'Prestasi Nasional',

            'description' => 'Deskripsi prestasi',

            'recipient' => 'Mahasiswa',

            'organizer' => 'Kemendikbud',

            'level' => 'Nasional',

            'achievement_date' => now(),

            'featured' => false,

            'is_published' => true,

        ], $override);
    }

    /**
     * Service dapat membuat prestasi.
     */
    public function test_service_can_create_achievement(): void
    {
        $achievement = $this->service->create(
            $this->payload()
        );

        $this->assertInstanceOf(
            Achievement::class,
            $achievement
        );

        $this->assertDatabaseHas('achievements', [

            'title' => 'Prestasi Nasional',

        ]);
    }

    /**
     * Service membuat slug otomatis.
     */
    public function test_service_generates_slug(): void
    {
        $achievement = $this->service->create(
            $this->payload([
                'title' => 'Juara Nasional Robotik',
            ])
        );

        $this->assertEquals(

            'juara-nasional-robotik',

            $achievement->slug

        );
    }

    /**
     * Published_at otomatis terisi.
     */
    public function test_service_sets_published_at(): void
    {
        $achievement = $this->service->create(
            $this->payload([
                'is_published' => true,
            ])
        );

        $this->assertNotNull(
            $achievement->published_at
        );
    }

    /**
     * Service dapat update achievement.
     */
    public function test_service_can_update_achievement(): void
    {
        $achievement = Achievement::factory()->create();

        $result = $this->service->update(

            $achievement,

            [

                'title' => 'Prestasi Baru',

                'description' => 'Deskripsi Baru',

            ]

        );

        $this->assertTrue($result);

        $this->assertDatabaseHas('achievements', [

            'id' => $achievement->id,

            'title' => 'Prestasi Baru',

            'description' => 'Deskripsi Baru',

        ]);
    }

    /**
     * Slug ikut berubah.
     */
    public function test_service_updates_slug(): void
    {
        $achievement = Achievement::factory()->create([

            'title' => 'Prestasi Lama',

            'slug' => 'prestasi-lama',

        ]);

        $this->service->update(

            $achievement,

            [

                'title' => 'Prestasi Baru',

            ]

        );

        $achievement->refresh();

        $this->assertEquals(

            'prestasi-baru',

            $achievement->slug

        );
    }

    /**
     * Service dapat menghapus achievement.
     */
    public function test_service_can_delete_achievement(): void
    {
        $achievement = Achievement::factory()->create();

        $result = $this->service->delete(
            $achievement
        );

        $this->assertTrue($result);

        $this->assertDatabaseMissing(

            'achievements',

            [

                'id' => $achievement->id,

            ]

        );
    }

    /**
     * Service dapat mengambil data berdasarkan id.
     */
    public function test_service_can_find_by_id(): void
    {
        $achievement = Achievement::factory()->create();

        $result = $this->service->findById(
            $achievement->id
        );

        $this->assertInstanceOf(

            Achievement::class,

            $result

        );

        $this->assertEquals(

            $achievement->id,

            $result->id

        );
    }

    /**
     * Service dapat melakukan pagination.
     */
    public function test_service_can_paginate(): void
    {
        Achievement::factory()

            ->count(15)

            ->create();

        $result = $this->service->paginate();

        $this->assertCount(

            10,

            $result->items()

        );

        $this->assertEquals(

            15,

            $result->total()

        );
    }



     /**
     * Service dapat mengunggah thumbnail ketika membuat prestasi.
     */
    public function test_service_can_upload_thumbnail_on_create(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('thumbnail.jpg');

        $achievement = $this->service->create(
            $this->payload([
                'thumbnail' => $file,
            ])
        );

        $this->assertNotNull(
            $achievement->thumbnail
        );

        Storage::disk('public')->assertExists(
            $achievement->thumbnail
        );
    }

    /**
     * Service dapat mengganti thumbnail.
     */
    public function test_service_can_update_thumbnail(): void
    {
        Storage::fake('public');

        $achievement = Achievement::factory()->create([
            'thumbnail' => null,
        ]);

        $file = UploadedFile::fake()->image('new-thumbnail.jpg');

        $this->service->update(
            $achievement,
            [
                'thumbnail' => $file,
            ]
        );

        $achievement->refresh();

        $this->assertNotNull(
            $achievement->thumbnail
        );

        Storage::disk('public')->assertExists(
            $achievement->thumbnail
        );
    }

    /**
     * Thumbnail lama dihapus ketika diganti.
     */
    public function test_service_deletes_old_thumbnail_when_updating(): void
    {
        Storage::fake('public');

        $oldFile = UploadedFile::fake()->image('old.jpg');

        $oldPath = $oldFile->store(
            'achievements',
            'public'
        );

        $achievement = Achievement::factory()->create([
            'thumbnail' => $oldPath,
        ]);

        $newFile = UploadedFile::fake()->image('new.jpg');

        $this->service->update(
            $achievement,
            [
                'thumbnail' => $newFile,
            ]
        );

        $achievement->refresh();

        $this->assertFalse(Storage::disk('public')->exists($oldPath));
       $this->assertTrue(Storage::disk('public')->exists($achievement->thumbnail));

    }

    /**
     * Thumbnail ikut terhapus ketika prestasi dihapus.
     */
    public function test_service_deletes_thumbnail_when_deleting_achievement(): void
    {
        Storage::fake('public');

        $file = UploadedFile::fake()->image('thumbnail.jpg');

        $path = $file->store(
            'achievements',
            'public'
        );

        $achievement = Achievement::factory()->create([
            'thumbnail' => $path,
        ]);

        $this->service->delete($achievement);
        $this->assertFalse(Storage::disk('public')->exists($path));

        $this->assertDatabaseMissing(
            'achievements',
            [
                'id' => $achievement->id,
            ]
        );
    }

    /**
     * Published_at tidak berubah jika sudah pernah dipublish.
     */
    public function test_service_does_not_change_existing_published_at(): void
    {
        $publishedAt = now()->subDays(5);

        $achievement = Achievement::factory()->create([
            'published_at' => $publishedAt,
            'is_published' => true,
        ]);

        $this->service->update(
            $achievement,
            [
                'is_published' => true,
            ]
        );

        $achievement->refresh();

        // Bandingkan timestamp secara langsung agar aman di semua versi
        $this->assertEquals(
            $publishedAt->timestamp,
            $achievement->published_at->timestamp
        );
    }
}