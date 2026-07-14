/**
 * ============================================================================
 * Text Helper
 * ============================================================================
 */

export function truncateText(
    text: string,
    maxLength = 100
): string {

    if (!text) {
        return "";
    }

    if (text.length <= maxLength) {
        return text;
    }

    return `${text.substring(0, maxLength)}...`;

}

export function capitalize(
    text: string
): string {

    if (!text) {
        return "";
    }

    return text.charAt(0).toUpperCase() + text.slice(1);

}

export function initials(
    text: string
): string {

    return text
        .split(" ")
        .map((word) => word.charAt(0))
        .join("")
        .toUpperCase();

}