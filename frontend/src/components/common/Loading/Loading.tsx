import "./Loading.css";

/**
 * ==========================================================================
 * Loading Props
 * ==========================================================================
 */
interface LoadingProps {
    text?: string;
}

/**
 * ==========================================================================
 * Loading Component
 * ==========================================================================
 *
 * Digunakan ketika data masih dimuat dari API.
 */
export default function Loading({ text = "Memuat data..." }: LoadingProps) {
    return (
        <div className="loading-container">
            <div className="loading-spinner" />

            <p>{text}</p>
        </div>
    );
}
