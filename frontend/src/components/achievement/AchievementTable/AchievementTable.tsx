import "./AchievementTable.css";

import type { Achievement } from "../../../types/Api";

import AchievementTableRow from "../AchievementTableRow";

import Loading from "../../common/Loading";

import EmptyState from "../../common/EmptyState";

import ErrorState from "../../common/ErrorState";

interface AchievementTableProps {

    achievements: Achievement[];

    loading: boolean;

    error: string | null;

    onDelete: (id: number) => void;

    onRefresh: () => void;

}

export default function AchievementTable({

    achievements,

    loading,

    error,

    onDelete,

    onRefresh,

}: AchievementTableProps) {
    

    /**
     * ============================================================
     * Loading
     * ============================================================
     */

    if (loading) {

        return (

            <Loading
                
                text="Sedang mengambil data prestasi..."
            />

        );

    }

    /**
     * ============================================================
     * Error
     * ============================================================
     */

    if (error) {

        return (

            <ErrorState

                message={error}

                onRetry={onRefresh}

            />

        );

    }

    /**
     * ============================================================
     * Empty
     * ============================================================
     */
    

    if (achievements.length === 0) {

        return (

            <EmptyState

                title="Belum Ada Prestasi"

                description="Silakan tambahkan data prestasi terlebih dahulu."

            />

        );

    }

    /**
     * ============================================================
     * Table
     * ============================================================
     */

    return (

        <div className="achievement-table-wrapper">

            <table className="achievement-table">

                <thead>

                    <tr>

                        <th>Prestasi</th>

                        <th>Kategori</th>

                        <th>Tingkat</th>

                        <th>Tanggal</th>

                        <th>Aksi</th>

                    </tr>

                </thead>

                <tbody>

                    {

                        achievements.map((achievement) => (

                            <AchievementTableRow

                                key={achievement.id}

                                achievement={achievement}

                                onDelete={onDelete}

                            />

                        ))

                    }

                </tbody>

            </table>

        </div>

    );

}