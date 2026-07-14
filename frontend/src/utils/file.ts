/**
 * ============================================================================
 * File Helper
 * ============================================================================
 */

export function formatFileSize(

    bytes: number

): string {

    if (bytes < 1024) {

        return `${bytes} B`;

    }

    if (bytes < 1024 * 1024) {

        return `${(

            bytes /

            1024

        ).toFixed(2)} KB`;

    }

    if (bytes < 1024 * 1024 * 1024) {

        return `${(

            bytes /

            1024 /

            1024

        ).toFixed(2)} MB`;

    }

    return `${(

        bytes /

        1024 /

        1024 /

        1024

    ).toFixed(2)} GB`;

}

export function getExtension(

    filename: string

): string {

    return filename

        .split(".")

        .pop()

        ?.toLowerCase() ?? "";

}

export function isImage(

    file: File

): boolean {

    return file.type.startsWith(

        "image/"

    );

}

export function createPreview(

    file: File

): string {

    return URL.createObjectURL(file);

}

export function revokePreview(

    url: string

): void {

    URL.revokeObjectURL(url);

}