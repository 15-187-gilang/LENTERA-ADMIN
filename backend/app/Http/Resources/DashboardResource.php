<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * --------------------------------------------------------------------------
 * Dashboard Resource
 * --------------------------------------------------------------------------
 *
 * Bertanggung jawab membentuk response Dashboard API.
 *
 * Resource tidak boleh berisi business logic maupun query database.
 *
 * @package App\Http\Resources
 */
class DashboardResource extends JsonResource
{
    /**
     * ----------------------------------------------------------------------
     * Transform resource menjadi array.
     * ----------------------------------------------------------------------
     *
     * @param Request $request
     *
     * @return array<string,mixed>
     */
    public function toArray(Request $request): array
    {
        return [

            /*
            |--------------------------------------------------------------------------
            | Ringkasan Dashboard
            |--------------------------------------------------------------------------
            */

            'summary' => $this['summary'],

            /*
            |--------------------------------------------------------------------------
            | Grafik Tren Prestasi
            |--------------------------------------------------------------------------
            */

            'achievement_trend' => [

                /*
                |--------------------------------------------------------------------------
                | Jenis Grafik
                |--------------------------------------------------------------------------
                |
                | year
                | month
                |
                */

                'period' => $this['period'],

                /*
                |--------------------------------------------------------------------------
                | Data Grafik
                |--------------------------------------------------------------------------
                */

                'data' => $this['achievement_trend'],

            ],

            /*
            |--------------------------------------------------------------------------
            | Prestasi Terbaru
            |--------------------------------------------------------------------------
            */

            'recent_achievements' => AchievementResource::collection(
                $this['recent_achievements']
            ),
        ];


    }
}