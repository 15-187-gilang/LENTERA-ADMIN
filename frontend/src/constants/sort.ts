/**
 * ============================================================================
 * Achievement Sort
 * ============================================================================
 */

export type AchievementSort =

    | "latest"

    | "oldest"

    | "title"

    | "level";

export interface SortOption {

    value: AchievementSort;

    label: string;

}

export const SORT_OPTIONS:

readonly SortOption[] = [

    {

        value: "latest",

        label: "Terbaru",

    },

    {

        value: "oldest",

        label: "Terlama",

    },

    {

        value: "title",

        label: "Judul",

    },

    {

        value: "level",

        label: "Level",

    },

] as const;

export const DEFAULT_SORT: AchievementSort =

    "latest";