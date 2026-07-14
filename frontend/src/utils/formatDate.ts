/**
 * ============================================================================
 * Date Formatter
 * ============================================================================
 */

/**
 * Format:
 * 12 Juli 2026
 */
export function formatDate(
    value?: string | Date | null,
    locale = "id-ID"
): string {

    if (!value) {
        return "-";
    }

    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
    }).format(new Date(value));

}

/**
 * Format:
 * 12 Juli 2026 14.30
 */
export function formatDateTime(
    value?: string | Date | null,
    locale = "id-ID"
): string {

    if (!value) {
        return "-";
    }

    return new Intl.DateTimeFormat(locale, {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    }).format(new Date(value));

}

/**
 * Format:
 * Juli 2026
 */
export function formatMonthYear(
    value?: string | Date | null,
    locale = "id-ID"
): string {

    if (!value) {
        return "-";
    }

    return new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
    }).format(new Date(value));

}

/**
 * Format:
 * 2026
 */
export function formatYear(
    value?: string | Date | null
): string {

    if (!value) {
        return "-";
    }

    return String(new Date(value).getFullYear());

}

/**
 * Format:
 * Senin
 */
export function formatWeekday(
    value?: string | Date | null,
    locale = "id-ID"
): string {

    if (!value) {
        return "-";
    }

    return new Intl.DateTimeFormat(locale, {
        weekday: "long",
    }).format(new Date(value));

}