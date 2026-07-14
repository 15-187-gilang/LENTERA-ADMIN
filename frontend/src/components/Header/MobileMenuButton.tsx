import { Menu } from "lucide-react";

interface MobileMenuButtonProps {
    onClick: () => void;
}

/**
 * ------------------------------------------------------------------
 * Mobile Menu Button
 * ------------------------------------------------------------------
 * Tombol hamburger yang hanya digunakan pada
 * tampilan mobile untuk membuka sidebar.
 * ------------------------------------------------------------------
 */
export default function MobileMenuButton({ onClick }: MobileMenuButtonProps) {
    return (
        <button
            type="button"
            className="mobile-menu-btn"
            onClick={onClick}
            aria-label="Toggle Sidebar"
        >
            <Menu size={24} />
        </button>
    );
}
