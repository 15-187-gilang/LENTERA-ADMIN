import { Lock, User } from "lucide-react";
import toast from "react-hot-toast";
import AdminLayout from "../../layouts/AdminLayout";
import useProfile from "../../hooks/useProfile";
import ProfileForm from "../../components/profile/ProfileForm/ProfileForm";
import ChangePasswordForm from "../../components/profile/ChangePasswordForm/ChangePasswordForm";
import type { UpdateProfilePayload, ChangePasswordPayload } from "../../types/Profile";
import "./Profil.css";

/**
 * Halaman Profil Admin
 *
 * Memuat data profil dari GET /api/profile dan menyediakan:
 *  - Form edit nama & email (ProfileForm)
 *  - Form ganti password (ChangePasswordForm)
 */
export default function Profil() {
    const { profile, loading, submitting, updateProfile, changePassword } =
        useProfile();

    // -------------------------------------------------------------------------
    // Handler update profil
    // -------------------------------------------------------------------------

    const handleUpdateProfile = async (payload: UpdateProfilePayload) => {
        await updateProfile(payload);
        toast.success("Profil berhasil diperbarui.");
    };

    // -------------------------------------------------------------------------
    // Handler ganti password
    // -------------------------------------------------------------------------

    const handleChangePassword = async (payload: ChangePasswordPayload) => {
        await changePassword(payload);
        toast.success("Password berhasil diubah.");
    };

    return (
        <AdminLayout
            title="Profil Saya"
            subtitle="Kelola informasi akun dan pengaturan keamanan Anda."
        >
            <div className="profil-page">

                {/* ── Loading skeleton ── */}
                {loading && (
                    <div className="profil-skeleton">
                        <div className="skeleton-block" />
                        <div className="skeleton-block skeleton-block--short" />
                    </div>
                )}

                {/* ── Content ── */}
                {!loading && profile && (
                    <>
                        {/* Panel 1: Informasi Profil */}
                        <div className="panel profil-panel">
                            <div className="profil-panel-header-with-icon">
                                <div className="profil-panel-icon-container">
                                    <User className="profil-panel-icon" />
                                </div>
                                <div>
                                    <h2 className="profil-panel-title">Informasi Akun</h2>
                                    <p className="profil-panel-subtitle">Perbarui nama dan alamat email akun Anda.</p>
                                </div>
                            </div>
                            <div className="profil-panel__body">
                                <ProfileForm
                                    profile={profile}
                                    onSubmit={handleUpdateProfile}
                                    submitting={submitting}
                                />
                            </div>
                        </div>

                        {/* Panel 2: Keamanan / Ganti Password */}
                        <div className="panel profil-panel">
                            <div className="profil-panel-header-with-icon">
                                <div className="profil-panel-icon-container">
                                    <Lock className="profil-panel-icon" />
                                </div>
                                <div>
                                    <h2 className="profil-panel-title">Keamanan Akun</h2>
                                    <p className="profil-panel-subtitle">Perbarui password secara berkala untuk menjaga keamanan akun.</p>
                                </div>
                            </div>
                            <div className="profil-panel__body">
                                <ChangePasswordForm
                                    onSubmit={handleChangePassword}
                                    submitting={submitting}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
}
