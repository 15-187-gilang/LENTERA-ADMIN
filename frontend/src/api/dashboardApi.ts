import api from "./axios";
import type { DashboardResponse } from "../types/Dashboard";

/**
 * ==========================================================================
 * Dashboard API
 * ==========================================================================
 *
 * Seluruh komunikasi Dashboard dengan Backend.
 */
class DashboardApi {
    async getDashboard(
        period: "year" | "month" = "year",

        year?: number,
    ): Promise<DashboardResponse> {
        const response = await api.get<DashboardResponse>(
            "/dashboard",

            {
                params: {
                    period,

                    year,
                },
            },
        );

        return response.data;
    }
}

export default new DashboardApi();
