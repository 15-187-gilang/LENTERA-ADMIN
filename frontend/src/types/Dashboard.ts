/**
 * ==========================================================================
 * Dashboard Summary
 * ==========================================================================
 */

export interface DashboardSummary {
    total_achievements: number;
    total_categories: number;
    published: number;
    draft: number;
    featured: number;
}

/**
 * ==========================================================================
 * Achievement Trend
 * ==========================================================================
 */

export interface AchievementTrendItem {
    label: string;
    total: number;
}

export interface AchievementTrend {
    period: "year" | "month";
    data: AchievementTrendItem[];
}

/**
 * ==========================================================================
 * Achievement
 * ==========================================================================
 */

export interface DashboardCategory {
    id: number;
    name: string;
    slug: string;
}

export interface DashboardCreator {
    id: number;
    name: string;
    email: string;
}

export interface DashboardStatus {
    published: boolean;
    label: string;
}

export interface RecentAchievement {
    id: number;

    title: string;

    slug: string;

    recipient: string;

    organizer: string;

    level: string;

    achievement_date: string;

    description: string;

    short_description: string;

    level_badge: string;

    status: DashboardStatus;

    featured: boolean;

    is_featured: boolean;

    featured_label: string;

    thumbnail_url: string | null;

    is_published: boolean;

    published_at: string;

    category: DashboardCategory;

    creator: DashboardCreator;

    created_at: string;

    updated_at: string;
}


/**
 * ==========================================================================
 * Dashboard Data
 * ==========================================================================
 */

export interface DashboardData {
    summary: DashboardSummary;

    achievement_trend: AchievementTrend;

    recent_achievements: RecentAchievement[];
}

/**
 * ==========================================================================
 * API Response
 * ==========================================================================
 */

export interface DashboardResponse {
    success: boolean;

    message: string;

    data: DashboardData;
}
