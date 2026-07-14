import { useState } from "react";
import { Eye, EyeOff, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";
import type { LoginRequest } from "../../../types/Auth";
import logoLentera from "../../../assets/lentera.png";
import { FORM_ICONS } from "../../../constants/icons";
import "./LoginCard.css";

export default function LoginCard() {
    const navigate = useNavigate();
    const { login } = useAuth();

    const [formData, setFormData] = useState<LoginRequest>({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsLoading(true);

        try {
            await login(formData);
            toast.success("Login berhasil.");
            navigate("/dashboard");
        } catch (error: any) {
            console.error("Login Error:", error);

            const message =
                error.response?.data?.errors?.email?.[0] ??
                error.response?.data?.message ??
                "Login gagal. Silakan periksa kembali email dan password Anda.";

            toast.error(message);
        } finally {
            setIsLoading(false);
        }
    };

    const MailIcon = FORM_ICONS.email;
    const LockIcon = FORM_ICONS.password;
    const LoginIcon = LogIn;

    return (
        <div className="login-card">
            <div className="login-header">
                <img
                    src={logoLentera}
                    alt="Logo Lentera"
                    className="login-logo"
                />

                <h1 className="login-title">Login Admin</h1>

                <p className="login-subtitle">
                    Masuk untuk melanjutkan ke dashboard admin
                </p>
            </div>

            <div className="divider"></div>

            <form onSubmit={handleLogin}>
                <div className="form-group">
                    <label className="form-label">Email</label>
                    <div className="input-wrapper">
                        <MailIcon className="input-icon" size={20} />
                        <input
                            type="email"
                            name="email"
                            className="form-input"
                            placeholder="Masukkan email Anda"
                            value={formData.email}
                            onChange={handleInputChange}
                            autoComplete="email"
                            required
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Password</label>
                    <div className="input-wrapper">
                        <LockIcon className="input-icon" size={20} />
                        <input
                            type={showPassword ? "text" : "password"}
                            name="password"
                            className="form-input password-input"
                            placeholder="Masukkan password Anda"
                            value={formData.password}
                            onChange={handleInputChange}
                            autoComplete="current-password"
                            required
                        />

                        <button
                            type="button"
                            className="toggle-password-btn"
                            onClick={() => setShowPassword(!showPassword)}
                            aria-label={
                                showPassword
                                    ? "Sembunyikan password"
                                    : "Tampilkan password"
                            }
                        >
                            {showPassword ? (
                                <EyeOff size={20} strokeWidth={1.5} />
                            ) : (
                                <Eye size={20} strokeWidth={1.5} />
                            )}
                        </button>
                    </div>
                </div>

                <button
                    type="submit"
                    className="submit-btn"
                    disabled={isLoading}
                >
                    <LoginIcon className="submit-icon" size={20} />
                    {isLoading ? "Memproses..." : "Login"}
                </button>
            </form>
            
            <div className="login-footer">
                © 2025 BPS Kabupaten Pringsewu. Semua hak dilindungi.
            </div>
        </div>
    );
}
