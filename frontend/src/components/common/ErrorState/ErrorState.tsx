import { AlertTriangle } from "lucide-react";

import Button from "../Button";

import "./ErrorState.css";

/**
 * ==========================================================================
 * Error State Props
 * ==========================================================================
 */
interface ErrorStateProps {
    message?: string;

    onRetry?: () => void;
}

/**
 * ==========================================================================
 * Error State Component
 * ==========================================================================
 *
 * Ditampilkan ketika terjadi kesalahan saat mengambil data.
 */
export default function ErrorState({
    message = "Terjadi kesalahan saat memuat data.",

    onRetry,
}: ErrorStateProps) {
    return (
        <div className="error-state">
            <AlertTriangle
                size={64}

                strokeWidth={1.5}
            />

            <h2>Terjadi Kesalahan</h2>

            <p>{message}</p>

            {onRetry && (
                <Button
                    variant="primary"

                    onClick={onRetry}
                >
                    Coba Lagi
                </Button>
            )}
        </div>
    );
}
