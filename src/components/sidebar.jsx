import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    Grid3x3,
    Network,
    Users,
    FileText,
    Database,
    ShieldCheck,
    KeyRound,
    Inbox,
    MessageSquare,
} from 'lucide-react';

import '../style/Sidebar_Style.css';

const menuItems = [
    { label: 'Executive Summary', path: '/dashboard', icon: LayoutDashboard },
    { label: 'App Portofolio', path: '/applications', icon: Grid3x3 },
    { label: 'Infrastructure Visibility', path: '/infrastructure', icon: Network },
    { label: 'TSA Team', path: '/tsa-team', icon: Users },
    { label: 'TSA Information', path: '/tsa-information', icon: FileText },
    { label: 'OSS Data Integration', path: '/oss-data', icon: Database },
    { label: 'Security Assessment', path: '/security-assessment', icon: ShieldCheck },
    { label: 'User Access', path: '/user-access', icon: KeyRound },
    { label: 'Request', path: '/request', icon: Inbox },
    { label: 'Feedback', path: '/feedback', icon: MessageSquare },
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