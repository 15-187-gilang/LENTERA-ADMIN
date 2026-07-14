<?php

namespace App\Observers;

use App\Models\Achievement;
use Illuminate\Support\Facades\Cache;

class AchievementObserver
{
    /**
     * Membersihkan cache dashboard terkait pencapaian
     */
    private function clearDashboardCache(): void
    {
        Cache::forget('dashboard.statistics');
        Cache::forget('dashboard.recent_achievements.5');
    }

    public function created(Achievement $achievement): void
    {
        $this->clearDashboardCache();
    }

    public function updated(Achievement $achievement): void
    {
        $this->clearDashboardCache();
    }

    public function deleted(Achievement $achievement): void
    {
        $this->clearDashboardCache();
    }
}
