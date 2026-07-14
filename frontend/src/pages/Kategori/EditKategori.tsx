import "./EditKategori.css";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import CategoryForm from "../../components/category/CategoryForm";
import Button from "../../components/common/Button";
import useCategory from "../../hooks/useCategory";
import { ROUTES } from "../../constants";
import type { Category } from "../../types/Api";

export default function EditKategori() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { updateCategory, getCategory, submitting } = useCategory();

    const [category, setCategory] = useState<Category | null>(null);
    const [loadingData, setLoadingData] = useState(true);

    useEffect(() => {
        const fetchCategory = async () => {
            if (!id) return;
            try {
                const data = await getCategory(Number(id));
                setCategory(data);
            } catch {
                toast.error("Gagal memuat data kategori.");
                navigate(ROUTES.categories);
            } finally {
                setLoadingData(false);
            }
        };

        void fetchCategory();
    }, [id]);

    const handleSubmit = async (data: { name: string; description: string }) => {
        if (!id) return;
        try {
            await updateCategory(Number(id), data.name, data.description);
            toast.success("Kategori berhasil diperbarui.");
            navigate(ROUTES.categories);
        } catch (error: any) {
            if (typeof error === 'object' && error !== null) {
                // validation error
            }
        }
    };

    return (
        <AdminLayout
            title="Edit Kategori"
            subtitle="Perbarui data kategori prestasi."
        >
            <div className="edit-kategori-page">
                <div className="page-header">
                    <Button
                        variant="outline"
                        leftIcon={<ArrowLeft size={18} />}
                        onClick={() => navigate(ROUTES.categories)}
                    >
                        Kembali
                    </Button>
                </div>

                <div className="form-container">
                    {loadingData ? (
                        <div className="loading-state">Memuat data kategori...</div>
                    ) : category ? (
                        <CategoryForm
                            initialData={{
                                name: category.name,
                                description: category.description ?? "",
                            }}
                            onSubmit={handleSubmit}
                            onCancel={() => navigate(ROUTES.categories)}
                            loading={submitting}
                        />
                    ) : null}
                </div>
            </div>
        </AdminLayout>
    );
}
