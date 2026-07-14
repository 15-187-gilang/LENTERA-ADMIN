import "./CategoryTable.css";
import type { Category } from "../../../types/Api";
import CategoryTableRow from "../CategoryTableRow";
import EmptyState from "../../common/EmptyState";
import { FolderTree } from "lucide-react";

interface CategoryTableProps {
    categories: Category[];
    loading: boolean;
    onDelete: (category: Category) => void;
}

export default function CategoryTable({
    categories,
    loading,
    onDelete,
}: CategoryTableProps) {
    if (loading) {
        return (
            <div className="table-loading">
                <div className="spinner"></div>
                <p>Memuat data kategori...</p>
            </div>
        );
    }

    if (categories.length === 0) {
        return (
            <EmptyState
                icon={<FolderTree size={48} />}
                title="Tidak Ada Kategori"
                description="Belum ada data kategori yang ditambahkan atau tidak ditemukan kategori yang sesuai dengan pencarian."
            />
        );
    }

    return (
        <div className="table-container">
            <table className="category-table">
                <thead>
                    <tr>
                        <th className="text-center" width="50">No</th>
                        <th>Nama Kategori</th>
                        <th>Slug</th>
                        <th className="text-center">Jumlah Prestasi</th>
                        <th>Tanggal Dibuat</th>
                        <th width="150">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <CategoryTableRow
                            key={category.id}
                            category={category}
                            index={index}
                            onDelete={onDelete}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
