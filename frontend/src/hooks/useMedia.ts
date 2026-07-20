import { useCallback, useEffect, useState } from "react";
import mediaApi from "../api/mediaApi";
import type { Media, Pagination } from "../types/Api";

export interface MediaFilters {
    page: number;
    per_page: number;
    search: string;
}

const DEFAULT_FILTERS: MediaFilters = {
    page: 1,
    per_page: 24,
    search: "",
};

export default function useMedia() {
    const [media, setMedia] = useState<Media[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<MediaFilters>(DEFAULT_FILTERS);

    const updateFilters = useCallback((value: Partial<MediaFilters>) => {
        setFilters((prev) => ({ ...prev, ...value }));
    }, []);

    const setSearchFilter = (search: string) => {
        updateFilters({ search, page: 1 });
    };

    const changePage = (page: number) => {
        updateFilters({ page });
    };

    const loadMedia = useCallback(async (currentFilters: MediaFilters) => {
        try {
            setLoading(true);
            setError(null);
            const response = await mediaApi.list(currentFilters);
            setMedia(response.data);
            setPagination(response.pagination);
        } catch (err: any) {
            setError(err.response?.data?.message ?? "Gagal memuat data media.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadMedia(filters);
    }, [filters, loadMedia]);

    const refresh = useCallback(async () => {
        await loadMedia(filters);
    }, [filters, loadMedia]);

    const uploadMedia = async (file: File, thumbnail?: File): Promise<Media> => {
        try {
            setUploading(true);
            setError(null);
            const newMedia = await mediaApi.upload(file, thumbnail);
            await refresh();
            return newMedia;
        } catch (err: any) {
            setError(err.response?.data?.message ?? "Gagal mengupload media.");
            throw err;
        } finally {
            setUploading(false);
        }
    };

    const deleteMedia = async (id: number) => {
        try {
            setSubmitting(true);
            setError(null);
            await mediaApi.remove(id);
            await refresh();
        } catch (err: any) {
            setError(err.response?.data?.message ?? "Gagal menghapus media.");
            throw err;
        } finally {
            setSubmitting(false);
        }
    };

    return {
        media,
        pagination,
        loading,
        uploading,
        submitting,
        error,
        filters,
        updateFilters,
        setSearchFilter,
        changePage,
        refresh,
        uploadMedia,
        deleteMedia,
    };
}
