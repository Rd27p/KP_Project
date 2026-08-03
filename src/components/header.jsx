import { useEffect, useRef, useState } from 'react';
import { Search, X, Bell, Bot } from 'lucide-react';
import Profile from '../pages/Profile';
import '../style/Header_Style.css';

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
