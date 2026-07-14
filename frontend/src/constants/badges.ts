import { COLORS } from "./colors";
import { BADGE_ICONS, DASHBOARD_ICONS } from "./icons";

/**
 * ==========================================================================
 * Status Badge
 * ==========================================================================
 */

export const STATUS_BADGES = {
    Published: {
        icon: DASHBOARD_ICONS.published,

        color: COLORS.SUCCESS,
    },

    Draft: {
        icon: DASHBOARD_ICONS.draft,

        color: COLORS.WARNING,
    },
} as const;

/**
 * ==========================================================================
 * Featured Badge
 * ==========================================================================
 */

export const FEATURED_BADGES = {
    Unggulan: {
        icon: BADGE_ICONS.featured,

        color: COLORS.WARNING,
    },

    Biasa: {
        icon: BADGE_ICONS.featured,

        color: COLORS.GRAY,
    },
} as const;

/**
 * ==========================================================================
 * Level Badge
 * ==========================================================================
 */

export const LEVEL_BADGES = {
    Kabupaten: {
        icon: BADGE_ICONS.district,

        color: COLORS.INFO,
    },

    Provinsi: {
        icon: BADGE_ICONS.province,

        color: COLORS.PRIMARY,
    },

    Nasional: {
        icon: BADGE_ICONS.national,

        color: COLORS.DANGER,
    },

    Internasional: {
        icon: BADGE_ICONS.international,

        color: COLORS.PURPLE,
    },
} as const;
