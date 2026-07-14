import { useCallback, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import Header from "../../components/Header/Header";
import Sidebar from "../../components/Sidebar/Sidebar";
import useAuth from "../../hooks/useAuth";

import "./AdminLayout.css";

import type { AdminLayoutProps } from "./types";

export default function AdminLayout({
    title,
    subtitle,
    breadcrumb,
    children,
}: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(() => {
        if (window.innerWidth <= 1024) return false;
        const saved = localStorage.getItem("sidebar_open");
        return saved !== null ? saved === "true" : true;
    });
    const { logout } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Auto-close sidebar on mobile when navigating
    useEffect(() => {
        if (window.innerWidth <= 1024) {
            setIsSidebarOpen(false);
        }
    }, [location.pathname]);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen((isOpen) => {
            const newValue = !isOpen;
            localStorage.setItem("sidebar_open", String(newValue));
            return newValue;
        });
    }, []);

    const handleLogout = useCallback(async () => {
        await logout();
        navigate("/", { replace: true });
    }, [logout, navigate]);

    return (
        <div className="admin-layout">
            <Sidebar
                isOpen={isSidebarOpen}
                onToggle={toggleSidebar}
                onLogout={handleLogout}
            />

            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div 
                    className="sidebar-overlay"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            <main className="main-content">
                <Header title={title} subtitle={subtitle} breadcrumb={breadcrumb} onToggleSidebar={toggleSidebar} />

                <section className="page-content">{children}</section>
            </main>
        </div>
    );
}
