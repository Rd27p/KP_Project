import { Search, Bell, Bot } from 'lucide-react';
import Profile from '../pages/Profile';
import '../style/Header_Style.css';

/**
 * Header
 * Topbar halaman: sapaan + tanggal, search, tombol AI chatbot,
 * notifikasi, dan Profile dropdown.
 *
 * Props:
 *  - user        : object    -> data user login dari localStorage (dikirim Layout)
 *  - hasAlert    : bool      -> tampilkan dot merah di ikon notifikasi
 *  - onOpenChat  : function  -> dipanggil saat tombol "Tanya AI" diklik,
 *                                membuka ChatbotPanel di sisi kanan (dari Layout)
 */
export default function Header({ user, hasAlert = true, onOpenChat, showSearch = false }) {
  const today = new Date().toLocaleDateString('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Selamat pagi' : hour < 18 ? 'Selamat siang' : 'Selamat sore';
  const firstName = user?.username || 'Pengguna';

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
            <input type="text" placeholder="Cari aplikasi, request, atau status…" aria-label="Cari aplikasi" />
          </div>
        )}

        <button
          type="button"
          className="icon-btn icon-btn-cta"
          onClick={() => {
            console.log('[Header] tombol Tanya AI diklik, onOpenChat =', typeof onOpenChat);
            onOpenChat?.();
          }}
        >
          <Bot size={17} />
          <span>Tanya AI</span>
        </button>

        <button type="button" className="icon-btn" aria-label="Notifikasi">
          <Bell size={17} />
          {hasAlert && <span className="dot-badge" />}
        </button>

        <Profile user={user} />
      </div>
    </div>
  );
}
