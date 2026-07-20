import api from "./axios";

import type {

    Achievement,

    AchievementListResponse,

    ApiResponse,

} from "../types/Api";

/**
 * ==========================================================================
 * Achievement Payload
 * ==========================================================================
 */

export interface AchievementPayload {

    category_id?: number | null;

    title: string;

    recipient: string;

    organizer: string;

    level: string;

    achievement_date: string;

    description: string;

    featured: boolean;

    is_published: boolean;

    thumbnail?: File | string;

    attachment?: File;

    thumbnail_source?: "upload" | "library";

    thumbnail_media_url?: string | null;

}

/**
 * ==========================================================================
 * Achievement API
 * ==========================================================================
 */

class AchievementApi {

    /**
     * ----------------------------------------------------------------------
     * Mengambil seluruh data prestasi
     * ----------------------------------------------------------------------
     */

    async list(
        params?: {
            page?: number;
            per_page?: number;
            search?: string;
            category_id?: number;
            level?: string;
            featured?: boolean;
            published?: boolean;
            sort?: string;
        }
    ): Promise<AchievementListResponse> {

        const response =
            await api.get("/achievements", {
                params,
            });

        return {
            data: response.data.data,
            pagination: response.data.pagination,
        };
    }

    /**
     * --------------------------------------------------------------------------
     * Search Prestasi
     * --------------------------------------------------------------------------
     */

    search(
        keyword: string,
        page = 1
    ) {

        return this.list({

            page,

            search: keyword,

        });

    }

    /**
     * --------------------------------------------------------------------------
     * Filter Prestasi
     * --------------------------------------------------------------------------
     */

    filter(
        options: {

            category_id?: number;

            level?: string;

            featured?: boolean;

            published?: boolean;

            sort?: string;

            page?: number;

        }

    ) {

        return this.list(options);

    }

    /**
     * --------------------------------------------------------------------------
     * Refresh
     * --------------------------------------------------------------------------
     */

    refresh(
        page = 1
    ) {

        return this.list({

            page,

        });

    }

    /**
     * ----------------------------------------------------------------------
     * Mengambil detail prestasi
     * ----------------------------------------------------------------------
     */

    async show(
        id: number
    ): Promise<Achievement> {

        const response =
            await api.get<ApiResponse<Achievement>>(
                `/achievements/${id}`
            );

        return response.data.data;

    }

    /**
     * ----------------------------------------------------------------------
     * Menambahkan prestasi
     * ----------------------------------------------------------------------
     */

    async create(
        payload: AchievementPayload
    ): Promise<Achievement> {

        const formData = new FormData();

        Object.entries(payload).forEach(([key, value]) => {

            if (
                value === undefined ||
                value === null
            ) {
                return;
            }

            if (value instanceof File) {

                formData.append(
                    key,
                    value
                );

                return;
            }

            if (typeof value === "boolean") {
                formData.append(
                    key,
                    value ? "1" : "0"
                );

                return;
            }



            formData.append(
                key,
                String(value)
            );

        });

        const response =
            await api.post<ApiResponse<Achievement>>(
                "/achievements",
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

        return response.data.data;

    }

    /**
     * ----------------------------------------------------------------------
     * Memperbarui prestasi
     * ----------------------------------------------------------------------
     */

    async update(
        id: number,
        payload: AchievementPayload
    ): Promise<Achievement> {

        const formData = new FormData();

        Object.entries(payload).forEach(([key, value]) => {

            if (
                value === undefined ||
                value === null
            ) {
                return;
            }

            if (value instanceof File) {

                formData.append(
                    key,
                    value
                );

                return;
            }

            if (typeof value === "boolean") {
                formData.append(
                    key,
                    value ? "1" : "0"
                );

                return;
            }

            formData.append(
                key,
                String(value)
            );

        });

        /**
         * Laravel menerima POST + _method=PUT
         * untuk multipart/form-data.
         */

        formData.append(
            "_method",
            "PUT"
        );

        const response =
            await api.post<ApiResponse<Achievement>>(
                `/achievements/${id}`,
                formData,
                {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                }
            );

        return response.data.data;

    }

    /**
     * ----------------------------------------------------------------------
     * Menghapus prestasi
     * ----------------------------------------------------------------------
     */

    async remove(
        id: number
    ): Promise<void> {

        await api.delete(
            `/achievements/${id}`
        );

    }

    /**
     * ----------------------------------------------------------------------
     * Statistik Prestasi
     * ----------------------------------------------------------------------
     */

    async statistics() {

        const response =
            await api.get(
                "/achievements/statistics"
            );

        return response.data.data;

    }

    /**
     * ----------------------------------------------------------------------
     * Prestasi Unggulan
     * ----------------------------------------------------------------------
     */

    async featured(): Promise<Achievement[]> {

        const response =
            await api.get<ApiResponse<Achievement[]>>(
                "/achievements/featured"
            );

        return response.data.data;

    }

    /**
     * ----------------------------------------------------------------------
     * Prestasi Published
     * ----------------------------------------------------------------------
     */

    async published(): Promise<Achievement[]> {

        const response =
            await api.get<ApiResponse<Achievement[]>>(
                "/public/achievements"
            );

        return response.data.data;

    }

}

export default new AchievementApi();