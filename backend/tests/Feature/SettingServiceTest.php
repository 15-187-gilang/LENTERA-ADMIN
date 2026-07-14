<?php

namespace Tests\Feature;

use App\Models\Setting;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class SettingServiceTest extends TestCase
{
    /**
     * Menyiapkan data setting default.
     */
    private function createSetting(): void
    {
        Setting::query()->delete();

        Setting::factory()->create([
            'id' => 1,
        ]);
    }

    /**
     * Admin dapat mengunggah logo.
     */
    public function test_admin_can_upload_logo(): void
    {
        Storage::fake('public');

        $this->authenticateAdmin();

        $this->createSetting();

        $response = $this->call(
            'PUT',
            '/api/settings',
            [
                'site_name' => 'LANTERA',
            ],
            [],
            [
                'logo' => UploadedFile::fake()->image('logo.png'),
            ]
        );

        $response->assertOk();

        $setting = Setting::findOrFail(1);

        $this->assertNotNull($setting->logo);

        $this->assertStringStartsWith(
            'settings/',
            $setting->logo
        );
    }

    /**
     * Admin dapat mengunggah institution logo.
     */
    public function test_admin_can_upload_institution_logo(): void
    {
        Storage::fake('public');

        $this->authenticateAdmin();

        $this->createSetting();

        $response = $this->call(
            'PUT',
            '/api/settings',
            [
                'site_name' => 'LANTERA',
            ],
            [],
            [
                'institution_logo' => UploadedFile::fake()->image('institution.png'),
            ]
        );

        $response->assertOk();

        $setting = Setting::findOrFail(1);

        $this->assertNotNull($setting->institution_logo);

        $this->assertStringStartsWith(
            'settings/',
            $setting->institution_logo
        );
    }

    /**
     * Admin dapat mengunggah favicon.
     */
    public function test_admin_can_upload_favicon(): void
    {
        Storage::fake('public');

        $this->authenticateAdmin();

        $this->createSetting();

        $response = $this->call(
            'PUT',
            '/api/settings',
            [
                'site_name' => 'LANTERA',
            ],
            [],
            [
                'favicon' => UploadedFile::fake()->image('favicon.png'),
            ]
        );

        $response->assertOk();

        $setting = Setting::findOrFail(1);

        $this->assertNotNull($setting->favicon);

        $this->assertStringStartsWith(
            'settings/',
            $setting->favicon
        );
    }

    /**
     * Admin dapat mengunggah hero image.
     */
    public function test_admin_can_upload_hero_image(): void
    {
        Storage::fake('public');

        $this->authenticateAdmin();

        $this->createSetting();

        $response = $this->call(
            'PUT',
            '/api/settings',
            [
                'site_name' => 'LANTERA',
            ],
            [],
            [
                'hero_image' => UploadedFile::fake()->image('hero.png'),
            ]
        );

        $response->assertOk();

        $setting = Setting::findOrFail(1);

        $this->assertNotNull($setting->hero_image);

        $this->assertStringStartsWith(
            'settings/',
            $setting->hero_image
        );
    }
}