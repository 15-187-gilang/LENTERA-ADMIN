<?php

namespace Tests\Unit\Services;

use App\Models\Setting;
use App\Services\SettingService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SettingServiceTest extends TestCase
{
    use RefreshDatabase;

    private SettingService $service;

    protected function setUp(): void
    {
        parent::setUp();

        $this->authenticateAdmin();

        $this->service = app(SettingService::class);
    }

    /**
     * Data default.
     */
    private function payload(array $override = []): array
    {
        return array_merge([

            'site_name' => 'LANTERA',

            'site_description' => 'Website Prestasi BPS',

            'email' => 'admin@lantera.id',

            'phone' => '08123456789',

            'address' => 'Kabupaten Pringsewu',

            'maintenance_mode' => false,

        ], $override);
    }

    /**
     * Service dapat mengambil setting.
     */
    public function test_service_can_get_setting(): void
    {
        Setting::factory()->create();

        $setting = $this->service->get();

        $this->assertInstanceOf(
            Setting::class,
            $setting
        );
    }

    /**
     * Service dapat memperbarui setting.
     */
    public function test_service_can_update_setting(): void
    {
        Setting::factory()->create();

        $setting = $this->service->update(
            $this->payload([
                'site_name' => 'LANTERA BARU',
            ])
        );

        $this->assertEquals(
            'LANTERA BARU',
            $setting->site_name
        );

        $this->assertDatabaseHas(
            'settings',
            [
                'site_name' => 'LANTERA BARU',
            ]
        );
    }

    /**
     * Upload logo.
     */
    public function test_service_can_upload_logo(): void
    {
        Storage::fake('public');

        Setting::factory()->create();

        $setting = $this->service->update(
            $this->payload([
                'logo' => UploadedFile::fake()->image('logo.png'),
            ])
        );

        $this->assertNotNull(
            $setting->logo
        );

        Storage::disk('public')
            ->assertExists($setting->logo);
    }

    /**
     * Upload institution logo.
     */
    public function test_service_can_upload_institution_logo(): void
    {
        Storage::fake('public');

        Setting::factory()->create();

        $setting = $this->service->update(
            $this->payload([
                'institution_logo' => UploadedFile::fake()->image('institution.png'),
            ])
        );

        $this->assertNotNull(
            $setting->institution_logo
        );

        Storage::disk('public')
            ->assertExists($setting->institution_logo);
    }

    /**
     * Upload favicon.
     */
    public function test_service_can_upload_favicon(): void
    {
        Storage::fake('public');

        Setting::factory()->create();

        $setting = $this->service->update(
            $this->payload([
                'favicon' => UploadedFile::fake()->image('favicon.png'),
            ])
        );

        $this->assertNotNull(
            $setting->favicon
        );

        Storage::disk('public')
            ->assertExists($setting->favicon);
    }

    /**
     * Upload hero image.
     */
    public function test_service_can_upload_hero_image(): void
    {
        Storage::fake('public');

        Setting::factory()->create();

        $setting = $this->service->update(
            $this->payload([
                'hero_image' => UploadedFile::fake()->image('hero.png'),
            ])
        );

        $this->assertNotNull(
            $setting->hero_image
        );

        Storage::disk('public')
            ->assertExists($setting->hero_image);
    }

    /**
     * Maintenance mode dapat diubah.
     */
    public function test_service_can_enable_maintenance_mode(): void
    {
        Setting::factory()->create();

        $setting = $this->service->update(
            $this->payload([
                'maintenance_mode' => true,
            ])
        );

        $this->assertTrue(
            $setting->maintenance_mode
        );
    }



    /**
     * Mengganti logo lama.
     */
    public function test_service_replaces_old_logo(): void
    {
        Storage::fake('public');

        $oldLogo = UploadedFile::fake()->image('old-logo.png');
        $oldPath = $oldLogo->store('settings', 'public');

        $setting = Setting::firstOrCreate(
            ['id' => 1],
            ['site_name' => 'LANTERA']
        );

        $setting->update([
            'logo' => $oldPath,
        ]);

        $setting = $this->service->update(
            $this->payload([
                'logo' => UploadedFile::fake()->image('new-logo.png'),
            ])
        );

        $setting->refresh();

        $this->assertNotEquals($oldPath, $setting->logo);

        Storage::disk('public')->assertExists($setting->logo);
    }

    /**
     * Mengganti hero image lama.
     */
    public function test_service_replaces_old_hero_image(): void
    {
        Storage::fake('public');

        $oldHero = UploadedFile::fake()->image('hero-old.png');

        $oldPath = $oldHero->store('settings', 'public');

        $setting = Setting::firstOrCreate(
            ['id' => 1],
            [
                'site_name' => 'LANTERA',
            ]
        );

        $setting->update([
            'hero_image' => $oldPath,
        ]);

        $setting = $this->service->update(
            $this->payload([
                'hero_image' => UploadedFile::fake()->image('hero-new.png'),
            ])
        );

        $setting->refresh();

        $this->assertNotEquals(
            $oldPath,
            $setting->hero_image
        );

        Storage::disk('public')
            ->assertExists($setting->hero_image);
    }
}