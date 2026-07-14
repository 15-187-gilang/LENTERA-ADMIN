import "./Kategori.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import CategoryToolbar from "../../components/category/CategoryToolbar";
import CategoryTable from "../../components/category/CategoryTable";
import ConfirmModal from "../../components/common/ConfirmModal";
import Pagination from "../../components/common/Pagination";

import useCategory from "../../hooks/useCategory";
import useDebounce from "../../hooks/useDebounce";
import type { Category } from "../../types/Api";

export default function Kategori() {
    const {
        categories,
        pagination,
        loading,
        submitting,
        filters,
        refresh,
        changePage,
        setSearchFilter,
        deleteCategory,
    } = useCategory();

    const [search, setSearch] = useState(filters.search);
    const debounceSearch = useDebounce(search, 500);

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        setSearchFilter(debounceSearch);
    }, [debounceSearch, setSearch]);

    async function handleDelete() {
        if (!selectedCategory) return;

        try {
            await deleteCategory(selectedCategory.id);
            toast.success("Kategori berhasil dihapus.");
            setSelectedCategory(null);
        } catch {
            toast.error("Kategori gagal dihapus.");
        }
    }

    function openDeleteModal(category: Category) {
        setSelectedCategory(category);
    }

    function closeDeleteModal() {
        setSelectedCategory(null);
    }

    return (
        <AdminLayout
            title="Daftar Kategori"
            subtitle="Kelola kategori prestasi BPS Kabupaten Pringsewu."
        >
            <div className="kategori-page">
                <CategoryToolbar
                    search={search}
                    loading={loading}
                    onSearchChange={setSearch}
                    onRefresh={refresh}
                />

                <div className="kategori-table-card">
                    <CategoryTable
                        categories={categories}
                        loading={loading}
                        onDelete={openDeleteModal}
                    />

                    {pagination && (
                        <Pagination
                            currentPage={pagination.current_page}
                            lastPage={pagination.last_page}
                            total={pagination.total}
                            perPage={pagination.per_page}
                            loading={loading}
                            onPageChange={changePage}
                        />
                    )}
                </div>

                <ConfirmModal
                    open={selectedCategory !== null}
                    title="Hapus Kategori"
                    message={`Apakah Anda yakin ingin menghapus kategori "${selectedCategory?.name}"?`}
                    confirmText="Hapus"
                    cancelText="Batal"
                    loading={submitting}
                    danger
                    onConfirm={handleDelete}
                    onClose={closeDeleteModal}
                />
            </div>
        </AdminLayout>
    );
}
