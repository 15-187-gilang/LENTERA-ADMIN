import { useEffect, useState } from "react";
import { Save, User, Mail, Clock, Calendar, ShieldCheck } from "lucide-react";
import type { Profile, UpdateProfilePayload } from "../../../types/Profile";
import "./ProfileForm.css";

interface ProfileFormProps {
    profile: Profile;
    onSubmit: (payload: UpdateProfilePayload) => Promise<void>;
    submitting: boolean;
}

/**
 * Form untuk mengedit nama dan email admin.
 * Field read-only (Terakhir Login, Tanggal Dibuat) ditampilkan di bagian bawah.
 */
export default function ProfileForm({
    profile,
    onSubmit,
    submitting,
}: ProfileFormProps) {
    const [name, setName] = useState(profile.name);
    const [email, setEmail] = useState(profile.email);
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>(
        {}
    );

    // Sync state jika profile berubah dari luar
    useEffect(() => {
        setName(profile.name);
        setEmail(profile.email);
    }, [profile]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFieldErrors({});
        try {
            await onSubmit({ name, email });
        } catch (errors: any) {
            if (typeof errors === "object") {
                setFieldErrors(errors);
            }
        }
    };

    return (
        <form className="profile-form" onSubmit={handleSubmit} noValidate>
            {/* Nama */}
            <div className="pf-group">
                <label className="pf-label" htmlFor="profile-name">
                    Nama Lengkap
                </label>
                <div className="pf-input-wrapper">
                    <span className="pf-input-icon">
                        <User size={16} />
                    </span>
                    <input
                        id="profile-name"
                        className={`pf-input has-icon ${fieldErrors.name ? "pf-input--error" : ""}`}
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Nama lengkap administrator"
                        disabled={submitting}
                    />
                </div>
                {fieldErrors.name && (
                    <span className="pf-error">{fieldErrors.name[0]}</span>
                )}
            </div>

            {/* Email */}
            <div className="pf-group">
                <label className="pf-label" htmlFor="profile-email">
                    Email
                </label>
                <div className="pf-input-wrapper">
                    <span className="pf-input-icon">
                        <Mail size={16} />
                    </span>
                    <input
                        id="profile-email"
                        className={`pf-input has-icon ${fieldErrors.email ? "pf-input--error" : ""}`}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Alamat email administrator"
                        disabled={submitting}
                    />
                </div>
                {fieldErrors.email && (
                    <span className="pf-error">{fieldErrors.email[0]}</span>
                )}
            </div>

            {/* Read-only info */}
            <div className="pf-readonly-box">
                <div className="pf-readonly-row">
                    <div className="pf-readonly-header">
                        <Clock size={18} className="pf-readonly-icon" />
                        <span className="pf-readonly-label">Terakhir Login</span>
                    </div>
                    <span className="pf-readonly-value">
                        {profile.last_login_at ?? "—"}
                    </span>
                </div>
                
                <div className="pf-readonly-row">
                    <div className="pf-readonly-header">
                        <Calendar size={18} className="pf-readonly-icon" />
                        <span className="pf-readonly-label">Tanggal Dibuat</span>
                    </div>
                    <span className="pf-readonly-value">
                        {profile.created_at}
                    </span>
                </div>
            </div>

            {/* Tombol simpan */}
            <div className="pf-action">
                <button
                    type="submit"
                    className="pf-btn-save"
                    disabled={submitting}
                >
                    <Save size={16} />
                    {submitting ? "Menyimpan..." : "Simpan Perubahan"}
                </button>
            </div>
        </form>
    );
}
