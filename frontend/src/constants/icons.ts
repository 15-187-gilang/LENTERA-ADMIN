/**
 * ==========================================================================
 * LENTERA Icon Library
 * ==========================================================================
 *
 * Seluruh icon aplikasi dikelompokkan berdasarkan fungsinya agar mudah
 * digunakan kembali (reusable) dan mudah dipelihara.
 */

import {
    // Dashboard
    Trophy,
    BadgeCheck,
    FileClock,
    FolderTree,

    // Badge
    Star,
    Flag,
    Landmark,
    Globe,
    MapPinned,

    // Information
    CalendarDays,
    Building2,
    UserRound,
    UserCog,

    // Navigation
    LayoutDashboard,
    BookOpen,
    Image,
    Settings,
    Menu,
    Mail,
    Lock,
    type LucideIcon,
} from "lucide-react";

/**
 * ==========================================================================
 * Dashboard Icons
 * ==========================================================================
 */

export const DASHBOARD_ICONS: Record<string, LucideIcon> = {
    trophy: Trophy,

    published: BadgeCheck,

    draft: FileClock,

    category: FolderTree,
};

/**
 * ==========================================================================
 * Achievement Badge Icons
 * ==========================================================================
 */

export const BADGE_ICONS: Record<string, LucideIcon> = {
    featured: Star,

    district: MapPinned,

    province: Landmark,

    national: Flag,

    international: Globe,
};

/**
 * ==========================================================================
 * Information Icons
 * ==========================================================================
 */

export const INFO_ICONS: Record<string, LucideIcon> = {
    recipient: UserRound,

    creator: UserCog,

    organizer: Building2,

    category: FolderTree,

    calendar: CalendarDays,
};


/**
 * ==========================================================================
 * Navigation Icons
 * ==========================================================================
 */

export const NAVIGATION_ICONS: Record<string, LucideIcon> = {
    dashboard: LayoutDashboard,

    achievement: BookOpen,

    category: FolderTree,

    media: Image,

    settings: Settings,

    menu: Menu,
};

/**
 * ==========================================================================
 * Form Icons
 * ==========================================================================
 */

export const FORM_ICONS: Record<string, LucideIcon> = {
    email: Mail,

    password: Lock,
};
