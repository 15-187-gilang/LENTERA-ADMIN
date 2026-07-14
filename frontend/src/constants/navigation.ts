import {
    BookOpen,
    FolderTree,
    Image,
    LayoutDashboard,
    Plus,
    User,
    type LucideIcon,
} from "lucide-react";
import { ROUTES } from "../constants";

/* ==========================================================================
 * Types
 * ==========================================================================
 * File ini menjadi pusat konfigurasi seluruh menu sidebar.
 * Jika ingin menambah, menghapus, atau mengubah menu,
 * cukup lakukan perubahan di file ini tanpa mengubah Sidebar.tsx.
 * ========================================================================== */

export interface NavigationItem {
    /**
     * Nama menu yang ditampilkan pada sidebar.
     */
    label: string;

    /**
     * Route React Router.
     */
    path: string;

    /**
     * Icon dari lucide-react.
     */
    icon: LucideIcon;

    /**
     * Digunakan untuk pengembangan berikutnya.
     * Contoh:
     *  - dashboard.view
     *  - achievement.create
     *  - category.manage
     */
    permission?: string;

    /**
     * Menentukan apakah menu ditampilkan di sidebar.
     */
    visible?: boolean;
}

export interface NavigationGroup {
    /**
     * Judul kelompok menu.
     */
    title: string;

    /**
     * Daftar menu dalam kelompok tersebut.
     */
    items: NavigationItem[];
}

/* ==========================================================================
 * Sidebar Navigation
 * ==========================================================================
 */

export const navigationMenus: NavigationGroup[] = [
    {
        title: "Utama",

        items: [
            {
                label: "Dashboard",
                path: ROUTES.dashboard,
                icon: LayoutDashboard,
                permission: "dashboard.view",
                visible: true,
            },
            {
                label: "Daftar Prestasi",
                path: ROUTES.achievements,
                icon: BookOpen,
                permission: "achievement.view",
                visible: true,
            },
            {
                label: "Tambah Prestasi",
                path: ROUTES.achievementCreate,
                icon: Plus,
                permission: "achievement.create",
                visible: true,
            },
        ],
    },

    {
        title: "Master Data",

        items: [
            {
                label: "Kategori",
                path: ROUTES.categories,
                icon: FolderTree,
                permission: "category.manage",
                visible: true,
            },
            {
                label: "Media Library",
                path: ROUTES.media,
                icon: Image,
                permission: "media.manage",
                visible: true,
            },
        ],
    },

    {
        title: "Pengaturan",

        items: [
            {
                label: "Profil Admin",
                path: ROUTES.profile,
                icon: User,
                permission: "profile.manage",
                visible: true,
            },
        ],
    },
];
