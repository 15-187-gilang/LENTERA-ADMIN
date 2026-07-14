import { useContext } from "react";

import { AuthContext } from "../contexts/AuthContext";

/**
 * ==========================================================================
 * useAuth
 * ==========================================================================
 *
 * Hook untuk mengakses AuthContext.
 *
 * Penggunaan:
 *
 * const {
 *      admin,
 *      login,
 *      logout,
 *      isAuthenticated
 * } = useAuth();
 *
 * ==========================================================================
 */

export default function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth harus digunakan di dalam AuthProvider.");
    }

    return context;
}
