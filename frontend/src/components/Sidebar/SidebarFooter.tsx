import { LogOut } from "lucide-react";

interface SidebarFooterProps {
    onLogout: () => void;
}

export default function SidebarFooter({ onLogout }: SidebarFooterProps) {
    return (
        <div className="sidebar-footer">
            <button className="logout-btn" onClick={onLogout}>
                <LogOut size={20} strokeWidth={2.5} />

                <span>Logout</span>
            </button>
        </div>
    );
}
