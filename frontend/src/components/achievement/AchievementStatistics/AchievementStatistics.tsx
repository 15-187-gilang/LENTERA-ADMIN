import "./AchievementStatistics.css";

interface AchievementStatisticsProps {

    total: number;

    published: number;

    draft: number;

    currentPage: number;

    lastPage: number;

}

export default function AchievementStatistics({

    total,

    published,

    draft,

    currentPage,

    lastPage,

}: AchievementStatisticsProps) {

    return (

        <div className="achievement-statistics">

            <div className="stat-card">

                <span>Total Prestasi</span>

                <strong>{total}</strong>

            </div>

            <div className="stat-card">

                <span>Published</span>

                <strong>{published}</strong>

            </div>

            <div className="stat-card">

                <span>Draft</span>

                <strong>{draft}</strong>

            </div>

            <div className="stat-card">

                <span>Halaman</span>

                <strong>

                    {currentPage} / {lastPage}

                </strong>

            </div>

        </div>

    );

}