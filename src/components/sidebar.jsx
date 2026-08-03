import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
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

const navItems = [
  { label: 'Executive Summary', path: '/dashboard', icon: LayoutDashboard },
  { label: 'App Portofolio', path: '/applications', icon: Grid3x3 },
  { label: 'Infrastructure Visibility', path: '/infrastructure', icon: Network },
  { label: 'TSA Team', path: '/tsa-team', icon: Users },
  { label: 'TSA Information', path: '/tsa-information', icon: FileText },
  { label: 'OSS Data Integration', path: '/oss-data', icon: Database },
  { label: 'Security Assessment', path: '/security-assessment', icon: ShieldCheck },
  { label: 'User Access', path: '/user-access', icon: KeyRound },
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

export default function Sidebar() {
  const { pathname } = useLocation();

  // Default tertutup. Kalau URL saat ini persis salah satu child grup,
  // grup itu otomatis kebuka duluan biar item aktifnya tidak "hilang" di balik dropdown tertutup.
  const [openGroups, setOpenGroups] = useState(() => {
    const initial = {};
    navItems.forEach((item) => {
      if (item.children) {
        initial[item.label] = item.children.some((child) => child.path === pathname);
      }
    });
    return initial;
  });

  const toggleGroup = (label) => {
    setOpenGroups((prev) => ({ ...prev, [label]: !prev[label] }));
  };

  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-mark">A</div>
        <div>
          <div className="brand-text">APPHUB</div>
          <div className="brand-sub">Application Hub</div>
        </div>
      </div>

      <div className="nav-group-label">Menu</div>

      <nav className="nav-list">
        {navItems.map((item) => {
          const Icon = item.icon;

          if (item.children) {
            const isOpen = openGroups[item.label];
            return (
              <div key={item.label} className="nav-block">
                <button
                  type="button"
                  className="nav-item nav-parent"
                  onClick={() => toggleGroup(item.label)}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                  <ChevronDown
                    size={14}
                    className={`chevron ${isOpen ? 'chevron-open' : ''}`}
                  />
                </button>

                {isOpen && (
                  <div className="nav-children">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.path}
                        to={child.path}
                        className={({ isActive }) =>
                          `nav-child ${isActive ? 'nav-child-active' : ''}`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            );
          }

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
}
