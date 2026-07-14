import "./Dashboard.css";

import AdminLayout from "../../layouts/AdminLayout";

import { Loading, ErrorState } from "../../components/common";

import SummaryCards from "../../components/dashboard/SummaryCards";

import AchievementChart from "../../components/dashboard/AchievementChart";

import RecentAchievements from "../../components/dashboard/RecentAchievements";



import useDashboard from "../../hooks/dashboard/useDashboard";

import { useState } from "react";

/**
 * ==========================================================================
 * Dashboard Page
 * ==========================================================================
 *
 * Halaman utama Administrator.
 *
 * Tanggung jawab:
 * - Mengambil data Dashboard melalui useDashboard()
 * - Menampilkan Loading
 * - Menampilkan Error
 * - Menyusun component Dashboard
 */
export default function Dashboard() {
    const [period, setPeriod] = useState<"year" | "month">("year");

    const [year, setYear] = useState(new Date().getFullYear());

    const {
        dashboard,

        loading,

        error,

        refetch,
    } = useDashboard(
        period,

        year,
    );

    /**
     * Loading State
     */
    if (loading) {
        return <Loading text="Memuat Dashboard..." />;
    }

    /**
     * Error State
     */
    if (error || !dashboard) {
        return (
            <ErrorState
                message={error ?? "Dashboard tidak dapat dimuat."}

                onRetry={refetch}
            />
        );
    }

    /**
     * Destructuring Dashboard
     */
    const {
        summary,

        achievement_trend,

        recent_achievements,
    } = dashboard;

    return (
        <AdminLayout
            title="Dashboard"

            subtitle="Ringkasan informasi sistem LENTERA"
        >
            <div className="dashboard-page">
                <SummaryCards summary={summary} />

                <AchievementChart
                    trend={achievement_trend}

                    period={period}

                    year={year}

                    onPeriodChange={setPeriod}

                    onYearChange={setYear}
                />

                <div className="dashboard-bottom">
                    <RecentAchievements achievements={recent_achievements} />
                </div>
            </div>
        </AdminLayout>
    );
}
