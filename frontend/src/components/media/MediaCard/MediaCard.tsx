import "./MediaCard.css";
import { Eye, Link2, Trash2, FileImage } from "lucide-react";
import type { Media } from "../../../types/Api";
import { formatDate } from "../../../utils";
import Button from "../../common/Button";

interface MediaCardProps {
    media: Media;
    onPreview: (media: Media) => void;
    onDelete: (media: Media) => void;
    onCopyUrl: (url: string) => void;
}

export default function MediaCard({
    media,
    onPreview,
    onDelete,
    onCopyUrl,
}: MediaCardProps) {
    return (
        <div className="media-card">
            {/* Preview Area */}
            <div
                className="media-card-preview"
                onClick={() => onPreview(media)}
                title="Klik untuk melihat pratinjau"
            >
                <img
                    src={media.url}
                    alt={media.original_name}
                    loading="lazy"
                    onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                        (e.target as HTMLImageElement).nextElementSibling?.classList.add("show");
                    }}
                />
                <div className="media-card-placeholder">
                    <FileImage size={40} />
                </div>
                <div className="media-card-overlay">
                    <Eye size={20} />
                </div>
            </div>

            {/* Info Area */}
            <div className="media-card-info">
                <p className="media-card-name" title={media.original_name}>
                    {media.original_name}
                </p>
                <div className="media-card-meta">
                    <span className="media-badge">{media.extension}</span>
                    <span>{media.size_formatted}</span>
                </div>
                <p className="media-card-date">{formatDate(media.created_at)}</p>
            </div>

            {/* Actions */}
            <div className="media-card-actions">
                <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Eye size={13} />}
                    onClick={() => onPreview(media)}
                    title="Pratinjau"
                >
                    Preview
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    leftIcon={<Link2 size={13} />}
                    onClick={() => onCopyUrl(media.url)}
                    title="Salin URL"
                >
                    Copy URL
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    leftIcon={<Trash2 size={13} />}
                    onClick={() => onDelete(media)}
                    title="Hapus"
                >
                    Hapus
                </Button>
            </div>
        </div>
    );
}
