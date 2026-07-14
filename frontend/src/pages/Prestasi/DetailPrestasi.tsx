import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import achievementApi from "../../api/achievementApi";
import type { Achievement } from "../../types/Api";
import { Loading, ErrorState, Button } from "../../components/common";
import AchievementDetail from "../../components/achievement/AchievementDetail";
import { ArrowLeft, Edit2 } from "lucide-react";

export default function DetailPrestasi() {
    const { id } = useParams();
    const achievementId = Number(id);
    const navigate = useNavigate();

    const [achievement, setAchievement] = useState<Achievement | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function loadAchievement() {
            if (!achievementId) return;

            try {
                setLoading(true);
                setError(null);
                const data = await achievementApi.show(achievementId);
                setAchievement(data);
            } catch (err: any) {
                console.error("Gagal memuat detail prestasi:", err);
                setError(
                    err?.response?.data?.message ??
                    "Data prestasi tidak ditemukan atau terjadi kesalahan server."
                );
            } finally {
                setLoading(false);
            }
        }

        loadAchievement();
    }, [achievementId]);

    function handleBack() {
        navigate("/prestasi");
    }

    function handleEdit() {
        navigate(`/prestasi/${achievementId}/edit`);
    }

    if (loading) {
        return (
            <AdminLayout title="Detail Prestasi" subtitle="Memuat informasi prestasi...">
                <Loading text="Mengambil data prestasi..." />
            </AdminLayout>
        );
    }

    if (error || !achievement) {
        return (
            <AdminLayout title="Detail Prestasi" subtitle="Terjadi kesalahan">
                <ErrorState message={error || "Prestasi tidak ditemukan."} onRetry={() => window.location.reload()} />
                <div style={{ marginTop: "24px", display: "flex", justifyContent: "center" }}>
                    <Button variant="secondary" onClick={handleBack}>
                        <ArrowLeft size={16} /> Kembali ke Daftar
                    </Button>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout
            title="Detail Prestasi"
            subtitle={`Informasi lengkap untuk prestasi: ${achievement.title}`}
        >
            <AchievementDetail achievement={achievement} />

            <div style={{ display: "flex", gap: "16px", marginTop: "32px", borderTop: "1px solid #e5e7eb", paddingTop: "24px" }}>
                <Button variant="secondary" onClick={handleBack}>
                    <ArrowLeft size={16} />
                    Kembali
                </Button>
                <Button variant="primary" onClick={handleEdit}>
                    <Edit2 size={16} />
                    Edit Prestasi
                </Button>
            </div>
        </AdminLayout>
    );
}
