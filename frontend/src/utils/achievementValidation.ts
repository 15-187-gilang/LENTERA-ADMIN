import type {
    AchievementFormErrors,
    AchievementFormValues,
} from "../types/AchievementForm";

export function validateAchievementForm(
    values: AchievementFormValues
): AchievementFormErrors {

    const errors: AchievementFormErrors = {};

    if (!values.title.trim()) {

        errors.title =
            "Judul prestasi wajib diisi.";

    }

    if (!values.recipient.trim()) {

        errors.recipient =
            "Penerima prestasi wajib diisi.";

    }

    if (!values.organizer.trim()) {

        errors.organizer =
            "Penyelenggara wajib diisi.";

    }

    if (values.category_id === "") {

        errors.category_id =
            "Kategori wajib dipilih.";

    }

    if (!values.level) {

        errors.level =
            "Tingkat prestasi wajib dipilih.";

    }

    if (!values.achievement_date) {

        errors.achievement_date =
            "Tanggal prestasi wajib diisi.";

    }

    if (!values.description.trim()) {

        errors.description =
            "Deskripsi wajib diisi.";

    }

    return errors;

}