import { Inbox } from "lucide-react";

import "./EmptyState.css";

import React from "react";

interface EmptyStateProps {
    title?: string;

    description?: string;
    
    icon?: React.ReactNode;
}

export default function EmptyState({
    title = "Belum Ada Data",

    description = "Data yang dicari belum tersedia.",
    
    icon,
}: EmptyStateProps) {
    return (
        <div className="empty-state">
            {icon || <Inbox size={64} strokeWidth={1.5} />}

            <h2>{title}</h2>

            <p>{description}</p>
        </div>
    );
}
