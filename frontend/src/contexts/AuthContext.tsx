import {
    createContext,
    useCallback,
    useEffect,
    useState,
    type ReactNode,
} from "react";

import authApi from "../api/authApi";

import type { Admin, LoginRequest } from "../types/Auth";

/* ==========================================================================
 * Interface Context
 * ========================================================================== */

interface AuthContextType {
    admin: Admin | null;

    token: string | null;

    isAuthenticated: boolean;

    login: (credentials: LoginRequest) => Promise<void>;

    logout: () => Promise<void>;

    loading: boolean;
}

/* ==========================================================================
 * Context
 * ========================================================================== */

export const AuthContext = createContext<AuthContextType | null>(null);

/* ==========================================================================
 * Provider
 * ========================================================================== */

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [admin, setAdmin] = useState<Admin | null>(null);

    const [token, setToken] = useState<string | null>(null);

    const [loading, setLoading] = useState(true);

    /**
     * ------------------------------------------------------------------
     * Memuat session ketika aplikasi pertama kali dibuka.
     * ------------------------------------------------------------------
     */
    useEffect(() => {
        const storedToken = localStorage.getItem("token");

        const storedAdmin = localStorage.getItem("admin");

        if (storedToken && storedAdmin) {
            setToken(storedToken);

            setAdmin(JSON.parse(storedAdmin));
        }

        setLoading(false);
    }, []);

    /**
     * ------------------------------------------------------------------
     * Login
     * ------------------------------------------------------------------
     */
    const login = useCallback(async (credentials: LoginRequest) => {
        const response = await authApi.login(credentials);

        const admin = response.data.admin;

        const token = response.data.token;

        localStorage.setItem("token", token);

        localStorage.setItem("admin", JSON.stringify(admin));

        setToken(token);

        setAdmin(admin);
    }, []);

    /**
     * ------------------------------------------------------------------
     * Logout
     * ------------------------------------------------------------------
     */
    const logout = useCallback(async () => {
        try {
            await authApi.logout();
        } catch {
            // Abaikan error ketika token sudah tidak valid.
        }

        localStorage.removeItem("token");

        localStorage.removeItem("admin");

        setAdmin(null);

        setToken(null);
    }, []);

    return (
        <AuthContext.Provider
            value={{
                admin,

                token,

                isAuthenticated: !!token,

                login,

                logout,

                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
