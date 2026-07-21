import logoLentera from "../../assets/lentera.png";

export default function SidebarHeader() {
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
                    <p>ADMIN</p>
                </div>
            </div>
        </div>
    );
}
