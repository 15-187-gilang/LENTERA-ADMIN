import "./AchievementDetail.css";
import { Badge, Card } from "../../common";
import type { Achievement } from "../../../types/Api";
import { ImageOff } from "lucide-react";

interface AchievementDetailProps {
    achievement: Achievement;
}

export default function AchievementDetail({ achievement }: AchievementDetailProps) {
    const formatDate = (dateString: string) => {
        if (!dateString) return "-";
        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric"
        }).format(new Date(dateString));
    };

    return (
        <div className="achievement-detail">
            {/* 1. Thumbnail Prestasi */}
            <Card className="detail-card thumbnail-card">
                {achievement.thumbnail_url ? (
                    <img
                        src={achievement.thumbnail_url}
                        alt={achievement.title}
                        className="achievement-detail-thumbnail"
                    />
                ) : (
                    <div className="achievement-detail-no-image">
                        <ImageOff size={48} />
                        <span>Tidak ada thumbnail</span>
                    </div>
                )}
                <div className="thumbnail-title-overlay">
                    <h2>{achievement.title}</h2>
                </div>
            </Card>

            {/* 2. Informasi Utama (Grid) */}
            <Card className="detail-card info-card">
                <h3>Informasi Prestasi</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <span className="info-label">Kategori</span>
                        <span className="info-value">{achievement.category?.name || "-"}</span>
                    </div>
                    
                    <div className="info-item">
                        <span className="info-label">Penerima</span>
                        <span className="info-value">{achievement.recipient}</span>
                    </div>

                    <div className="info-item">
                        <span className="info-label">Penyelenggara</span>
                        <span className="info-value">{achievement.organizer || "-"}</span>
                    </div>

                    <div className="info-item">
                        <span className="info-label">Tingkat</span>
                        <span className="info-value">
                            {achievement.level ? <Badge variant="level" value={achievement.level} /> : "-"}
                        </span>
                    </div>

                    <div className="info-item">
                        <span className="info-label">Tanggal Prestasi</span>
                        <span className="info-value">{formatDate(achievement.achievement_date || "")}</span>
                    </div>

                    <div className="info-item">
                        <span className="info-label">Status</span>
                        <span className="info-value">
                            <Badge variant="status" value={achievement.is_published} />
                        </span>
                    </div>

                    <div className="info-item">
                        <span className="info-label">Unggulan</span>
                        <span className="info-value">
                            <Badge variant="featured" value={achievement.featured} />
                        </span>
                    </div>
                </div>
            </Card>

            {/* 3. Deskripsi */}
            <Card className="detail-card description-card">
                <h3>Deskripsi</h3>
                <div className="description-content">
                    {achievement.description ? (
                        <p>{achievement.description}</p>
                    ) : (
                        <p className="empty-text">Tidak ada deskripsi yang ditambahkan.</p>
                    )}
                </div>
            </Card>

            {/* 4. Metadata */}
            <Card className="detail-card meta-card">
                <div className="meta-grid">
                    <div className="meta-item">
                        <span className="meta-label">Dibuat Oleh</span>
                        <span className="meta-value">{achievement.creator?.name || "-"}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Tanggal Dibuat</span>
                        <span className="meta-value">{formatDate(achievement.created_at)}</span>
                    </div>
                    <div className="meta-item">
                        <span className="meta-label">Terakhir Diupdate</span>
                        <span className="meta-value">{formatDate(achievement.updated_at)}</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}
