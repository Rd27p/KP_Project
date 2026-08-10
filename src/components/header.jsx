import { useEffect, useRef, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Search, X, Bell, Bot, ChevronRight } from 'lucide-react';
import Profile from '../pages/Profile';
import { applications } from '../pages/app_portofolio/Application_Data';
import '../style/Header_Style.css';

// Label tampilan untuk tiap segmen route statis. Segmen yang tidak terdaftar
// di sini otomatis di-format dari path-nya (mis. "app-view" -> "App View").
const ROUTE_LABELS = {
  dashboard: 'Executive Summary',
  settings: 'Settings',
  infrastructure: 'Infrastructure Visibility',
  applications: 'App Portofolio',
  compare: 'Compare',
  architecture: 'Architecture',
  'compliance-security': 'Compliance & Security',
  'tech-info': 'Tech Info',
  'app-view': 'App View',
  'user-access': 'User Access',
  register: 'Register',
  request: 'Request',
  'app-registration': 'Application Registration',
  'use-case': 'Use Case Request',
  feedback: 'Feedback',
  result: 'Result',
  'bot-registration': 'Bot Registration',
  'security-assessment': 'Security Assessment',
  'tsa-information': 'TSA Information Management',
  'oss-data': 'OSS Data Integration',
  profile: 'Profile',
};

function formatFallbackLabel(segment) {
  return segment.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}

function useBreadcrumb() {
  const { pathname } = useLocation();
  const segments = pathname.split('/').filter(Boolean);

  return segments.map((segment, index) => {
    const path = `/${segments.slice(0, index + 1).join('/')}`;
    const isAppId = segments[index - 1] === 'applications' && segment !== 'compare';
    const matchedApp = isAppId ? applications?.find((a) => String(a.id) === segment) : null;
    const label = matchedApp?.name || ROUTE_LABELS[segment] || formatFallbackLabel(segment);

    return { label, path, isLast: index === segments.length - 1 };
  });
}

export default function Header({
  user,
  hasAlert = true,
  notifCount,
  onOpenChat,
  onOpenNotifications,
  onSearchChange,
  onSearchSubmit,
  showSearch = false,
}) {
  const [searchValue, setSearchValue] = useState('');
  const searchInputRef = useRef(null);
  const breadcrumb = useBreadcrumb();

  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Selamat pagi' : hour < 18 ? 'Selamat siang' : 'Selamat sore';
  const firstName = user?.username || 'Pengguna';

  // Shortcut "/" untuk langsung fokus ke search, kecuali user sedang mengetik di input/textarea lain.
  useEffect(() => {
    if (!showSearch) return;

    function handleKeyDown(e) {
      const activeTag = document.activeElement?.tagName;
      if (e.key === '/' && activeTag !== 'INPUT' && activeTag !== 'TEXTAREA') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showSearch]);

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchValue(value);
    onSearchChange?.(value);
  }

  function handleSearchKeyDown(e) {
    if (e.key === 'Enter') {
      onSearchSubmit?.(searchValue);
    } else if (e.key === 'Escape') {
      clearSearch();
      searchInputRef.current?.blur();
    }
  }

  function clearSearch() {
    setSearchValue('');
    onSearchChange?.('');
  }

  const showNotifCount = typeof notifCount === 'number' && notifCount > 0;

  return (
    <div className="topbar">
      <div className="topbar-copy">

        <div className="greet-eyebrow">{today}</div>
        <div className="greet-title">
          {greeting}, {firstName} <span className="accent">👋</span>
        </div>

        {breadcrumb.length > 0 && (
          <nav className="breadcrumb" aria-label="Breadcrumb">
            {breadcrumb.map((item) => (
              <span className="breadcrumb-item" key={item.path}>
                {item.isLast ? (
                  <span className="breadcrumb-current">{item.label}</span>
                ) : (
                  <Link to={item.path} className="breadcrumb-link">
                    {item.label}
                  </Link>
                )}
                {!item.isLast && <ChevronRight size={12} className="breadcrumb-sep" />}
              </span>
            ))}
          </nav>
        )}
      </div>

      <div className="topbar-actions">
        {showSearch && (
          <div className="search">
            <Search size={15} />
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Cari aplikasi, request, atau status…"
              aria-label="Cari aplikasi"
              value={searchValue}
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
            />
            {searchValue ? (
              <button
                type="button"
                className="search-clear"
                onClick={clearSearch}
                aria-label="Hapus pencarian"
              >
                <X size={13} />
              </button>
            ) : (
              <span className="search-kbd" aria-hidden="true">/</span>
            )}
          </div>
        )}

        <button
          type="button"
          className="icon-btn icon-btn-cta"
          onClick={() => onOpenChat?.()}
          title="Tanya AI"
        >
          <Bot size={17} />
          <span>Tanya AI</span>
        </button>

        <button
          type="button"
          className="icon-btn"
          aria-label={showNotifCount ? `Notifikasi, ${notifCount} belum dibaca` : 'Notifikasi'}
          title="Notifikasi"
          onClick={() => onOpenNotifications?.()}
        >
          <Bell size={17} />
          {showNotifCount ? (
            <span className="count-badge">{notifCount > 9 ? '9+' : notifCount}</span>
          ) : (
            hasAlert && <span className="dot-badge" />
          )}
        </button>

        <Profile user={user} />
      </div>
    </div>
  );
}