import "./PreviewModal.css";
import { X, Link2, Download, Trash2, FileText } from "lucide-react";
import type { Media } from "../../../types/Api";
import { formatDate } from "../../../utils";
import Button from "../../common/Button";
import toast from "react-hot-toast";

interface PreviewModalProps {
    media: Media | null;
    open: boolean;
    onClose: () => void;
    onDelete: (media: Media) => void;
}

export default function PreviewModal({
    media,
    open,
    onClose,
    onDelete,
}: PreviewModalProps) {
    const isImage = media?.mime_type?.startsWith("image/") || ["jpg", "jpeg", "png", "gif", "webp"].includes(media?.extension?.toLowerCase() || "");
    const isPdf = media?.extension?.toLowerCase() === "pdf" || media?.mime_type === "application/pdf";
    const previewUrl = media?.thumbnail_url || media?.url;

    if (!open || !media) return null;

    const handleCopyUrl = async () => {
        try {
            await navigator.clipboard.writeText(media.url);
            toast.success("URL berhasil disalin!");
        } catch {
            toast.error("Gagal menyalin URL.");
        }
    };

    const handleDownload = () => {
        const a = document.createElement("a");
        a.href = media.url;
        a.download = media.original_name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="preview-modal-overlay" onClick={handleOverlayClick}>
            <div className="preview-modal">
                {/* Header */}
                <div className="preview-modal-header">
                    <h2>Pratinjau Media</h2>
                    <button className="preview-modal-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="preview-modal-body">
                    {/* Image */}
                    <div className="preview-image-area">
                        {isImage || (isPdf && media?.thumbnail_url) ? (
                            <img src={previewUrl} alt={media?.original_name} />
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', minHeight: '200px', backgroundColor: '#f8fafc', color: '#64748b', gap: '8px' }}>
                                <>
                                    <FileText size={48} />
                                    <p>Preview tidak tersedia</p>
                                </>
                            </div>
                        )}
                    </div>

                    {/* Metadata */}
                    <div className="preview-metadata">
                        <div className="preview-meta-row">
                            <span className="meta-label">Nama File</span>
                            <span className="meta-value">{media.original_name}</span>
                        </div>
                        <div className="preview-meta-row">
                            <span className="meta-label">Tipe</span>
                            <span className="meta-value">{media.mime_type}</span>
                        </div>
                        <div className="preview-meta-row">
                            <span className="meta-label">Ukuran</span>
                            <span className="meta-value">{media.size_formatted}</span>
                        </div>
                        <div className="preview-meta-row">
                            <span className="meta-label">Tanggal Upload</span>
                            <span className="meta-value">{formatDate(media.created_at)}</span>
                        </div>
                        {media.uploaded_by && (
                            <div className="preview-meta-row">
                                <span className="meta-label">Diunggah oleh</span>
                                <span className="meta-value">{media.uploaded_by.name}</span>
                            </div>
                        )}
                        <div className="preview-meta-row">
                            <span className="meta-label">URL</span>
                            <span className="meta-value meta-url" title={media.url}>
                                {media.url}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="preview-modal-footer">
                    <Button
                        variant="danger"
                        leftIcon={<Trash2 size={16} />}
                        onClick={() => { onDelete(media); onClose(); }}
                    >
                        Hapus
                    </Button>

                    <div className="footer-right">
                        <Button
                            variant="outline"
                            leftIcon={<Download size={16} />}
                            onClick={handleDownload}
                        >
                            Download
                        </Button>
                        <Button
                            leftIcon={<Link2 size={16} />}
                            onClick={handleCopyUrl}
                        >
                            Copy URL
                        </Button>
                        <Button variant="outline" onClick={onClose}>
                            Tutup
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
