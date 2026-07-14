import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
    label: string;
    path: string;
    icon: LucideIcon;
}

export interface NavigationGroup {
    title: string;
    items: NavigationItem[];
}

export interface SidebarProps {
    isOpen: boolean;
    onToggle: () => void;
    onLogout: () => void;
}
