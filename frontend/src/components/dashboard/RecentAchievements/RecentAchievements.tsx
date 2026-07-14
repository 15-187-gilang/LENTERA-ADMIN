import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import Card from "../../common/Card";

import type { RecentAchievement } from "../../../types/Dashboard";

import RecentAchievementCard from "./RecentAchievementCard";

import "./RecentAchievements.css";

interface RecentAchievementsProps {
    achievements: RecentAchievement[];
}

export default function RecentAchievements({
    achievements,
}: RecentAchievementsProps) {
    /**
     * Empty State
     */
    if (achievements.length === 0) {
        return (
            <Card>
                <div className="recent-empty">
                    <h3>Belum Ada Prestasi</h3>

                    <p>Prestasi terbaru akan muncul di sini.</p>
                </div>
            </Card>
        );
    }

    return (
        <section className="recent-achievements">
            <div className="section-header">
                <div className="section-title">
                    <h2>Prestasi Terbaru</h2>

                    <p>Prestasi yang baru ditambahkan.</p>
                </div>

                <Link to="/prestasi" className="see-all-btn">
                    Lihat Semua
                    <ArrowRight size={18} />
                </Link>
            </div>

            <div className="achievement-grid">
                {achievements.map((achievement) => (
                    <RecentAchievementCard
                        key={achievement.id}

                        achievement={achievement}
                    />
                ))}
            </div>
        </section>
    );
}
