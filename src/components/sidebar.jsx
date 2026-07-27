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
    ChevronDown,
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
    { label: 'User Access', path: '/user-access', icon: KeyRound,},
    { 
        label: 'Request', 
        icon: Inbox,
        children: [
            { label: 'Application Registration', path: '/request/app-registration' },
            { label: 'Use Case Request', path: '/request/use-case' },
        ], 
    },
    { 
        label: 'Feedback', 
        icon: MessageSquare,
        children: [
            { label: 'Result', path: '/feedback/result' },
            { label: 'Bot Registration', path: '/feedback/bot-registration' },
        ], 
    },
];

function Sidebar() {
    const [collapsed, setCollapsed] = useState(false);
    const [openMenu, setOpenMenu] = useState(null);
    const location = useLocation();

    const isChildActive = (children) =>
        children?.some((child) => location.pathname === child.path);

    const handleParentClick = (label) => {
        setOpenMenu((prev) => (prev === label ? null : label));
    };

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
                    const hasChildren = Boolean(item.children);
                    const isActive = hasChildren
                        ? isChildActive(item.children)
                        : location.pathname === item.path;
                    const isOpen = openMenu === item.label;

                    if (hasChildren) {
                        return (
                            <div className="sidebar-group" key={item.label}>
                                <button
                                    type="button"
                                    className={`sidebar-item sidebar-parent ${isActive ? 'active' : ''}`}
                                    onClick={() => handleParentClick(item.label)}
                                >
                                    <span className="sidebar-icon">
                                        <Icon size={19} strokeWidth={2} />
                                    </span>
                                    {!collapsed && (
                                        <>
                                            <span className="sidebar-label">{item.label}</span>
                                            <ChevronDown
                                                size={16}
                                                strokeWidth={2}
                                                className={`sidebar-chevron ${isOpen ? 'sidebar-chevron-open' : ''}`}
                                            />
                                        </>
                                    )}
                                </button>

                                {!collapsed && isOpen && (
                                    <div className="sidebar-submenu">
                                        {item.children.map((child) => (
                                            <Link
                                                key={child.path}
                                                to={child.path}
                                                className={`sidebar-subitem ${location.pathname === child.path ? 'active' : ''}`}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        );
                    }

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
