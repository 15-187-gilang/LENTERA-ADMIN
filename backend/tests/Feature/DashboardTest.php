<?php

namespace Tests\Feature;

use App\Models\Achievement;
use App\Models\Category;
use Tests\TestCase;

class DashboardTest extends TestCase
{
    /**
     * Admin dapat melihat dashboard.
     */
    public function test_admin_can_view_dashboard(): void
    {
        $this->authenticateAdmin();

        Achievement::factory()
            ->count(5)
            ->create();

        $response = $this->getJson('/api/dashboard');

        $response

            ->assertOk()

            ->assertJson([
                'success' => true,
            ])

            ->assertJsonStructure([

                'success',

                'message',

                'data' => [

                    'summary',
                    'recent_achievements',
                    'achievement_trend',

                ]

            ]);
    }

    /**
     * Guest tidak boleh melihat dashboard.
     */
    public function test_guest_cannot_view_dashboard(): void
    {
        $this->getJson('/api/dashboard')

            ->assertUnauthorized();
    }

    public function test_dashboard_summary_has_correct_structure(): void
    {
        $this->authenticateAdmin();

        Achievement::factory()
            ->count(3)
            ->create();

        $response = $this->getJson('/api/dashboard');

        $response

            ->assertOk()

            ->assertJsonStructure([

                'data' => [

                    'summary' => [

                        'total_achievements',

                        'total_categories',

                        'published',

                        'draft',

                        'featured',

                    ]

                ]

            ]);
    }


}