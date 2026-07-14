import { useCallback, useEffect, useState } from "react";
import categoryApi from "../api/categoryApi";
import type { Category, Pagination } from "../types/Api";

export interface CategoryFilters {
    page: number;
    per_page: number;
    search: string;
}

const DEFAULT_FILTERS: CategoryFilters = {
    page: 1,
    per_page: 10,
    search: "",
};

export default function useCategory() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<CategoryFilters>(DEFAULT_FILTERS);

    const updateFilters = useCallback((value: Partial<CategoryFilters>) => {
        setFilters((prev) => ({
            ...prev,
            ...value,
        }));
    }, []);

    const setSearchFilter = (search: string) => {
        updateFilters({ search, page: 1 });
    };

    const loadCategories = useCallback(async (currentFilters: CategoryFilters) => {
        try {
            setLoading(true);
            setError(null);
            const response = await categoryApi.list(currentFilters);
            setCategories(response.data);
            setPagination(response.pagination);
        } catch (err: any) {
            setError(err.response?.data?.message ?? "Gagal memuat data kategori.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadCategories(filters);
    }, [filters, loadCategories]);

    const refresh = useCallback(async () => {
        await loadCategories(filters);
    }, [filters, loadCategories]);

    const changePage = (page: number) => {
        updateFilters({ page });
    };

    const createCategory = async (name: string, description?: string) => {
        try {
            setSubmitting(true);
            setError(null);
            await categoryApi.create(name, description);
            await refresh();
        } catch (err: any) {
            if (err.response?.status === 422) {
                throw err.response.data.errors;
            }
            setError(err.response?.data?.message ?? "Gagal menambahkan kategori.");
            throw err;
        } finally {
            setSubmitting(false);
        }
    };

    const updateCategory = async (id: number, name: string, description?: string) => {
        try {
            setSubmitting(true);
            setError(null);
            await categoryApi.update(id, name, description);
            await refresh();
        } catch (err: any) {
            setError(err.response?.data?.message ?? "Gagal memperbarui kategori.");
            throw err;
        } finally {
            setSubmitting(false);
        }
    };

    const deleteCategory = async (id: number) => {
        try {
            setSubmitting(true);
            setError(null);
            await categoryApi.remove(id);
            await refresh();
        } catch (err: any) {
            setError(err.response?.data?.message ?? "Gagal menghapus kategori.");
            throw err;
        } finally {
            setSubmitting(false);
        }
    };

    const getCategory = async (id: number) => {
        try {
            setLoading(true);
            setError(null);
            const category = await categoryApi.show(id);
            return category;
        } catch (err: any) {
            setError(err.response?.data?.message ?? "Gagal mengambil data kategori.");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        categories,
        pagination,
        loading,
        submitting,
        error,
        filters,
        updateFilters,
        setSearchFilter,
        refresh,
        changePage,
        createCategory,
        updateCategory,
        deleteCategory,
        getCategory,
    };
}
