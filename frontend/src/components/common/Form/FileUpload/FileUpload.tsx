import "./FileUpload.css";

import {

    ImagePlus,

    Trash2,

} from "lucide-react";

import {

    useEffect,

    useState,

} from "react";

import {

    createPreview,

    revokePreview,

    formatFileSize,

} from "../../../../utils";

interface FileUploadProps {

    value?: File;

    previewUrl?: string;

    accept?: string;

    maxSize?: number;

    disabled?: boolean;

    error?: boolean;

    onChange: (file?: File) => void;

}

export default function FileUpload({

    value,

    previewUrl,

    accept = "image/*",

    maxSize = 2,

    disabled = false,

    error = false,

    onChange,

}: FileUploadProps) {

    const [preview, setPreview] =

        useState(previewUrl ?? "");

    useEffect(() => {

        if (!value) {

            setPreview(previewUrl ?? "");

            return;

        }

        const url = createPreview(value);

        setPreview(url);

        return () =>

            revokePreview(url);

    }, [value, previewUrl]);

    const handleChange = (

        event: React.ChangeEvent<HTMLInputElement>

    ) => {

        const file =

            event.target.files?.[0];

        if (!file) {

            return;

        }

        onChange(file);

    };

    return (

        <div

            className={[

                "file-upload",

                error

                    ? "has-error"

                    : "",

                disabled

                    ? "disabled"

                    : "",

            ]

                .filter(Boolean)

                .join(" ")}

        >

            {

                preview

                    ? (

                        <div className="preview">

                            <img

                                src={preview}

                                alt="preview"

                            />

                            <button

                                type="button"

                                onClick={() =>

                                    onChange(undefined)

                                }

                            >

                                <Trash2 size={18} />

                            </button>

                        </div>

                    )

                    : (

                        <label>

                            <ImagePlus size={34} />

                            <span>

                                Upload Thumbnail

                            </span>

                            <small>

                                Maksimal {maxSize} MB

                            </small>

                            <input

                                type="file"

                                accept={accept}

                                disabled={disabled}

                                onChange={handleChange}

                                hidden

                            />

                        </label>

                    )

            }

            {

                value && (

                    <p>

                        {

                            formatFileSize(

                                value.size

                            )

                        }

                    </p>

                )

            }

        </div>

    );

}