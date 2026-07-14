import { Menu } from "lucide-react";
import HeaderTitle from "./HeaderTitle";
import "./Header.css";

import type { HeaderProps } from "./types";

export default function Header({ title, subtitle, breadcrumb, onToggleSidebar }: HeaderProps) {
    return (
        <header className="top-header">
            <div className="header-left">
                <button
                    className="mobile-menu-toggle"
                    onClick={onToggleSidebar}
                    aria-label="Toggle Sidebar"
                >
                    <Menu size={24} />
                </button>
                <HeaderTitle title={title} subtitle={subtitle} breadcrumb={breadcrumb} />
            </div>
        </header>
    );
}
