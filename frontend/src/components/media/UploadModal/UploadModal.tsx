import "./UploadModal.css";
import { useState, useRef } from "react";
import { X, Upload, ImagePlus } from "lucide-react";
import Button from "../../common/Button";

interface UploadModalProps {
    open: boolean;
    uploading: boolean;
    onUpload: (file: File) => void;
    onClose: () => void;
}

export default function UploadModal({
    open,
    uploading,
    onUpload,
    onClose,
}: UploadModalProps) {
    const [dragOver, setDragOver] = useState(false);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    if (!open) return null;

    const handleFile = (file: File) => {
        setSelectedFile(file);
        const url = URL.createObjectURL(file);
        setPreview(url);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith("image/")) {
            handleFile(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            onUpload(selectedFile);
        }
    };

    const handleClose = () => {
        setSelectedFile(null);
        setPreview(null);
        onClose();
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) handleClose();
    };

    return (
        <div className="upload-modal-overlay" onClick={handleOverlayClick}>
            <div className="upload-modal">
                {/* Header */}
                <div className="upload-modal-header">
                    <h2>Upload Gambar</h2>
                    <button
                        className="upload-modal-close"
                        onClick={handleClose}
                        disabled={uploading}
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Body */}
                <div className="upload-modal-body">
                    {preview ? (
                        <div className="upload-preview">
                            <img src={preview} alt="preview" />
                            <div className="upload-preview-info">
                                <p className="file-name">{selectedFile?.name}</p>
                                <p className="file-size">
                                    {selectedFile
                                        ? (selectedFile.size / 1024).toFixed(1) + " KB"
                                        : ""}
                                </p>
                            </div>
                            <button
                                className="upload-preview-remove"
                                onClick={() => {
                                    setSelectedFile(null);
                                    setPreview(null);
                                }}
                                disabled={uploading}
                            >
                                <X size={16} /> Ganti Gambar
                            </button>
                        </div>
                    ) : (
                        <div
                            className={`upload-dropzone ${dragOver ? "drag-over" : ""}`}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={handleDrop}
                            onClick={() => inputRef.current?.click()}
                        >
                            <ImagePlus size={48} />
                            <p className="dropzone-title">Seret & Lepas Gambar di Sini</p>
                            <p className="dropzone-subtitle">atau klik untuk memilih file</p>
                            <p className="dropzone-hint">JPG, PNG, WEBP, GIF • Maks. 5 MB</p>
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleInputChange}
                            />
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="upload-modal-footer">
                    <Button variant="outline" onClick={handleClose} disabled={uploading}>
                        Batal
                    </Button>
                    <Button
                        leftIcon={<Upload size={16} />}
                        onClick={handleUpload}
                        disabled={!selectedFile || uploading}
                        loading={uploading}
                    >
                        Upload
                    </Button>
                </div>
            </div>
        </div>
    );
}
