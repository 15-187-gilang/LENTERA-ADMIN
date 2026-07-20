import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

import categoryApi from "../../api/categoryApi";
import achievementApi from "../../api/achievementApi";
import useAchievement from "../../hooks/useAchievement";

import AdminLayout from "../../layouts/AdminLayout";
import AchievementForm from "../../components/achievement/AchievementForm";
import { Loading, ErrorState } from "../../components/common";

import type { Category } from "../../types/Api";
import { validateAchievementForm } from "../../utils";
import type {
    AchievementFormValues,
    AchievementFormErrors,
} from "../../types/AchievementForm";

export default function EditPrestasi() {
    const { id } = useParams();
    const achievementId = Number(id);
    const navigate = useNavigate();

    const { updateAchievement, submitting } = useAchievement();

    const [isFetching, setIsFetching] = useState(true);
    const [fetchError, setFetchError] = useState<string | null>(null);

    const [categories, setCategories] = useState<Category[]>([]);
    
    // Thumbnail preview URL from backend
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);

    const [values, setValues] = useState<AchievementFormValues>({
        category_id: "",
        title: "",
        recipient: "",
        organizer: "",
        level: "",
        achievement_date: "",
        description: "",
        featured: false,
        is_published: false,
        thumbnail: null,
        attachment: null,
        thumbnail_source: "upload",
        thumbnail_media_url: null,
    });

    const [errors, setErrors] = useState<AchievementFormErrors>({});

    // 1. Fetch data & categories on mount
    useEffect(() => {
        async function loadData() {
            if (!achievementId) return;

            try {
                setIsFetching(true);
                setFetchError(null);

                // Fetch categories and achievement data in parallel
                const [cats, data] = await Promise.all([
                    categoryApi.list(),
                    achievementApi.show(achievementId)
                ]);

                setCategories(cats.data);

                // Populate form values
                setValues({
                    category_id: data.category?.id ?? "",
                    title: data.title,
                    recipient: data.recipient,
                    organizer: data.organizer,
                    level: data.level,
                    // Backend returns datetime string like '2025-01-01T...', extract just the date YYYY-MM-DD
                    achievement_date: data.achievement_date ? new Date(data.achievement_date).toISOString().split('T')[0] : "",
                    description: data.description,
                    featured: data.featured,
                    is_published: data.is_published,
                    thumbnail: null, // Initialized as null because it's a File object (only changes if admin selects new file)
                    attachment: null,
                    thumbnail_source: "upload",
                    thumbnail_media_url: null,
                });
                
                // Set existing thumbnail for preview
                setPreviewUrl(data.thumbnail_url);
            } catch (error: any) {
                console.error("Gagal memuat data:", error);
                setFetchError(
                    error?.response?.data?.message ?? "Data prestasi tidak ditemukan atau terjadi kesalahan."
                );
                toast.error("Gagal memuat data prestasi.");
            } finally {
                setIsFetching(false);
            }
        }

        loadData();
    }, [achievementId]);

    // 2. Form Handlers
    function handleChange<K extends keyof AchievementFormValues>(
        field: K,
        value: AchievementFormValues[K]
    ) {
        setValues((prev) => ({
            ...prev,
            [field]: value,
        }));
        setErrors((prev) => ({
            ...prev,
            [field]: "",
        }));
    }

    async function handleSubmit() {
        const validationErrors = validateAchievementForm(values);

        // Jika errornya hanya di thumbnail, kita abaikan (karena saat edit, thumbnail boleh kosong / menggunakan yang lama)
        if (validationErrors.thumbnail && !values.thumbnail) {
            delete validationErrors.thumbnail;
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await updateAchievement(achievementId, {
                category_id: Number(values.category_id),
                title: values.title,
                recipient: values.recipient,
                organizer: values.organizer,
                level: values.level,
                achievement_date: values.achievement_date,
                description: values.description,
                featured: values.featured,
                is_published: values.is_published,
                thumbnail: values.thumbnail ?? undefined,
                thumbnail_source: values.thumbnail_source,
                thumbnail_media_url: values.thumbnail_media_url ?? undefined,
            });

            toast.success("Prestasi berhasil diperbarui.");
            navigate("/prestasi");
        } catch (error: any) {
            if (error?.response?.status === 422) {
                // Handle laravel validation errors
                const serverErrors = error.response.data.errors;
                const formattedErrors: Record<string, string> = {};
                Object.keys(serverErrors).forEach((key) => {
                    formattedErrors[key] = Array.isArray(serverErrors[key]) ? serverErrors[key][0] : serverErrors[key];
                });
                setErrors(formattedErrors);
            } else {
                toast.error(
                    error?.response?.data?.message ?? "Gagal memperbarui prestasi."
                );
            }
        }
    }

    function handleCancel() {
        navigate(-1);
    }

    // 3. Render States
    if (isFetching) {
        return (
            <AdminLayout title="Edit Prestasi" subtitle="Memuat data prestasi...">
                <Loading text="Mengambil data prestasi..." />
            </AdminLayout>
        );
    }

    if (fetchError) {
        return (
            <AdminLayout title="Edit Prestasi" subtitle="Terjadi kesalahan">
                <ErrorState message={fetchError} onRetry={() => window.location.reload()} />
            </AdminLayout>
        );
    }

    return (
        <AdminLayout
            title="Edit Prestasi"
            subtitle="Perbarui data prestasi yang ada."
        >
            <AchievementForm
                values={values}
                errors={errors}
                categories={categories}
                loading={submitting}
                submitText="Simpan Perubahan"
                previewUrl={previewUrl}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </AdminLayout>
    );
}