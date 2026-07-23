import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Grid3x3, Users, Settings } from 'lucide-react';
import '../style/Sidebar_Style.css';

const menuItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Aplikasi', path: '/applications', icon: Grid3x3 },
    { label: 'Pengguna', path: '/users', icon: Users },
    { label: 'Pengaturan', path: '/settings', icon: Settings },
];

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const location = useLocation();

    return (
        <aside className={`sidebar ${collapsed ? 'sidebar-collapsed' : ''}`}>
            <div className="sidebar-header">
                {!collapsed && <span className="sidebar-logo">App Catalog</span>}
                <button
                    className="sidebar-toggle"
                    onClick={() => setCollapsed(!collapsed)}
                    aria-label="Toggle sidebar"
                >
                    {collapsed ? '»' : '«'}
                </button>
            </div>

            <nav className="sidebar-nav">
                {menuItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`sidebar-item ${isActive ? 'active' : ''}`}
                        >
                            <span className="sidebar-icon">
                                <Icon size={19} strokeWidth={2} />
                            </span>
                            {!collapsed && <span className="sidebar-label">{item.label}</span>}
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Sidebar;