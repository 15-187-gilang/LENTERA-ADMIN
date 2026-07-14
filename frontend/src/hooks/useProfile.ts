import { useCallback, useEffect, useState } from "react";
import profileApi from "../api/profileApi";
import type { Profile, UpdateProfilePayload, ChangePasswordPayload } from "../types/Profile";

/**
 * Hook untuk mengelola profil administrator yang sedang login.
 *
 * Menyediakan:
 *  - loadProfile()     → GET /api/profile
 *  - updateProfile()   → PUT /api/profile
 *  - changePassword()  → PUT /api/profile/password
 */
export default function useProfile() {
    const [profile, setProfile] = useState<Profile | null>(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // -------------------------------------------------------------------------
    // Load profil saat mount
    // -------------------------------------------------------------------------

    const loadProfile = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const data = await profileApi.show();
            setProfile(data);
        } catch (err: any) {
            setError(
                err.response?.data?.message ?? "Gagal memuat profil."
            );
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        void loadProfile();
    }, [loadProfile]);

    // -------------------------------------------------------------------------
    // Update profil (nama & email)
    // -------------------------------------------------------------------------

    const updateProfile = async (payload: UpdateProfilePayload) => {
        try {
            setSubmitting(true);
            setError(null);
            const updated = await profileApi.update(payload);
            setProfile(updated);
        } catch (err: any) {
            if (err.response?.status === 422) {
                throw err.response.data.errors;
            }
            setError(
                err.response?.data?.message ?? "Gagal memperbarui profil."
            );
            throw err;
        } finally {
            setSubmitting(false);
        }
    };

    // -------------------------------------------------------------------------
    // Ganti password
    // -------------------------------------------------------------------------

    const changePassword = async (payload: ChangePasswordPayload) => {
        try {
            setSubmitting(true);
            setError(null);
            await profileApi.changePassword(payload);
        } catch (err: any) {
            if (err.response?.status === 422) {
                throw err.response.data.errors;
            }
            setError(
                err.response?.data?.message ?? "Gagal mengganti password."
            );
            throw err;
        } finally {
            setSubmitting(false);
        }
    };

    return {
        profile,
        loading,
        submitting,
        error,
        loadProfile,
        updateProfile,
        changePassword,
    };
}
