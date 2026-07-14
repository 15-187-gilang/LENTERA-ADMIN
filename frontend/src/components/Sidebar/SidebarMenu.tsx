import { NavLink } from "react-router-dom";

import { navigationMenus } from "../../constants/navigation";

export default function SidebarMenu() {
    return (
        <nav className="sidebar-nav">
            {navigationMenus.map((group) => (
                <div key={group.title} className="nav-group">
                    <span className="nav-label">{group.title}</span>

                    {group.items.map((item) => {
                        const Icon = item.icon;

                        return (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                end
                                className={({ isActive }) =>
                                    isActive ? "nav-item active" : "nav-item"
                                }
                            >
                                <Icon size={20} />

                                <span>{item.label}</span>
                            </NavLink>
                        );
                    })}
                </div>
            ))}
        </nav>
    );
}
