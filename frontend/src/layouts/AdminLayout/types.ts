import type { ReactNode } from "react";

export interface AdminLayoutProps {
    /**
     * Judul halaman.
     * Contoh:
     * Dashboard Utama
     * Daftar Prestasi
     */
    title: string;

    /**
     * Breadcrumb teks (opsional).
     * Contoh: Kelola Akun Administrator > Profil Saya
     */
    breadcrumb?: string;

    /**
     * Subjudul halaman.
     * Contoh:
     * Panel Admin
     * Master Data
     */
    subtitle: string;

    /**
     * Konten utama halaman.
     */
    children: ReactNode;
}
