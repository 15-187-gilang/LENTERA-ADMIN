<?php

namespace Tests\Feature;

use App\Models\Category;
use Tests\TestCase;

class CategoryTest extends TestCase
{
    /**
     * Admin dapat melihat daftar kategori.
     */
    public function test_admin_can_get_category_list(): void
    {
        Category::factory()->count(3)->create();

        $admin = $this->authenticateAdmin();

        $response = $this->getJson('/api/categories');

        $response
            ->assertStatus(200)
            ->assertJson([
                'success' => true,
            ])
            ->assertJsonStructure([
                'success',
                'message',
                'data',
            ]);
    }

    /**
     * Admin dapat melihat detail kategori.
     */
    public function test_admin_can_get_category_detail(): void
    {
        $category = Category::factory()->create();

        $this->authenticateAdmin();

        $response = $this->getJson(
            "/api/categories/{$category->id}"
        );

        $response
            ->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);
    }

    /**
     * Admin dapat membuat kategori.
     */
    public function test_admin_can_create_category(): void
    {
        $this->authenticateAdmin();

        $response = $this->postJson('/api/categories', [

            'name' => 'Kategori Test',

            'description' => 'Deskripsi kategori',

        ]);

        $response
            ->assertStatus(201)
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas('categories', [

            'name' => 'Kategori Test',

        ]);
    }

    /**
     * Validasi create category.
     */
    public function test_create_category_validation(): void
    {
        $this->authenticateAdmin();

        $response = $this->postJson('/api/categories', []);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'name',
            ]);
    }

    /**
     * Admin dapat mengubah kategori.
     */
    public function test_admin_can_update_category(): void
    {
        $this->authenticateAdmin();

        $category = Category::factory()->create();

        $response = $this->putJson(

            "/api/categories/{$category->id}",

            [

                'name' => 'Kategori Baru',

                'description' => 'Deskripsi Baru',

            ]

        );

        $response
            ->assertStatus(200);

        $this->assertDatabaseHas('categories', [

            'id' => $category->id,

            'name' => 'Kategori Baru',

        ]);
    }

    /**
     * Validasi update category.
     */
    public function test_update_category_validation(): void
    {
        $this->authenticateAdmin();

        $category = Category::factory()->create();

        $response = $this->putJson(

            "/api/categories/{$category->id}",

            [

                'name' => '',

            ]

        );

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'name',
            ]);
    }

    /**
     * Admin dapat menghapus kategori.
     */
    public function test_admin_can_delete_category(): void
    {
        $this->authenticateAdmin();

        $category = Category::factory()->create();

        $response = $this->deleteJson(

            "/api/categories/{$category->id}"

        );

        $response
            ->assertStatus(200);

        $this->assertDatabaseMissing('categories', [

            'id' => $category->id,

        ]);
    }

    /**
     * Guest tidak boleh membuat kategori.
     */
    public function test_guest_cannot_create_category(): void
    {
        $response = $this->postJson('/api/categories', [

            'name' => 'Kategori',

        ]);

        $response->assertStatus(401);
    }
}