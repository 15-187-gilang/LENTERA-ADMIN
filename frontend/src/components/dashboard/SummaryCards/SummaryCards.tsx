import { Trophy, BadgeCheck, FileClock, FolderTree } from "lucide-react";

import SummaryCard from "../SummaryCard/SummaryCard";

import type { DashboardSummary } from "../../../types/Dashboard";

import "./SummaryCards.css";

/**
 * ==========================================================================
 * Summary Cards Props
 * ==========================================================================
 */
interface SummaryCardsProps {
    summary: DashboardSummary;
}

/**
 * ==========================================================================
 * Summary Cards Component
 * ==========================================================================
 *
 * Menampilkan seluruh ringkasan statistik Dashboard.
 */
export default function SummaryCards({ summary }: SummaryCardsProps) {
    return (
        <section className="summary-cards">
            <SummaryCard
                title="Total Prestasi"
                value={summary.total_achievements}
                icon={Trophy}
                color="#2563EB"
            />

            <SummaryCard
                title="Published"
                value={summary.published}
                icon={BadgeCheck}
                color="#16A34A"
            />

            <SummaryCard
                title="Draft"
                value={summary.draft}
                icon={FileClock}
                color="#F59E0B"
            />

            <SummaryCard
                title="Kategori"
                value={summary.total_categories}
                icon={FolderTree}
                color="#DC2626"
            />
        </section>
    );
}
