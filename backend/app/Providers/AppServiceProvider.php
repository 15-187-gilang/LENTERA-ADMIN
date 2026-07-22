<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Repositories\CategoryRepository;
use App\Repositories\Interfaces\CategoryRepositoryInterface;
use App\Repositories\AdminRepository;
use App\Repositories\Interfaces\AdminRepositoryInterface;
use App\Repositories\AchievementRepository;
use App\Repositories\Interfaces\AchievementRepositoryInterface;
use App\Repositories\DashboardRepository;
use App\Repositories\Interfaces\DashboardRepositoryInterface;
use App\Repositories\SettingRepository;
use App\Repositories\Interfaces\SettingRepositoryInterface;
use App\Repositories\MediaRepository;
use App\Repositories\Interfaces\MediaRepositoryInterface;

use App\Models\Achievement;
use App\Models\Category;
use App\Models\Media;
use App\Observers\AchievementObserver;
use App\Observers\CategoryObserver;
use App\Observers\MediaObserver;



class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        /*
        |--------------------------------------------------------------------------
        | Repository Binding
        |--------------------------------------------------------------------------
        |
        | Menghubungkan Interface dengan implementasi Repository.
        | Sehingga Laravel dapat melakukan Dependency Injection.
        |
        */

        // Category Repository
        $this->app->bind(
            CategoryRepositoryInterface::class,
            CategoryRepository::class
        );

        // Achievement Repository
        $this->app->bind(
            AchievementRepositoryInterface::class,
            AchievementRepository::class
        );

        // Admin Repository
        $this->app->bind(
            AdminRepositoryInterface::class,
            AdminRepository::class
        );

        // Activity Log Repository


        // Dashboard Repository
        $this->app->bind(
            DashboardRepositoryInterface::class,
            DashboardRepository::class
        );

        // Setting Repository
        $this->app->bind(
            SettingRepositoryInterface::class,
            SettingRepository::class
        );

        // Media Repository
        $this->app->bind(
            MediaRepositoryInterface::class,
            MediaRepository::class
        );
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Force HTTPS in production to prevent mixed content errors
        if (config('app.env') !== 'local') {
            \Illuminate\Support\Facades\URL::forceScheme('https');
        }

        Achievement::observe(AchievementObserver::class);
        Category::observe(CategoryObserver::class);
        Media::observe(MediaObserver::class);
    }
}
