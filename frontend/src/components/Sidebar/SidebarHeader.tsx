import { Menu } from "lucide-react";

import logoLentera from "../../../src/assets/logo-lentera.png";

interface SidebarHeaderProps {
    onToggle: () => void;
}

export default function SidebarHeader({ onToggle }: SidebarHeaderProps) {
    return (
        <div className="sidebar-header">
            <div className="brand-info">
                <img
                    src={logoLentera}
                    alt="Logo LENTERA"
                    className="sidebar-logo"
                />

                <div className="brand-text">
                    <h2>LENTERA</h2>
                    <p>Admin Console</p>
                </div>
            </div>

            <button
                className="menu-toggle-btn"
                onClick={onToggle}
                aria-label="Toggle Sidebar"
            >
                <Menu size={24} />
            </button>
        </div>
    );
}
