import type { LucideIcon } from "lucide-react";

import "./SummaryCard.css";

/**
 * ==========================================================================
 * Summary Card Props
 * ==========================================================================
 */
interface SummaryCardProps {
    title: string;
    value: number;
    icon: LucideIcon;
    color: string;
}

/**
 * ==========================================================================
 * Summary Card Component
 * ==========================================================================
 *
 * Komponen reusable untuk menampilkan statistik dashboard.
 *
 * Contoh:
 * - Total Prestasi
 * - Published
 * - Draft
 * - Total Kategori
 */
export default function SummaryCard({
    title,
    value,
    icon: Icon,
    color,
}: SummaryCardProps) {
    return (
        <div className="summary-card">
            <div
                className="summary-card-icon"
                style={{
                    backgroundColor: `${color}15`,
                    color,
                }}
            >
                <Icon size={28} strokeWidth={2} />
            </div>

            <div className="summary-card-content">
                <p className="summary-card-title">{title}</p>

                <h2 className="summary-card-value">{value}</h2>
            </div>
        </div>
    );
}
