import { useState } from 'react';
import Sidebar from './sidebar';
import Header from './header';
import ChatbotPanel from '../pages/ChatbotPanel';
import '../style/Layout_Style.css';

/**
 * Layout
 * Shell utama aplikasi: sidebar tetap di kiri, header + konten
 * halaman (children) di kanan. Dipakai membungkus setiap page,
 * misalnya <Layout><Dashboard /></Layout> di router.
 *
 * - Membaca user yang login dari localStorage (diisi oleh Login.jsx)
 *   lalu meneruskannya ke Header supaya sapaan & Profile dropdown
 *   selalu sinkron dengan siapa yang sedang login.
 * - Juga menyimpan state buka/tutup ChatbotPanel supaya tombol
 *   "Tanya AI" di Header bisa memunculkan panel chat di sisi kanan
 *   tanpa pindah halaman.
 */
export default function Layout({ children, title, subtitle, showSearch = false }) {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [user] = useState(() => {
    try {
      const stored = localStorage.getItem('user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <Header
          user={user}
          showSearch={showSearch}
          onOpenChat={() => {
            console.log('[Layout] onOpenChat dipanggil, isChatOpen -> true');
            setIsChatOpen(true);
          }}
        />

        {(title || subtitle) && (
          <section className="page-intro">
            {title && <div className="page-intro-title">{title}</div>}
            {subtitle && <div className="page-intro-subtitle">{subtitle}</div>}
          </section>
        )}

        {children}
      </main>

      <ChatbotPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}
