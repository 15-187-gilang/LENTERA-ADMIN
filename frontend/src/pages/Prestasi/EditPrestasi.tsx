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
                // Gunakan ?? "" untuk semua field string agar tidak ada null yang masuk ke Select/Input
                setValues({
                    category_id: data.category?.id ?? "",
                    title: data.title ?? "",
                    recipient: data.recipient ?? "",
                    organizer: data.organizer ?? "",
                    level: data.level ?? "",
                    achievement_date: data.achievement_date
                        ? new Date(data.achievement_date).toISOString().split('T')[0]
                        : "",
                    description: data.description ?? "",
                    featured: data.featured ?? false,
                    is_published: data.is_published ?? false,
                    thumbnail: null,
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

    async function handleSubmit(isPublished: boolean = false) {
        const isDraft = !isPublished;
        const finalValues = { ...values, is_published: isPublished };

        const validationErrors = validateAchievementForm(finalValues, isDraft);

        // Jika errornya hanya di thumbnail, kita abaikan (karena saat edit, thumbnail boleh kosong / menggunakan yang lama)
        if (validationErrors.thumbnail && !finalValues.thumbnail) {
            delete validationErrors.thumbnail;
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await updateAchievement(achievementId, {
                category_id: finalValues.category_id ? Number(finalValues.category_id) : null,
                title: finalValues.title,
                recipient: finalValues.recipient,
                organizer: finalValues.organizer,
                level: finalValues.level,
                achievement_date: finalValues.achievement_date,
                description: finalValues.description,
                featured: finalValues.featured,
                is_published: isPublished,
                thumbnail: finalValues.thumbnail ?? undefined,
                thumbnail_source: finalValues.thumbnail_source,
                thumbnail_media_url: finalValues.thumbnail_media_url ?? undefined,
            });

            toast.success(
                isPublished
                    ? "Prestasi berhasil dipublikasikan."
                    : "Prestasi dijadikan draft."
            );
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
                isPublished={values.is_published}
                onChange={handleChange}
                onSubmit={handleSubmit}
                onCancel={handleCancel}
            />
        </AdminLayout>
    );
}