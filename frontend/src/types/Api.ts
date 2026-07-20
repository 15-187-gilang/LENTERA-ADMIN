/**
 * ==========================================================================
 * Generic API Response
 * ==========================================================================
 */

export interface ApiResponse<T> {

    success: boolean;

    message: string;

    data: T;
}

/**
 * ==========================================================================
 * Pagination
 * ==========================================================================
 */

export interface Pagination {

    current_page: number;

    last_page: number;

    per_page: number;

    total: number;

    from: number | null;

    to: number | null;

    next_page_url: string | null;

    prev_page_url: string | null;

}

/**
 * ==========================================================================
 * Achievement List Response
 * ==========================================================================
 */

export interface AchievementListResponse {

    data: Achievement[];

    pagination: Pagination;

}

/**
 * ==========================================================================
 * Category List Response
 * ==========================================================================
 */

export interface CategoryListResponse {

    data: Category[];

    pagination: Pagination;

}

/**
 * ==========================================================================
 * Category
 * ==========================================================================
 */

export interface Category {

    id: number;

    name: string;

    slug: string;

    description: string | null;

    achievements_count?: number;

    created_at: string;

    updated_at: string;

}

/**
 * ==========================================================================
 * Admin
 * ==========================================================================
 */

export interface Admin {

    id: number;

    name: string;

    email: string;

}

/**
 * ==========================================================================
 * Achievement Status
 * ==========================================================================
 */

export interface AchievementStatus {

    published: boolean;

    label: string;

}

/**
 * ==========================================================================
 * Achievement
 * ==========================================================================
 */

export interface Achievement {

    id: number;

    title: string;

    slug: string;

    /** Nullable saat draft */
    recipient: string | null;

    /** Nullable saat draft */
    organizer: string | null;

    /** Nullable saat draft */
    level: string | null;

    level_badge: string;

    /** Nullable saat draft */
    achievement_date: string | null;

    /** Nullable saat draft */
    description: string | null;

    short_description: string;

    thumbnail_url: string | null;

    featured: boolean;

    featured_label: string;

    is_published: boolean;

    published_at: string | null;

    status: AchievementStatus;

    category: Category | null;

    creator: Admin | null;

    created_at: string;

    updated_at: string;

}


/**
 * ==========================================================================
 * Setting
 * ==========================================================================
 */

export interface Setting {

    site_name: string;

    site_description: string | null;

    email: string | null;

    phone: string | null;

    address: string | null;

    seo_title: string | null;

    seo_description: string | null;

    maintenance_mode: boolean;

    maintenance_message: string | null;

}

/**
 * ==========================================================================
 * Media
 * ==========================================================================
 */

export interface Media {

    id: number;

    original_name: string;

    filename: string;

    mime_type: string;

    extension: string;

    size: number;

    size_formatted: string;

    path: string;

    url: string;

    thumbnail_url?: string;

    uploaded_by: Admin | null;

    created_at: string;

    updated_at: string;

}

/**
 * ==========================================================================
 * Media List Response
 * ==========================================================================
 */

export interface MediaListResponse {

    data: Media[];

    pagination: Pagination;

}