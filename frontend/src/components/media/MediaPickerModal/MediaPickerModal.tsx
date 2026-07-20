import "./MediaPickerModal.css";
import { useState, useEffect } from "react";
import { X, Search, Check } from "lucide-react";
import type { Media } from "../../../types/Api";
import useMedia from "../../../hooks/useMedia";
import useDebounce from "../../../hooks/useDebounce";
import Button from "../../common/Button";
import Input from "../../common/Form/Input";

interface MediaPickerModalProps {
    open: boolean;
    onSelect: (media: Media) => void;
    onClose: () => void;
}

export default function MediaPickerModal({
    open,
    onSelect,
    onClose,
}: MediaPickerModalProps) {
    const { media, loading, filters, setSearchFilter, changePage, pagination } = useMedia();
    const [search, setSearch] = useState("");
    const [selected, setSelected] = useState<Media | null>(null);
    const debouncedSearch = useDebounce(search, 500);

    useEffect(() => {
        setSearchFilter(debouncedSearch);
    }, [debouncedSearch]);

    if (!open) return null;

    const handleConfirm = () => {
        if (selected) {
            onSelect(selected);
            onClose();
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return (
        <div className="media-picker-overlay" onClick={handleOverlayClick}>
            <div className="media-picker-modal">
                {/* Header */}
                <div className="media-picker-header">
                    <div>
                        <h2>Pilih dari Media Library</h2>
                        <p>Klik gambar untuk memilihnya sebagai thumbnail.</p>
                    </div>
                    <button className="media-picker-close" onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                {/* Search */}
                <div className="media-picker-search">
                    <Input
                        value={search}
                        leftIcon={<Search size={16} />}
                        placeholder="Cari nama file..."
                        onChange={(e) => setSearch(e.target.value)}
                        disabled={loading}
                    />
                </div>

                {/* Grid */}
                <div className="media-picker-body">
                    {loading ? (
                        <div className="picker-loading">
                            <div className="spinner"></div>
                            <p>Memuat media...</p>
                        </div>
                    ) : media.length === 0 ? (
                        <div className="picker-empty">
                            <p>Tidak ada media ditemukan.</p>
                        </div>
                    ) : (
                        <div className="picker-grid">
                            {media.map((item) => (
                                <div
                                    key={item.id}
                                    className={`picker-item ${selected?.id === item.id ? "selected" : ""}`}
                                    onClick={() => setSelected(item)}
                                    title={item.original_name}
                                >
                                    <img src={item.thumbnail_url || item.url} alt={item.original_name} loading="lazy" />
                                    {selected?.id === item.id && (
                                        <div className="picker-check">
                                            <Check size={16} />
                                        </div>
                                    )}
                                    <p className="picker-item-name">{item.original_name}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Pagination */}
                {pagination && pagination.last_page > 1 && (
                    <div className="picker-pagination">
                        {Array.from({ length: pagination.last_page }, (_, i) => i + 1).map((page) => (
                            <button
                                key={page}
                                className={`page-btn ${filters.page === page ? "active" : ""}`}
                                onClick={() => changePage(page)}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                )}

                {/* Footer */}
                <div className="media-picker-footer">
                    {selected && (
                        <span className="selected-info">
                            Dipilih: <strong>{selected.original_name}</strong>
                        </span>
                    )}
                    <div className="picker-footer-actions">
                        <Button variant="outline" onClick={onClose}>
                            Batal
                        </Button>
                        <Button onClick={handleConfirm} disabled={!selected}>
                            Gunakan Gambar Ini
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
