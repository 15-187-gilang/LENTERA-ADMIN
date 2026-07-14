import "./MediaGrid.css";
import type { Media } from "../../../types/Api";
import MediaCard from "../MediaCard";
import EmptyState from "../../common/EmptyState";
import { Images } from "lucide-react";

interface MediaGridProps {
    media: Media[];
    loading: boolean;
    onPreview: (media: Media) => void;
    onDelete: (media: Media) => void;
    onCopyUrl: (url: string) => void;
}

export default function MediaGrid({
    media,
    loading,
    onPreview,
    onDelete,
    onCopyUrl,
}: MediaGridProps) {
    if (loading) {
        return (
            <div className="media-grid-loading">
                <div className="spinner"></div>
                <p>Memuat media...</p>
            </div>
        );
    }

    if (media.length === 0) {
        return (
            <EmptyState
                icon={<Images size={48} />}
                title="Belum Ada Media"
                description="Belum ada file gambar yang diunggah. Klik 'Upload Media' untuk menambahkan gambar baru."
            />
        );
    }

    return (
        <div className="media-grid">
            {media.map((item) => (
                <MediaCard
                    key={item.id}
                    media={item}
                    onPreview={onPreview}
                    onDelete={onDelete}
                    onCopyUrl={onCopyUrl}
                />
            ))}
        </div>
    );
}
