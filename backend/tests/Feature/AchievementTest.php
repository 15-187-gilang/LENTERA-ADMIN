<?php

namespace Tests\Feature;

use App\Models\Achievement;
use App\Models\Category;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class AchievementTest extends TestCase
{
    /**
     * Admin dapat melihat daftar prestasi.
     */
    public function test_admin_can_view_achievement_list(): void
    {
        $this->authenticateAdmin();

        Achievement::factory()
            ->count(5)
            ->create();

        $response = $this->getJson('/api/achievements');

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonCount(5, 'data');
    }

    /**
     * Admin dapat melihat detail prestasi.
     */
    public function test_admin_can_view_achievement_detail(): void
    {
        $this->authenticateAdmin();

        $achievement = Achievement::factory()->create();

        $response = $this->getJson(
            "/api/achievements/{$achievement->id}"
        );

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonPath(
                'data.id',
                $achievement->id
            );
    }

    /**
     * Admin dapat membuat prestasi.
     */
    public function test_admin_can_create_achievement(): void
    {
        Storage::fake('public');

        $admin = $this->authenticateAdmin();

        $category = Category::factory()->create();

        $payload = [

            'category_id' => $category->id,

            'title' => 'Juara Nasional',

            'recipient' => 'BPS Provinsi Lampung',

            'organizer' => 'BPS RI',

            'level' => 'Nasional',

            'achievement_date' => now()->toDateString(),

            'description' => 'Prestasi tingkat nasional.',

            'featured' => true,

            'is_published' => true,

            'thumbnail' => UploadedFile::fake()
                ->image('thumbnail.jpg'),

        ];

        $response = $this->postJson(
            '/api/achievements',
            $payload
        );

        $response
            ->assertCreated()
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas(
            'achievements',
            [
                'title' => 'Juara Nasional',
                'created_by' => $admin->id,
            ]
        );
    }

    /**
     * Validasi title wajib diisi.
     */
    public function test_title_is_required(): void
    {
        $this->authenticateAdmin();

        $category = Category::factory()->create();

        $response = $this->postJson(
            '/api/achievements',
            [

                'category_id' => $category->id,

                'title' => '',

                'recipient' => 'BPS',

                'organizer' => 'BPS',

                'level' => 'Nasional',

                'achievement_date' => now()->toDateString(),

                'description' => 'Test',

                'featured' => false,

                'is_published' => false,

            ]
        );

        $response

            ->assertStatus(422)

            ->assertJsonValidationErrors([
                'title',
            ]);
    }

    /**
     * Admin dapat mengubah prestasi.
     */
    public function test_admin_can_update_achievement(): void
    {
        $this->authenticateAdmin();

        $achievement = Achievement::factory()->create();

        $category = Category::factory()->create();

        $payload = [

            'category_id' => $category->id,

            'title' => 'Prestasi Baru',

            'recipient' => 'Recipient',

            'organizer' => 'Organizer',

            'level' => 'Provinsi',

            'achievement_date' => now()->toDateString(),

            'description' => 'Update prestasi.',

            'featured' => false,

            'is_published' => true,

        ];

        $response = $this->putJson(
            "/api/achievements/{$achievement->id}",
            $payload
        );

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas(
            'achievements',
            [
                'id' => $achievement->id,
                'title' => 'Prestasi Baru',
            ]
        );
    }

    /**
     * Admin dapat menghapus prestasi.
     */
    public function test_admin_can_delete_achievement(): void
    {
        $this->authenticateAdmin();

        $achievement = Achievement::factory()->create();

        $response = $this->deleteJson(
            "/api/achievements/{$achievement->id}"
        );

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseMissing(
            'achievements',
            [
                'id' => $achievement->id,
            ]
        );
    }

    /**
     * Guest tidak boleh membuat prestasi.
     */
    public function test_guest_cannot_create_achievement(): void
    {
        $category = Category::factory()->create();

        $response = $this->postJson(
            '/api/achievements',
            [

                'category_id' => $category->id,

                'title' => 'Prestasi',

                'recipient' => 'BPS',

                'organizer' => 'BPS',

                'level' => 'Nasional',

                'achievement_date' => now()->toDateString(),

                'description' => 'Test',

                'featured' => false,

                'is_published' => false,

            ]
        );

        $response->assertUnauthorized();
    }
}