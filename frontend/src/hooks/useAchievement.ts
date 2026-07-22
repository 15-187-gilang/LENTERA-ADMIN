import { useCallback, useEffect, useState } from "react";

import achievementApi, {
    type AchievementPayload,
} from "../api/achievementApi";

import type {
    Achievement,
    Pagination,
} from "../types/Api";

/**
 * ==========================================================================
 * Achievement Filters
 * ==========================================================================
 */

export interface AchievementFilters {

    page: number;

    per_page: number;

    search: string;

    category_id?: number;

    level?: string;

    featured?: boolean;

    published?: boolean;

    sort: string;

}

/**
 * ==========================================================================
 * Default Filter
 * ==========================================================================
 */

const DEFAULT_FILTERS: AchievementFilters = {

    page: 1,

    per_page: 10,

    search: "",

    category_id: undefined,

    level: undefined,

    featured: undefined,

    published: undefined,

    sort: "latest",

};

/**
 * ==========================================================================
 * useAchievement
 * ==========================================================================
 */

export default function useAchievement() {

    /*
    |--------------------------------------------------------------------------
    | State
    |--------------------------------------------------------------------------
    */

    const [achievements, setAchievements] = useState<Achievement[]>([]);

    const [pagination, setPagination] =
        useState<Pagination | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [submitting, setSubmitting] =
        useState(false);

    const [error, setError] =
        useState<string | null>(null);

    const [filters, setFilters] =
        useState<AchievementFilters>(DEFAULT_FILTERS);

    /*
    |--------------------------------------------------------------------------
    | Update Filter
    |--------------------------------------------------------------------------
    */

    const updateFilters = useCallback(

        (value: Partial<AchievementFilters>) => {

            setFilters((prev) => ({

                ...prev,

                ...value,

            }));

        },

        []

    );

    /**
 * ==========================================================================
 * Search
 * ==========================================================================
 */

const setSearchFilter = (search: string) => {

    updateFilters({

        search,

        page: 1,

    });

};

/**
 * ==========================================================================
 * Level
 * ==========================================================================
 */

const setLevelFilter = (

    level?: string

) => {

    updateFilters({

        level,

        page: 1,

    });

};

/**
 * ==========================================================================
 * Published
 * ==========================================================================
 */

const setPublishedFilter = (

    published?: boolean

) => {

    updateFilters({

        published,

        page: 1,

    });

};

/**
 * ==========================================================================
 * Featured
 * ==========================================================================
 */

const setFeaturedFilter = (

    featured?: boolean

) => {

    updateFilters({

        featured,

        page: 1,

    });

};


/**
 * ==========================================================================
 * Sort
 * ==========================================================================
 */

const setSortFilter = (

    sort: string

) => {

    updateFilters({

        sort,

        page: 1,

    });

};

    /*
    |--------------------------------------------------------------------------
    | Reset Filter
    |--------------------------------------------------------------------------
    */

    const resetFilters = useCallback(() => {

        setFilters(DEFAULT_FILTERS);

    }, []);

    /*
    |--------------------------------------------------------------------------
    | Load Achievement
    |--------------------------------------------------------------------------
    */

    const loadAchievements = useCallback(

        async (

            currentFilters: AchievementFilters

        ) => {

            try {

                setLoading(true);

                setError(null);

                const response =
                    await achievementApi.list(currentFilters);

                setAchievements(response.data);

                setPagination(response.pagination);

            }

            catch (err: any) {

                setError(

                    err.response?.data?.message ??

                    "Gagal memuat data prestasi."

                );

            }

            finally {

                setLoading(false);

            }

        },

        []

    );

    /*
    |--------------------------------------------------------------------------
    | Reload ketika filter berubah
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        void loadAchievements(filters);

    }, [

        filters,

        loadAchievements,

    ]);

    /*
    |--------------------------------------------------------------------------
    | Refresh
    |--------------------------------------------------------------------------
    */

    const refresh = useCallback(async () => {

        await loadAchievements(filters);

    }, [

        filters,

        loadAchievements,

    ]);

    /*
    |--------------------------------------------------------------------------
    | Pagination
    |--------------------------------------------------------------------------
    */

    const changePage = (

        page: number

    ) => {

        updateFilters({

            page,

        });

    };

    /*
    |--------------------------------------------------------------------------
    | Create
    |--------------------------------------------------------------------------
    */

    const createAchievement = async (

        payload: AchievementPayload

    ) => {

        try {

            setSubmitting(true);

            setError(null);

            await achievementApi.create(payload);

            await refresh();

        }

        catch (err: any) {

            if (err.response?.status === 422) {
                console.error("VALIDATION ERROR:", err.response.data.errors);
            }
            setError(
                err.response?.data?.message ??
                "Gagal menambahkan prestasi."
            );
            throw err;
        }

        finally {

            setSubmitting(false);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Update
    |--------------------------------------------------------------------------
    */

    const updateAchievement = async (

        id: number,

        payload: AchievementPayload

    ) => {

        try {

            setSubmitting(true);

            setError(null);

            await achievementApi.update(

                id,

                payload

            );

            await refresh();

        }

        catch (err: any) {

            setError(

                err.response?.data?.message ??

                "Gagal memperbarui prestasi."

            );

            throw err;

        }

        finally {

            setSubmitting(false);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Delete
    |--------------------------------------------------------------------------
    */

    const deleteAchievement = async (

        id: number

    ) => {

        try {

            setSubmitting(true);

            setError(null);

            await achievementApi.remove(id);

            await refresh();

        }

        catch (err: any) {

            setError(

                err.response?.data?.message ??

                "Gagal menghapus prestasi."

            );

            throw err;

        }

        finally {

            setSubmitting(false);

        }

    };

    /*
    |--------------------------------------------------------------------------
    | Return
    |--------------------------------------------------------------------------
    */
   

    return {

        achievements,

        pagination,

        loading,

        submitting,

        error,

        filters,

        updateFilters,

        refresh,

        changePage,

        setSearchFilter,

        setLevelFilter,

        setPublishedFilter,

        setFeaturedFilter,

        setSortFilter,

        resetFilters,

        createAchievement,

        updateAchievement,

        deleteAchievement,

    };

}