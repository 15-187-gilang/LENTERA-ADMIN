import "./FileUpload.css";
import { ImagePlus, Trash2, File as FileIcon } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { createPreview, revokePreview, formatFileSize } from "../../../../utils";
import * as pdfjsLib from "pdfjs-dist";

// Setup PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.mjs`;

interface FileUploadProps {
    value?: File;
    previewUrl?: string;
    accept?: string;
    maxSize?: number; // in MB
    disabled?: boolean;
    error?: boolean;
    onChange: (file?: File) => void;
    onThumbnailGenerated?: (thumbnail: string) => void;
}

export default function FileUpload({
    value,
    previewUrl,
    accept = "image/*, application/pdf",
    maxSize = 5,
    disabled = false,
    error = false,
    onChange,
    onThumbnailGenerated,
}: FileUploadProps) {
    const [preview, setPreview] = useState(previewUrl ?? "");
    const [isGenerating, setIsGenerating] = useState(false);

    useEffect(() => {
        if (!value) {
            setPreview(previewUrl ?? "");
            return;
        }

        if (value.type === "application/pdf") {
            // Preview is already generated during drop/select
            return;
        }

        const url = createPreview(value);
        setPreview(url);
        return () => revokePreview(url);
    }, [value, previewUrl]);

    const generatePdfThumbnail = async (file: File) => {
        let pdf: any = null;
        try {
            setIsGenerating(true);
            const arrayBuffer = await file.arrayBuffer();
            pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            const page = await pdf.getPage(1);
            
            const viewport = page.getViewport({ scale: 1.5 });
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            
            if (!context) return;
            
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            
            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };
            
            await page.render(renderContext).promise;
            page.cleanup();
            
            const dataUrl = canvas.toDataURL("image/jpeg", 0.8);
            setPreview(dataUrl);
            if (onThumbnailGenerated) {
                onThumbnailGenerated(dataUrl);
            }
        } catch (error) {
            console.error("Error generating PDF thumbnail:", error);
        } finally {
            if (pdf) {
                try { pdf.destroy(); } catch (e) {}
            }
            setIsGenerating(false);
        }
    };

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file = acceptedFiles[0];
        if (!file) return;

        onChange(file);

        if (file.type === "application/pdf") {
            await generatePdfThumbnail(file);
        } else if (onThumbnailGenerated) {
            // If it's an image and parent needs the data URL (though usually it doesn't)
            onThumbnailGenerated(""); 
        }
    }, [onChange, onThumbnailGenerated]);

    const acceptObj = accept.split(',').reduce((acc: any, curr) => {
        const trimmed = curr.trim();
        if (trimmed === 'image/*') acc['image/*'] = ['.png', '.jpg', '.jpeg', '.webp'];
        if (trimmed === 'application/pdf') acc['application/pdf'] = ['.pdf'];
        return acc;
    }, {});

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: acceptObj,
        maxSize: maxSize * 1024 * 1024,
        disabled,
        multiple: false
    });

    return (
        <div
            {...getRootProps()}
            className={[
                "file-upload",
                error ? "has-error" : "",
                disabled ? "disabled" : "",
                isDragActive ? "drag-active" : "",
            ].filter(Boolean).join(" ")}
        >
            <input {...getInputProps()} />
            
            {preview ? (
                <div className="preview">
                    <img src={preview} alt="preview" style={{ opacity: isGenerating ? 0.5 : 1 }} />
                    {isGenerating && <div className="generating-overlay">Memproses PDF...</div>}
                    <button
                        type="button"
                        onClick={(e) => {
                            e.stopPropagation();
                            onChange(undefined);
                            setPreview("");
                            if (onThumbnailGenerated) onThumbnailGenerated("");
                        }}
                    >
                        <Trash2 size={18} />
                    </button>
                </div>
            ) : (
                <div className="upload-prompt">
                    <ImagePlus size={34} />
                    <span>Upload Thumbnail atau PDF</span>
                    <small>Seret & lepas file di sini, atau klik untuk memilih</small>
                    <small>Maksimal {maxSize} MB</small>
                </div>
            )}

            {value && (
                <p className="file-info">
                    {value.type === "application/pdf" && <FileIcon size={14} className="inline mr-1" />}
                    {value.name} ({formatFileSize(value.size)})
                </p>
            )}
        </div>
    );
}