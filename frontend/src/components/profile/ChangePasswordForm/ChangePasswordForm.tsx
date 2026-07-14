import { useState } from "react";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import type { ChangePasswordPayload } from "../../../types/Profile";
import "./ChangePasswordForm.css";

interface ChangePasswordFormProps {
    onSubmit: (payload: ChangePasswordPayload) => Promise<void>;
    submitting: boolean;
}

/**
 * Form ganti password — current, baru, konfirmasi.
 * Reset otomatis setelah berhasil.
 */
export default function ChangePasswordForm({
    onSubmit,
    submitting,
}: ChangePasswordFormProps) {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

    // Visibility toggles
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFieldErrors({});

        try {
            await onSubmit({
                current_password: currentPassword,
                password: newPassword,
                password_confirmation: confirmPassword,
            });

            // Reset setelah sukses
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (errors: any) {
            if (typeof errors === "object") {
                setFieldErrors(errors);
            }
        }
    };

    return (
        <form className="cpf-form" onSubmit={handleSubmit} noValidate>
            {/* Password Lama */}
            <div className="cpf-group">
                <label className="cpf-label" htmlFor="current-password">
                    Password Lama
                </label>
                <div className="cpf-input-wrap">
                    <input
                        id="current-password"
                        className={`cpf-input ${fieldErrors.current_password ? "cpf-input--error" : ""}`}
                        type={showCurrent ? "text" : "password"}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        placeholder="Masukkan password lama"
                        disabled={submitting}
                        autoComplete="current-password"
                    />
                    <button
                        type="button"
                        className="cpf-toggle"
                        onClick={() => setShowCurrent((v) => !v)}
                        tabIndex={-1}
                        aria-label="Toggle visibility"
                    >
                        {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
                {fieldErrors.current_password && (
                    <span className="cpf-error">
                        {fieldErrors.current_password[0]}
                    </span>
                )}
            </div>

            {/* Password Baru */}
            <div className="cpf-group">
                <label className="cpf-label" htmlFor="new-password">
                    Password Baru
                </label>
                <div className="cpf-input-wrap">
                    <input
                        id="new-password"
                        className={`cpf-input ${fieldErrors.password ? "cpf-input--error" : ""}`}
                        type={showNew ? "text" : "password"}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Minimal 8 karakter"
                        disabled={submitting}
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        className="cpf-toggle"
                        onClick={() => setShowNew((v) => !v)}
                        tabIndex={-1}
                        aria-label="Toggle visibility"
                    >
                        {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
                {fieldErrors.password && (
                    <span className="cpf-error">{fieldErrors.password[0]}</span>
                )}
            </div>

            {/* Konfirmasi Password */}
            <div className="cpf-group">
                <label className="cpf-label" htmlFor="confirm-password">
                    Konfirmasi Password
                </label>
                <div className="cpf-input-wrap">
                    <input
                        id="confirm-password"
                        className={`cpf-input ${fieldErrors.password_confirmation ? "cpf-input--error" : ""}`}
                        type={showConfirm ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Ulangi password baru"
                        disabled={submitting}
                        autoComplete="new-password"
                    />
                    <button
                        type="button"
                        className="cpf-toggle"
                        onClick={() => setShowConfirm((v) => !v)}
                        tabIndex={-1}
                        aria-label="Toggle visibility"
                    >
                        {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                </div>
                {fieldErrors.password_confirmation && (
                    <span className="cpf-error">
                        {fieldErrors.password_confirmation[0]}
                    </span>
                )}
            </div>

            {/* Submit */}
            <div className="cpf-action">
                <button
                    type="submit"
                    className="cpf-btn-change outline"
                    disabled={submitting}
                >
                    <ShieldCheck size={16} />
                    {submitting ? "Menyimpan..." : "Ubah Password"}
                </button>
            </div>
        </form>
    );
}
