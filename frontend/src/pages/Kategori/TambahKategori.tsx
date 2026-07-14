import "./TambahKategori.css";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { ArrowLeft } from "lucide-react";

import AdminLayout from "../../layouts/AdminLayout";
import CategoryForm from "../../components/category/CategoryForm";
import Button from "../../components/common/Button";
import useCategory from "../../hooks/useCategory";
import { ROUTES } from "../../constants";

export default function TambahKategori() {
    const navigate = useNavigate();
    const { createCategory, submitting } = useCategory();

    const handleSubmit = async (data: { name: string; description: string }) => {
        try {
            await createCategory(data.name, data.description);
            toast.success("Kategori berhasil ditambahkan.");
            navigate(ROUTES.categories);
        } catch (error: any) {
            // Error ditangani di hook useCategory atau bisa ditampilkan di sini
            if (typeof error === 'object' && error !== null) {
                // validation error, you could map it to form state
            }
        }
    };

    return (
        <AdminLayout
            title="Tambah Kategori"
            subtitle="Tambahkan kategori prestasi baru ke dalam sistem."
        >
            <div className="tambah-kategori-page">
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
                    <CategoryForm
                        onSubmit={handleSubmit}
                        onCancel={() => navigate(ROUTES.categories)}
                        loading={submitting}
                    />
                </div>
            </div>
        </AdminLayout>
    );
}
