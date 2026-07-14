<?php

namespace Tests\Feature;

use App\Models\Admin;
use Tests\TestCase;

class AuthTest extends TestCase
{
    /**
     * Login berhasil.
     */
    public function test_admin_can_login(): void
    {
        $admin = Admin::factory()->create([
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $admin->email,
            'password' => 'password',
        ]);

        $response
            ->assertStatus(200)
            ->assertJsonStructure([
                'success',
                'message',
                'data' => [
                    'admin',
                    'token',
                ],
            ]);
    }

    /**
     * Login gagal jika password salah.
     */
    public function test_login_fails_with_wrong_password(): void
    {
        $admin = Admin::factory()->create([
            'password' => bcrypt('password'),
        ]);

        $response = $this->postJson('/api/login', [
            'email' => $admin->email,
            'password' => 'salah',
        ]);

        $response->assertStatus(422);
    }

    /**
     * Login gagal jika email tidak ditemukan.
     */
    public function test_login_fails_with_unknown_email(): void
    {
        $response = $this->postJson('/api/login', [
            'email' => 'tidakada@example.com',
            'password' => 'password',
        ]);

        $response->assertStatus(422);
    }

    /**
     * Logout berhasil.
     */
    public function test_admin_can_logout(): void
    {
        $admin = Admin::factory()->create();

        $token = $admin->createToken('test')->plainTextToken;

        $response = $this
            ->withHeader('Authorization', 'Bearer '.$token)
            ->postJson('/api/logout');

        $response
            ->assertStatus(200)
            ->assertJson([
                'success' => true,
            ]);
    }

    /**
     * Endpoint protected harus ditolak tanpa token.
     */
    public function test_guest_cannot_access_protected_route(): void
    {
        $response = $this->getJson('/api/dashboard');

        $response->assertStatus(401);
    }
}