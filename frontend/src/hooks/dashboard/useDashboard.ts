import { useCallback, useEffect, useState } from "react";

import dashboardApi from "../../api/dashboardApi";

import type { DashboardData } from "../../types/Dashboard";

/**
 * ==========================================================================
 * useDashboard
 * ==========================================================================
 *
 * Bertanggung jawab mengambil data Dashboard berdasarkan filter.
 */
export default function useDashboard(
    period: "year" | "month",

    year?: number,
) {
    const [dashboard, setDashboard] = useState<DashboardData | null>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState<string | null>(null);

    /**
     * Mengambil data Dashboard.
     */
    const loadDashboard = useCallback(async () => {
        try {
            setLoading(true);

            setError(null);

            const response = await dashboardApi.getDashboard(period, year);

            setDashboard(response.data);
        } catch (err: any) {
            setError(
                err.response?.data?.message ??
                    "Terjadi kesalahan saat memuat Dashboard.",
            );
        } finally {
            setLoading(false);
        }
    }, [period, year]);

    /**
     * Mengambil data setiap filter berubah.
     */
    useEffect(() => {
        loadDashboard();
    }, [loadDashboard]);

    return {
        dashboard,

        loading,

        error,

        refetch: loadDashboard,
    };
}
