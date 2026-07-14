import { Inbox } from "lucide-react";

import "./EmptyState.css";

interface EmptyStateProps {
    title?: string;

    description?: string;
}

export default function EmptyState({
    title = "Belum Ada Data",

    description = "Data yang dicari belum tersedia.",
}: EmptyStateProps) {
    return (
        <div className="empty-state">
            <Inbox size={64} strokeWidth={1.5} />

            <h2>{title}</h2>

            <p>{description}</p>
        </div>
    );
}
