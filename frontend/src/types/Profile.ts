/**
 * ==========================================================================
 * Profile
 * ==========================================================================
 *
 * Tipe data profil administrator yang sedang login.
 * Digunakan oleh profileApi, useProfile, dan komponen Profile.
 */

export interface Profile {

    id: number;

    name: string;

    email: string;

    /** Format: "dd MMM yyyy, HH:mm" — null jika belum pernah login setelah kolom ditambahkan */
    last_login_at: string | null;

    /** Format: "dd MMM yyyy" */
    created_at: string;

}

export interface UpdateProfilePayload {
    name: string;
    email: string;
}

export interface ChangePasswordPayload {
    current_password: string;
    password: string;
    password_confirmation: string;
}
