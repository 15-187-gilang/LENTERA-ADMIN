import {
    FEATURED_BADGES,
    LEVEL_BADGES,
    STATUS_BADGES,
} from "../constants";

/**
 * ============================================================================
 * Level Badge
 * ============================================================================
 */

export function getLevelBadge(level: string) {

    return (

        LEVEL_BADGES[
            level as keyof typeof LEVEL_BADGES
        ]

        ??

        LEVEL_BADGES.Kabupaten

    );

}

/**
 * ============================================================================
 * Status Badge
 * ============================================================================
 */

export function getStatusBadge(
    published: boolean
) {

    return published

        ? STATUS_BADGES.Published

        : STATUS_BADGES.Draft;

}

/**
 * ============================================================================
 * Featured Badge
 * ============================================================================
 */

export function getFeaturedBadge(
    featured: boolean
) {

    return featured

        ? FEATURED_BADGES.Unggulan

        : FEATURED_BADGES.Biasa;

}