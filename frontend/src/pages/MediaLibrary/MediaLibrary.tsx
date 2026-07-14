import "./MediaLibrary.css";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import AdminLayout from "../../layouts/AdminLayout";
import MediaToolbar from "../../components/media/MediaToolbar";
import MediaGrid from "../../components/media/MediaGrid";
import UploadModal from "../../components/media/UploadModal";
import PreviewModal from "../../components/media/PreviewModal";
import ConfirmModal from "../../components/common/ConfirmModal";
import Pagination from "../../components/common/Pagination";

import useMedia from "../../hooks/useMedia";
import useDebounce from "../../hooks/useDebounce";
import type { Media } from "../../types/Api";

export default function MediaLibrary() {
    const {
        media,
        pagination,
        loading,
        uploading,
        submitting,
        filters,
        refresh,
        changePage,
        setSearchFilter,
        uploadMedia,
        deleteMedia,
    } = useMedia();

    // Search
    const [search, setSearch] = useState(filters.search);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        setSearchFilter(debouncedSearch);
    }, [debouncedSearch]);

    // Upload Modal
    const [uploadOpen, setUploadOpen] = useState(false);

    // Preview Modal
    const [previewMedia, setPreviewMedia] = useState<Media | null>(null);

    // Delete Modal
    const [deleteTarget, setDeleteTarget] = useState<Media | null>(null);

    const handleUpload = async (file: File) => {
        try {
            await uploadMedia(file);
            toast.success("Media berhasil diunggah.");
            setUploadOpen(false);
        } catch {
            toast.error("Gagal mengupload media.");
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) return;
        try {
            await deleteMedia(deleteTarget.id);
            toast.success("Media berhasil dihapus.");
            setDeleteTarget(null);
            setPreviewMedia(null);
        } catch {
            toast.error("Gagal menghapus media.");
        }
    };

    const handleCopyUrl = async (url: string) => {
        try {
            await navigator.clipboard.writeText(url);
            toast.success("URL berhasil disalin!");
        } catch {
            toast.error("Gagal menyalin URL.");
        }
    };

    return (
        <AdminLayout
            title="Media Library"
            subtitle="Kelola seluruh aset gambar yang digunakan pada aplikasi."
        >
            <div className="media-library-page">
                {/* Toolbar */}
                <MediaToolbar
                    search={search}
                    loading={loading}
                    onSearchChange={setSearch}
                    onRefresh={refresh}
                    onUpload={() => setUploadOpen(true)}
                />

                {/* Grid */}
                <MediaGrid
                    media={media}
                    loading={loading}
                    onPreview={setPreviewMedia}
                    onDelete={setDeleteTarget}
                    onCopyUrl={handleCopyUrl}
                />

                {/* Pagination */}
                {pagination && pagination.last_page > 1 && (
                    <div className="media-pagination">
                        <Pagination
                            currentPage={pagination.current_page}
                            lastPage={pagination.last_page}
                            total={pagination.total}
                            perPage={pagination.per_page}
                            loading={loading}
                            onPageChange={changePage}
                        />
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            <UploadModal
                open={uploadOpen}
                uploading={uploading}
                onUpload={handleUpload}
                onClose={() => setUploadOpen(false)}
            />

            {/* Preview Modal */}
            <PreviewModal
                media={previewMedia}
                open={previewMedia !== null}
                onClose={() => setPreviewMedia(null)}
                onDelete={setDeleteTarget}
            />

            {/* Confirm Delete Modal */}
            <ConfirmModal
                open={deleteTarget !== null}
                title="Hapus Media"
                message={`Apakah Anda yakin ingin menghapus "${deleteTarget?.original_name}"? Tindakan ini tidak dapat dibatalkan.`}
                confirmText="Hapus"
                cancelText="Batal"
                loading={submitting}
                danger
                onConfirm={handleDelete}
                onClose={() => setDeleteTarget(null)}
            />
        </AdminLayout>
    );
}
