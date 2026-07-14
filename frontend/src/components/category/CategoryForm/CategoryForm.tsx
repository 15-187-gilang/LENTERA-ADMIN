import "./CategoryForm.css";
import React, { useState } from "react";
import FormField from "../../common/Form/FormField";
import Input from "../../common/Form/Input";
import Textarea from "../../common/Form/Textarea";
import Button from "../../common/Button";

interface CategoryFormProps {
    initialData?: {
        name: string;
        description: string;
    };
    loading?: boolean;
    onSubmit: (data: { name: string; description: string }) => void;
    onCancel: () => void;
}

export default function CategoryForm({
    initialData,
    loading = false,
    onSubmit,
    onCancel,
}: CategoryFormProps) {
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, description });
    };

    return (
        <form className="category-form" onSubmit={handleSubmit}>
            <div className="form-content">
                <FormField label="Nama Kategori" required>
                    <Input
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Contoh: Lomba Akademik"
                        disabled={loading}
                        required
                    />
                </FormField>

                <FormField label="Deskripsi">
                    <Textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Deskripsi singkat mengenai kategori ini..."
                        disabled={loading}
                        rows={4}
                    />
                </FormField>
            </div>

            <div className="form-actions">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={loading}
                >
                    Batal
                </Button>
                <Button
                    type="submit"
                    loading={loading}
                >
                    Simpan Kategori
                </Button>
            </div>
        </form>
    );
}
