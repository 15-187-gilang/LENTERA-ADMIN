import "./AchievementForm.css";

import { useState } from "react";
import {
    Input,
    Select,
    Textarea,
    Button,
    FormField,
    FileUpload,
} from "../../common";

import { LEVEL_OPTIONS } from "../../../constants";
import { Images } from "lucide-react";

import type {
    AchievementFormProps,
} from "../../../types/AchievementForm";

import MediaPickerModal from "../../media/MediaPickerModal";
import type { Media } from "../../../types/Api";

export default function AchievementForm({

    values,

    errors,

    categories,

    loading = false,

    previewUrl,

    isPublished,

    onChange,

    onSubmit,

    onCancel,

}: AchievementFormProps) {

    const categoryOptions = categories.map((category) => ({
        label: category.name,
        value: category.id,
    }));

    const [pickerOpen, setPickerOpen] = useState(false);

    const handlePickMedia = (media: Media) => {
        onChange("thumbnail_media_url", media.thumbnail_url || media.url);
        onChange("thumbnail_source", "library");
        onChange("thumbnail", null);
    };

    const thumbnailSource = values.thumbnail_source ?? "upload";

    return (
        <>
            <form
                className="achievement-form"
                onSubmit={(event) => {

                    event.preventDefault();

                    onSubmit();

                }}
            >

            {/* =======================================================
                Thumbnail
            ======================================================= */}

            <div className="form-section">

                <h3>

                    Thumbnail

                </h3>

                <p>

                    Upload thumbnail baru atau pilih dari Media Library.

                </p>

                {/* Source Toggle */}
                <div className="thumbnail-source-toggle">
                    <button
                        type="button"
                        className={`source-btn ${thumbnailSource === "upload" ? "active" : ""}`}
                        onClick={() => {
                            onChange("thumbnail_source", "upload");
                            onChange("thumbnail_media_url", null);
                        }}
                    >
                        Upload Baru
                    </button>
                    <button
                        type="button"
                        className={`source-btn ${thumbnailSource === "library" ? "active" : ""}`}
                        onClick={() => {
                            onChange("thumbnail_source", "library");
                            onChange("thumbnail", null);
                        }}
                    >
                        Pilih dari Media Library
                    </button>
                </div>

                <FormField
                    label="Thumbnail"
                    error={errors.thumbnail}
                >
                    {thumbnailSource === "upload" ? (
                        <FileUpload
                            disabled={loading}
                            value={values.attachment || (values.thumbnail instanceof File ? values.thumbnail : undefined)}
                            previewUrl={previewUrl ?? undefined}
                            onChange={(file) => {
                                if (!file) {
                                    onChange("thumbnail", null);
                                    onChange("attachment", null);
                                } else if (file.type === "application/pdf") {
                                    onChange("attachment", file);
                                } else {
                                    onChange("thumbnail", file);
                                    onChange("attachment", null);
                                }
                            }}
                            onThumbnailGenerated={(dataUrl) => {
                                if (dataUrl) {
                                    onChange("thumbnail", dataUrl);
                                }
                            }}
                        />
                    ) : (
                        <div className="library-picker-area">
                            {values.thumbnail_media_url ? (
                                <div className="library-preview">
                                    <img src={values.thumbnail_media_url} alt="Thumbnail dari library" />
                                    <button
                                        type="button"
                                        className="library-change-btn"
                                        onClick={() => setPickerOpen(true)}
                                        disabled={loading}
                                    >
                                        Ganti Gambar
                                    </button>
                                </div>
                            ) : (
                                <button
                                    type="button"
                                    className="library-picker-btn"
                                    onClick={() => setPickerOpen(true)}
                                    disabled={loading}
                                >
                                    <Images size={36} />
                                    <span>Klik untuk memilih dari Media Library</span>
                                </button>
                            )}
                        </div>
                    )}

                </FormField>

            </div>

            {/* =======================================================
                Informasi Utama
            ======================================================= */}

            <div className="form-section">

                <h3>

                    Informasi Prestasi

                </h3>

                <div className="form-grid">

                    <FormField
                        label="Judul Prestasi"
                        required
                        error={errors.title}
                    >

                        <Input
                            value={values.title}
                            placeholder="Masukkan judul prestasi"
                            error={!!errors.title}
                            onChange={(e)=>

                                onChange(
                                    "title",
                                    e.target.value
                                )

                            }
                        />

                    </FormField>

                    <FormField
                        label="Penerima Prestasi"
                        required={isPublished !== false}
                        error={errors.recipient}
                    >

                        <Input
                            value={values.recipient}
                            placeholder="Masukkan nama penerima"
                            error={!!errors.recipient}
                            onChange={(e)=>

                                onChange(
                                    "recipient",
                                    e.target.value
                                )

                            }
                        />

                    </FormField>

                    <FormField
                        label="Penyelenggara"
                        required={isPublished !== false}
                        error={errors.organizer}
                    >

                        <Input
                            value={values.organizer}
                            placeholder="Masukkan penyelenggara"
                            error={!!errors.organizer}
                            onChange={(e)=>

                                onChange(
                                    "organizer",
                                    e.target.value
                                )

                            }
                        />

                    </FormField>

                </div>

            </div>

            <div className="form-section">

                <h3>

                    Informasi Tambahan

                </h3>

                <div className="form-grid">

                    <FormField
                        label="Kategori"
                        required={isPublished !== false}
                        error={errors.category_id}
                    >

                        <Select
                            value={values.category_id}
                            disabled={loading}
                            options={categoryOptions}
                            placeholder="Pilih kategori"
                            error={!!errors.category_id}
                            onChange={(e) =>

                                onChange(

                                    "category_id",

                                    e.target.value === ""

                                        ? ""

                                        : Number(e.target.value)

                                )

                            }
                        />

                    </FormField>

                    <FormField
                        label="Tingkat"
                        required={isPublished !== false}
                        error={errors.level}
                    >

                        <Select
                            value={values.level}
                            disabled={loading}
                            placeholder="Pilih tingkat"
                            options={LEVEL_OPTIONS}
                            error={!!errors.level}
                            onChange={(e)=>

                                onChange(
                                    "level",
                                    e.target.value
                                )

                            }
                        />

                    </FormField>

                    <FormField
                        label="Tanggal Prestasi"
                        required={isPublished !== false}
                        error={errors.achievement_date}
                    >

                        <Input
                            type="date"
                            value={values.achievement_date}
                            error={!!errors.achievement_date}
                            onChange={(e)=>

                                onChange(
                                    "achievement_date",
                                    e.target.value
                                )

                            }
                        />

                    </FormField>

                </div>

            </div>

            <div className="form-section">

                <h3>

                    Deskripsi

                </h3>

                <FormField
                    label="Deskripsi"
                    required={isPublished !== false}
                    error={errors.description}
                >

                    <Textarea
                        disabled={loading}
                        rows={8}
                        value={values.description}
                        placeholder="Tuliskan deskripsi prestasi..."
                        error={!!errors.description}
                        onChange={(e)=>

                            onChange(
                                "description",
                                e.target.value
                            )

                        }
                    />

                </FormField>

            </div>

            {/* =======================================================
                Action
            ======================================================= */}

            <div className="form-actions">

                <Button variant="secondary" type="button" onClick={onCancel}>
                    Batal
                </Button>

                {/* Simpan Draft: tampil saat mode Tambah ATAU prestasi masih draft */}
                {isPublished !== true && (
                    <Button
                        variant="outline"
                        type="button"
                        disabled={loading}
                        onClick={() => onSubmit(false)}
                    >
                        {loading ? "Menyimpan..." : "Simpan Draft"}
                    </Button>
                )}

                {/* Tombol Publikasi Adaptif */}
                {isPublished === true ? (
                    <>
                        {/* Sudah published → tawarkan jadikan draft */}
                        <Button
                            variant="danger"
                            type="button"
                            disabled={loading}
                            onClick={() => onSubmit(false)}
                        >
                            {loading ? "Memproses..." : "Jadikan Draft"}
                        </Button>
                        <Button
                            type="button"
                            disabled={loading}
                            onClick={() => onSubmit(true)}
                        >
                            {loading ? "Menyimpan..." : "Simpan Perubahan"}
                        </Button>
                    </>
                ) : (
                    /* Draft / mode Tambah → tawarkan publikasikan */
                    <Button
                        type="button"
                        disabled={loading}
                        onClick={() => onSubmit(true)}
                    >
                        {loading ? "Mempublikasikan..." : "Publikasikan"}
                    </Button>
                )}

            </div>

            </form>

            {/* Media Picker Modal */}
            <MediaPickerModal
                open={pickerOpen}
                onSelect={handlePickMedia}
                onClose={() => setPickerOpen(false)}
            />
        </>
    );

}