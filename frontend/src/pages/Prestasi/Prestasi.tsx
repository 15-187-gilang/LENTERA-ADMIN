import "./Prestasi.css";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";

import AchievementToolbar from "../../components/achievement/AchievementToolbar";
import AchievementTable from "../../components/achievement/AchievementTable";
import ConfirmModal from "../../components/common/ConfirmModal";
import Pagination from "../../components/common/Pagination";

import useAchievement from "../../hooks/useAchievement";
import useDebounce from "../../hooks/useDebounce";

export default function Prestasi() {

    /**
     * ============================================================
     * Hook
     * ============================================================
     */

   const {

        achievements,

        pagination,

        loading,

        submitting,

        error,

        filters,

        refresh,

        changePage,

        setSearchFilter,

        setLevelFilter,

        setPublishedFilter,

        setFeaturedFilter,

        setSortFilter,

        deleteAchievement,

    } = useAchievement();

    /**
     * ============================================================
     * Search
     * ============================================================
     */

    const [

        search,

        setSearch,

    ] = useState(filters.search);

    const debounceSearch =

        useDebounce(

            search,

            500

        );

    /**
     * ============================================================
     * Delete Modal
     * ============================================================
     */

    const [

        selectedId,

        setSelectedId,

    ] = useState<number | null>(null);

    /**
     * ============================================================
     * Search Effect
     * ============================================================
     */

    useEffect(() => {

        setSearchFilter(debounceSearch);

    }, [

        debounceSearch,

        setSearch,

    ]);

    /**
     * ============================================================
     * Delete Handler
     * ============================================================
     */

    async function handleDelete() {

        if (

            selectedId === null

        ) {

            return;

        }

        try {

            await deleteAchievement(

                selectedId

            );

            toast.success(

                "Prestasi berhasil dihapus."

            );

            setSelectedId(null);

        }

        catch {

            toast.error(

                "Prestasi gagal dihapus."

            );

        }

    }

    /**
     * ============================================================
     * Open Delete Modal
     * ============================================================
     */

    function openDeleteModal(

        id: number

    ) {

        setSelectedId(id);

    }

    /**
     * ============================================================
     * Close Delete Modal
     * ============================================================
     */

    function closeDeleteModal() {

        setSelectedId(null);

    }
    

    return (

            <AdminLayout
                title="Daftar Prestasi"
                subtitle="Kelola seluruh data prestasi BPS Kabupaten Pringsewu."
            >

                <div className="prestasi-page">

                    {/* ======================================
                        Toolbar
                    ====================================== */}

                    <AchievementToolbar

                        search={search}

                        level={filters.level ?? ""}

                        published={
                            filters.published === undefined
                                ? ""
                                : String(filters.published)
                        }

                        sort={filters.sort}

                        loading={loading}

                        onSearchChange={setSearch}

                        onLevelChange={(value)=>

                            setLevelFilter(

                                value || undefined

                            )

                        }

                        onPublishedChange={(value)=>

                            setPublishedFilter(

                                value === ""

                                    ? undefined

                                    : value === "true"

                            )

                        }

                        onSortChange={setSortFilter}

                        onRefresh={refresh}

                    />

                    {/* ======================================
                        Table
                    ====================================== */}

                    <div className="prestasi-table-card">

                        <AchievementTable

                            achievements={achievements}

                            loading={loading}

                            error={error}

                            onDelete={openDeleteModal}

                            onRefresh={refresh}

                        />

                        {

                            pagination && (

                                <Pagination

                                    currentPage={pagination.current_page}

                                    lastPage={pagination.last_page}

                                    total={pagination.total}

                                    perPage={pagination.per_page}

                                    loading={loading}

                                    onPageChange={changePage}

                                />

                            )

                        }

                    </div>

                    {/* ======================================
                        Confirm Delete
                    ====================================== */}

                    <ConfirmModal

                        open={selectedId !== null}

                        title="Hapus Prestasi"

                        message="Apakah Anda yakin ingin menghapus data prestasi ini?"

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