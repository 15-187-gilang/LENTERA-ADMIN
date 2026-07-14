/**
 * ============================================================================
 * Select Options
 * ============================================================================
 *
 * Seluruh pilihan (options) untuk komponen Select.
 * Jangan melakukan hardcode option langsung di dalam komponen.
 */


/**
 * ============================================================================
 * Published Status
 * ============================================================================
 */

export const PUBLISHED_OPTIONS = [

    {
        value: "",
        label: "Semua Status",
    },

    {
        value: "true",
        label: "Published",
    },

    {
        value: "false",
        label: "Draft",
    },

] as const;



/**
 * ============================================================================
 * Form Achievement Level
 * ============================================================================
 */

export const FORM_LEVEL_OPTIONS = [

    {
        value: "",
        label: "Semua Level",
    },

    {
        value: "Kabupaten",
        label: "Kabupaten",
    },

    {
        value: "Provinsi",
        label: "Provinsi",
    },

    {
        value: "Nasional",
        label: "Nasional",
    },

    {
        value: "Internasional",
        label: "Internasional",
    },

] as const;

