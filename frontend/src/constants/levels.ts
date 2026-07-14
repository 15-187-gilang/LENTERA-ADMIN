/**
 * ============================================================================
 * Achievement Level
 * ============================================================================
 */

export type AchievementLevel =
    | "Kabupaten"
    | "Provinsi"
    | "Nasional"
    | "Internasional";

export interface LevelOption {

    value: AchievementLevel;

    label: string;

}

export const LEVEL_OPTIONS: readonly LevelOption[] = [

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

export const DEFAULT_LEVEL: AchievementLevel =

    "Kabupaten";