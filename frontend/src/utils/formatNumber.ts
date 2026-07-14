/**
 * ============================================================================
 * Number Formatter
 * ============================================================================
 */

/**
 * Format:
 * 12.345
 */
export function formatNumber(
    value: number
): string {

    return new Intl.NumberFormat("id-ID").format(value);

}

/**
 * Format:
 * Rp12.500
 */
export function formatCurrency(
    value: number,
    currency = "IDR"
): string {

    return new Intl.NumberFormat("id-ID", {

        style: "currency",

        currency,

        maximumFractionDigits: 0,

    }).format(value);

}

/**
 * Format:
 * 85%
 */
export function formatPercentage(
    value: number,
    fractionDigits = 1
): string {

    return `${value.toFixed(fractionDigits)}%`;

}

/**
 * Format:
 * 1.2K
 * 4.3M
 */
export function formatCompactNumber(
    value: number
): string {

    return new Intl.NumberFormat("id-ID", {

        notation: "compact",

        compactDisplay: "short",

    }).format(value);

}

/**
 * Format:
 * 1.234,56
 */
export function formatDecimal(
    value: number,
    fractionDigits = 2
): string {

    return new Intl.NumberFormat("id-ID", {

        minimumFractionDigits: fractionDigits,

        maximumFractionDigits: fractionDigits,

    }).format(value);

}