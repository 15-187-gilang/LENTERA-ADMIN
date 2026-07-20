import type { Category } from "./Api";


/**
 * ==========================================================================
 * Achievement Form Values
 * ==========================================================================
 */

export interface AchievementFormValues {

    category_id: number | "";

    title: string;

    recipient: string;

    organizer: string;

    level: string;

    achievement_date: string;

    description: string;

    featured: boolean;

    is_published: boolean;

    thumbnail: File | string | null;

    attachment: File | null;

    thumbnail_source: "upload" | "library";

    thumbnail_media_url: string | null;

}

/**
 * ==========================================================================
 * Achievement Form Errors
 * ==========================================================================
 */

export interface AchievementFormErrors {

    category_id?: string;

    title?: string;

    recipient?: string;

    organizer?: string;

    level?: string;

    achievement_date?: string;

    description?: string;

    thumbnail?: string;

}

/**
 * ==========================================================================
 * Achievement Form Props
 * ==========================================================================
 */

export interface AchievementFormProps {

    values: AchievementFormValues;

    errors: AchievementFormErrors;

    categories: Category[];

    loading?: boolean;

    submitText?: string;
    
    previewUrl?: string | null;

    onChange: <K extends keyof AchievementFormValues>(
        field: K,
        value: AchievementFormValues[K]
    ) => void;

    onSubmit: (isPublished?: boolean) => void;

    onCancel: () => void;

}