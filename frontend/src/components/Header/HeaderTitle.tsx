interface HeaderTitleProps {
    title: string;
    subtitle: string;
    breadcrumb?: string;
}

/**
 * ------------------------------------------------------------------
 * Header Title
 * ------------------------------------------------------------------
 * Menampilkan judul dan subjudul halaman.
 * ------------------------------------------------------------------
 */
export default function HeaderTitle({ title, subtitle, breadcrumb }: HeaderTitleProps) {
    return (
        <div className="page-title-area">
            {breadcrumb && <span className="breadcrumb">{breadcrumb}</span>}
            <h1>{title}</h1>
            <p>{subtitle}</p>
        </div>
    );
}
