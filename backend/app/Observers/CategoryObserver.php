<?php

namespace App\Observers;

use App\Models\Category;
use Illuminate\Support\Facades\Cache;

class CategoryObserver
{
    /**
     * Membersihkan cache dashboard terkait kategori
     */
    private function clearDashboardCache(): void
    {
        Cache::forget('dashboard.statistics');
        Cache::forget('dashboard.recent_achievements.5');
    }

    public function created(Category $category): void
    {
        $this->clearDashboardCache();
    }

    public function updated(Category $category): void
    {
        $this->clearDashboardCache();
    }

    public function deleted(Category $category): void
    {
        $this->clearDashboardCache();
    }
}
