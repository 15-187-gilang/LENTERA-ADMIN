import "./UploadModal.css";
import { useState, useRef, useEffect } from "react";
import { X, Upload, FilePlus } from "lucide-react";
import * as pdfjsLib from "pdfjs-dist";

// Setup PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;
import Button from "../../common/Button";

interface UploadModalProps {
    open: boolean;
    uploading: boolean;
    onUpload: (file: File, thumbnail?: File) => void;
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
    const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
    const [generatingPdf, setGeneratingPdf] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (!open) {
            setSelectedFile(null);
            setPreview(null);
            setThumbnailFile(null);
            setGeneratingPdf(false);
            setDragOver(false);
            if (inputRef.current) {
                inputRef.current.value = "";
            }
        }
    }, [open]);

    if (!open) return null;

    const handleFile = async (file: File) => {
        setSelectedFile(file);
        
        if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) {
            setGeneratingPdf(true);
            let pdf: any = null;
            try {
                const arrayBuffer = await file.arrayBuffer();
                pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
                const page = await pdf.getPage(1);
                
                const viewport = page.getViewport({ scale: 1.5 });
                const canvas = document.createElement("canvas");
                const context = canvas.getContext("2d");
                
                if (context) {
                    canvas.height = viewport.height;
                    canvas.width = viewport.width;
                    
                    const renderContext: any = {
                        canvasContext: context,
                        viewport: viewport,
                    };
                    
                    await page.render(renderContext).promise;
                    page.cleanup();
                    
                    canvas.toBlob((blob) => {
                        if (blob) {
                            const file = new File([blob], "thumbnail.jpg", { type: "image/jpeg" });
                            setThumbnailFile(file);
                        }
                    }, "image/jpeg", 0.8);
                    
                    setPreview(canvas.toDataURL("image/jpeg", 0.8));
                }
            } catch (error) {
                console.error("Error generating PDF preview:", error);
                setPreview(null);
            } finally {
                if (pdf) {
                    try { pdf.destroy(); } catch (e) {}
                }
                setGeneratingPdf(false);
            }
        } else {
            const url = URL.createObjectURL(file);
            setPreview(url);
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
        const file = e.dataTransfer.files[0];
        if (file && (file.type.startsWith("image/") || file.type === "application/pdf")) {
            handleFile(file);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) handleFile(file);
    };

    const handleUpload = () => {
        if (selectedFile) {
            onUpload(selectedFile, thumbnailFile || undefined);
        }
    };

    const handleClose = () => {
        setSelectedFile(null);
        setPreview(null);
        setThumbnailFile(null);
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
                    <h2>Upload Media</h2>
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
                    {preview || generatingPdf ? (
                        <div className="upload-preview">
                            {generatingPdf ? (
                                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '160px', background: '#f1f5f9', width: '100%', color: '#64748b' }}>
                                    <p>Memproses PDF...</p>
                                </div>
                            ) : (
                                <img src={preview!} alt="preview" />
                            )}
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
                                    setThumbnailFile(null);
                                }}
                                disabled={uploading || generatingPdf}
                            >
                                <X size={16} /> Ganti File
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
                            <FilePlus size={48} />
                            <p className="dropzone-title">Seret & Lepas Media di Sini</p>
                            <p className="dropzone-subtitle">atau klik untuk memilih file</p>
                            <p className="dropzone-hint">JPG, PNG, WEBP, GIF, PDF • Maks. 5 MB</p>
                            <input
                                ref={inputRef}
                                type="file"
                                accept="image/*, application/pdf"
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
