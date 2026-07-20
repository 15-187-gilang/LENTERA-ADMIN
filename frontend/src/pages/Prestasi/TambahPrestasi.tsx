import { useNavigate } from "react-router-dom";

import { useEffect, useState } from "react";

import toast from "react-hot-toast";

import categoryApi from "../../api/categoryApi";

import useAchievement from "../../hooks/useAchievement";

import AdminLayout from "../../layouts/AdminLayout";

import AchievementForm from "../../components/achievement/AchievementForm";

import type { Category } from "../../types/Api";

import {

    validateAchievementForm,

} from "../../utils";

import type {
    AchievementFormValues,
    AchievementFormErrors,
} from "../../types/AchievementForm";

export default function TambahPrestasi() {

    const navigate = useNavigate();

    const {

        createAchievement,

        submitting,

    } = useAchievement();

    /**
     * ============================================================
     * Form State
     * ============================================================
     */

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

    /**
     * ============================================================
     * Validation Error
     * ============================================================
     */

    const [errors, setErrors] =
        useState<AchievementFormErrors>({});

    /**
     * ============================================================
     * Categories
     * ============================================================
     */

    const [

        categories,

        setCategories,

    ] = useState<Category[]>([]);

    /**
     * ============================================================
     * Loading
     * ============================================================
     */



    useEffect(() => {

        async function loadCategories() {

            try {

                const response = await categoryApi.list();

                setCategories(response.data);

            }

            catch (error: any) {

                if (error.title || error.description) {

                    const validationErrors: Record<string, string> = {};

                    Object.entries(error).forEach(

                        ([key, value]) => {

                            validationErrors[key] =

                                Array.isArray(value)

                                    ? value[0]

                                    : String(value);

                        }

                    );

                    setErrors(validationErrors);

                    return;

                }

                toast.error(

                    "Gagal menambahkan prestasi."

                );

            }

        }

        loadCategories();

    }, []);

    /**
     * ============================================================
     * Form Change
     * ============================================================
     */

    function handleChange<
        K extends keyof AchievementFormValues
    >(
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

    /**
     * ============================================================
     * Submit
     * ============================================================
     */

    async function handleSubmit(isPublished: boolean = false) {

        const isDraft = !isPublished;
        const currentValues = { ...values, is_published: isPublished };

        // Draft hanya wajib isi title, publikasi wajib isi semua
        const validationErrors =

            validateAchievementForm(currentValues, isDraft);

        if (

            Object.keys(validationErrors).length > 0

        ) {

            setErrors(validationErrors);

            return;

        }

        try {

            await createAchievement({

                category_id: Number(currentValues.category_id) || null,

                title: currentValues.title,

                recipient: currentValues.recipient,

                organizer: currentValues.organizer,

                level: currentValues.level,

                achievement_date: currentValues.achievement_date,

                description: currentValues.description,

                featured: currentValues.featured,

                is_published: currentValues.is_published,

                thumbnail: currentValues.thumbnail ?? undefined,

                thumbnail_source: currentValues.thumbnail_source,

                thumbnail_media_url: currentValues.thumbnail_media_url ?? undefined,

            });

            toast.success(

                isPublished
                    ? "Prestasi berhasil dipublikasikan."
                    : "Draft berhasil disimpan."

            );

            navigate("/prestasi");

        }

        catch (error: any) {
            if (error?.response?.status === 422) {
                const serverErrors = error.response.data.errors;
                const formattedErrors: Record<string, string> = {};
                Object.keys(serverErrors).forEach((key) => {
                    formattedErrors[key] = Array.isArray(serverErrors[key]) ? serverErrors[key][0] : serverErrors[key];
                });
                setErrors(formattedErrors);
                toast.error("Silakan periksa kembali isian form.");
            } else {
                toast.error(
                    error?.response?.data?.message ??
                    "Gagal menambahkan prestasi."
                );
            }
        }

    }

    /**
     * ============================================================
     * Cancel
     * ============================================================
     */

    function handleCancel() {

        navigate(-1);

    }

    return (

        <AdminLayout

            title="Tambah Prestasi"

            subtitle="Tambahkan data prestasi baru."

        >

            <AchievementForm

                values={values}

                errors={errors}

                categories={categories}

                loading={submitting}

                submitText="Simpan Prestasi"

                onChange={handleChange}

                onSubmit={handleSubmit}

                onCancel={handleCancel}

            />

        </AdminLayout>

    );

}