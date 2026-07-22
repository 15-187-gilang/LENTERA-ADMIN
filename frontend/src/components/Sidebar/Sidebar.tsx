import "./Sidebar.css";

import SidebarHeader from "./SidebarHeader";
import SidebarMenu from "./SidebarMenu";
import SidebarFooter from "./SidebarFooter";

import type { SidebarProps } from "./Types";

/**
 * Sidebar digunakan oleh seluruh halaman admin.
 *
 * Komponen ini hanya mengatur struktur layout sidebar.
 * Seluruh data menu berasal dari constants/navigation.ts.
 */
export default function Sidebar({ isOpen, onLogout }: SidebarProps) {
    return (
        <aside className={`sidebar ${isOpen ? "" : "closed"}`}>
            <SidebarHeader />

            <SidebarMenu />

            <SidebarFooter onLogout={onLogout} />
        </aside>
    );
}
