<?php

namespace Tests\Feature;

use App\Models\Setting;
use Tests\TestCase;

class SettingTest extends TestCase
{
    /**
     * Pengguna dapat melihat pengaturan website.
     */
    public function test_can_view_setting(): void
    {
        Setting::factory()->create();

        $response = $this->getJson('/api/settings');

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
            ]);
    }

    /**
     * Admin dapat memperbarui pengaturan website.
     */
    public function test_admin_can_update_setting(): void
    {
        $this->authenticateAdmin();

        Setting::factory()->create();

        $response = $this->putJson('/api/settings', [

            'site_name' => 'LANTERA',

            'site_description' => 'Website Prestasi BPS',

            'email' => 'admin@bps.go.id',

            'phone' => '08123456789',

            'address' => 'Bandar Lampung',

            'maintenance_mode' => false,

        ]);

        $response
            ->assertOk()
            ->assertJson([
                'success' => true,
            ]);

        $this->assertDatabaseHas('settings', [

            'site_name' => 'LANTERA',

            'email' => 'admin@bps.go.id',

        ]);
    }

    /**
     * Site name wajib diisi.
     */
    public function test_site_name_is_required(): void
    {
        $this->authenticateAdmin();

        Setting::factory()->create();

        $response = $this->putJson('/api/settings', [

            'site_name' => '',

        ]);

        $response
            ->assertStatus(422)
            ->assertJsonValidationErrors([
                'site_name',
            ]);
    }

   

    /**
     * Guest tidak boleh memperbarui pengaturan.
     */
    public function test_guest_cannot_update_setting(): void
    {
        $response = $this->putJson('/api/settings', [

            'site_name' => 'LANTERA',

        ]);

        $response->assertStatus(401);
    }
}