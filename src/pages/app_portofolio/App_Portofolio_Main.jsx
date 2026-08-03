import { useState, useMemo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Search,
    Plus,
    Boxes,
    Clock,
    User,
    LayoutGrid,
    List,
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Command,
} from 'lucide-react';
import Layout from '../../components/Layout';
import { applications } from './Application_Data';
import '../../style/app_portofolio_style/Main_Style.css';

const statusColor = {
    Active: 'badge-active',
    Maintenance: 'badge-maintenance',
    Inactive: 'badge-inactive',
};

const PAGE_SIZE = 24;

function AppPortofolioMain() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const [viewMode, setViewMode] = useState('list'); // 'list' (default, efektif untuk banyak data) | 'grid'
    const [page, setPage] = useState(1);
    const [sortConfig, setSortConfig] = useState({ key: 'updated', dir: 'desc' });

    // Command palette (⌘K quick jump)
    const [paletteOpen, setPaletteOpen] = useState(false);
    const [paletteQuery, setPaletteQuery] = useState('');
    const [paletteIndex, setPaletteIndex] = useState(0);
    const paletteInputRef = useRef(null);

    const navigate = useNavigate();

    const categories = useMemo(
        () => ['All', ...new Set(applications.map((app) => app.category))],
        []
    );

    const filteredApps = useMemo(() => {
        return applications.filter((app) => {
            const matchesSearch =
                app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                app.category.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = activeCategory === 'All' || app.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchTerm, activeCategory]);

    const sortedApps = useMemo(() => {
        const dir = sortConfig.dir === 'asc' ? 1 : -1;
        return [...filteredApps].sort((a, b) => {
            const aVal = a[sortConfig.key] ?? '';
            const bVal = b[sortConfig.key] ?? '';
            return String(aVal).localeCompare(String(bVal)) * dir;
        });
    }, [filteredApps, sortConfig]);

    const totalPages = Math.max(1, Math.ceil(sortedApps.length / PAGE_SIZE));
    const currentPage = Math.min(page, totalPages);
    const pagedApps = sortedApps.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

    // ---------- Handler perubahan pencarian/filter/sort/view ----------
    // Reset halaman ke 1 dilakukan langsung di handler yang mengubah kondisi filter,
    // bukan lewat useEffect terpisah yang memantau state lain (menghindari cascading render).
    function handleSearchChange(value) {
        setSearchTerm(value);
        setPage(1);
    }

    function handleCategoryChange(category) {
        setActiveCategory(category);
        setPage(1);
    }

    function toggleSort(key) {
        setSortConfig((prev) => ({
            key,
            dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc',
        }));
        setPage(1);
    }

    function handleViewModeChange(mode) {
        setViewMode(mode);
        setPage(1);
    }

    const sortableColumns = [
        { key: 'name', label: 'Aplikasi' },
        { key: 'category', label: 'Kategori' },
        { key: 'owner', label: 'Owner' },
        { key: 'status', label: 'Status' },
        { key: 'updated', label: 'Update Terakhir' },
    ];

    // ---------- Command palette: hasil pencarian fuzzy sederhana ----------
    const paletteResults = useMemo(() => {
        if (!paletteQuery.trim()) return applications.slice(0, 8);
        const q = paletteQuery.toLowerCase();
        return applications
            .filter(
                (app) =>
                    app.name.toLowerCase().includes(q) ||
                    app.category.toLowerCase().includes(q) ||
                    app.owner.toLowerCase().includes(q)
            )
            .slice(0, 8);
    }, [paletteQuery]);

    function handlePaletteQueryChange(value) {
        setPaletteQuery(value);
        setPaletteIndex(0);
    }

    function openPalette() {
        setPaletteOpen(true);
        setPaletteQuery('');
        setPaletteIndex(0);
    }

    function closePalette() {
        setPaletteOpen(false);
        setPaletteQuery('');
        setPaletteIndex(0);
    }

    function selectPaletteApp(app) {
        closePalette();
        navigate(`/applications/${app.id}`);
    }

    // Subscribe ke keyboard global: buka dengan ⌘K/Ctrl+K, tutup dengan Escape.
    // Ini pola effect yang tepat—berlangganan ke sistem eksternal (window),
    // setState hanya dipanggil di dalam callback event, bukan langsung di body effect.
    useEffect(() => {
        function handleGlobalKeyDown(e) {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                openPalette();
            } else if (e.key === 'Escape') {
                closePalette();
            }
        }
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Fokus input saat palette terbuka. Ini murni sinkronisasi ke DOM (external system),
    // tidak memanggil setState, jadi tidak memicu cascading render.
    useEffect(() => {
        if (paletteOpen) {
            const raf = requestAnimationFrame(() => paletteInputRef.current?.focus());
            return () => cancelAnimationFrame(raf);
        }
    }, [paletteOpen]);

    function handlePaletteKeyDown(e) {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setPaletteIndex((i) => Math.min(i + 1, paletteResults.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setPaletteIndex((i) => Math.max(i - 1, 0));
        } else if (e.key === 'Enter') {
            e.preventDefault();
            const target = paletteResults[paletteIndex];
            if (target) selectPaletteApp(target);
        }
    }

    return (
        <Layout>
            <div className="portofolio-content">
                <div className="portofolio-hero-merged">
                    <div className="portofolio-hero-left">
                        <div className="portofolio-hero-eyebrow">Lihat daftar aplikasi</div>
                        <h1 className="portofolio-hero-title">App Portofolio</h1>
                        <p className="portofolio-hero-desc">Lihat daftar aplikasi, status, owner, dan update terakhir dari satu tempat yang lebih terarah.</p>
                    </div>
                    <div className="portofolio-hero-right">
                        <div className="stat-pill"><strong>{applications.length}</strong><span>Total aplikasi</span></div>
                        <div className="stat-pill"><strong>{new Set(applications.map((app) => app.category)).size}</strong><span>Kategori</span></div>
                    </div>
                </div>

                <div className="portofolio-toolbar">
                    <div className="portofolio-search">
                        <Search size={18} strokeWidth={2} />
                        <input
                            type="text"
                            placeholder="Cari aplikasi atau kategori..."
                            value={searchTerm}
                            onChange={(e) => handleSearchChange(e.target.value)}
                        />
                    </div>
                    <button type="button" className="cmdk-hint-btn" onClick={openPalette}>
                        <Command size={14} strokeWidth={2} />
                        Cari cepat
                        <span className="cmdk-kbd">⌘</span>
                        <span className="cmdk-kbd">K</span>
                    </button>
                    <button className="portofolio-add-btn">
                        <Plus size={18} strokeWidth={2.2} />
                        Tambah Aplikasi
                    </button>
                </div>

                <div className="portofolio-filters">
                    {categories.map((category) => (
                        <button
                            key={category}
                            className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <div className="portofolio-view-row">
                    <p className="portofolio-count">{filteredApps.length} aplikasi ditemukan</p>
                    <div className="view-toggle" role="tablist" aria-label="Mode tampilan">
                        <button
                            type="button"
                            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                            onClick={() => handleViewModeChange('list')}
                        >
                            <List size={14} strokeWidth={2} />
                            List
                        </button>
                        <button
                            type="button"
                            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                            onClick={() => handleViewModeChange('grid')}
                        >
                            <LayoutGrid size={14} strokeWidth={2} />
                            Grid
                        </button>
                    </div>
                </div>

                {filteredApps.length === 0 ? (
                    <div className="portofolio-empty">
                        Tidak ada aplikasi yang cocok dengan pencarian atau filter.
                    </div>
                ) : viewMode === 'list' ? (
                    <div className="app-table-wrap">
                        <table className="app-table">
                            <thead>
                                <tr>
                                    {sortableColumns.map((col) => (
                                        <th
                                            key={col.key}
                                            onClick={() => toggleSort(col.key)}
                                            aria-sort={
                                                sortConfig.key === col.key
                                                    ? sortConfig.dir === 'asc'
                                                        ? 'ascending'
                                                        : 'descending'
                                                    : 'none'
                                            }
                                        >
                                            <span>
                                                {col.label}
                                                <ArrowUpDown
                                                    size={12}
                                                    className={sortConfig.key === col.key ? 'sort-icon active' : 'sort-icon'}
                                                />
                                            </span>
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {pagedApps.map((app) => (
                                    <tr key={app.id} onClick={() => navigate(`/applications/${app.id}`)}>
                                        <td>
                                            <div className="app-table-name-cell">
                                                <span className="app-table-icon">
                                                    <Boxes size={14} strokeWidth={2} color="#FFFFFF" />
                                                </span>
                                                {app.name}
                                            </div>
                                        </td>
                                        <td>{app.category}</td>
                                        <td>{app.owner}</td>
                                        <td>
                                            <span className={`status-badge ${statusColor[app.status]}`}>
                                                {app.status}
                                            </span>
                                        </td>
                                        <td>{app.updated}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="app-card-grid">
                        {pagedApps.map((app) => (
                            <div
                                className="app-card"
                                key={app.id}
                                onClick={() => navigate(`/applications/${app.id}`)}
                                role="button"
                                tabIndex={0}
                            >
                                <div className="app-card-top">
                                    <div className="app-card-icon">
                                        <Boxes size={22} strokeWidth={2} color="#FFFFFF" />
                                    </div>
                                    <span className={`status-badge ${statusColor[app.status]}`}>
                                        {app.status}
                                    </span>
                                </div>

                                <h3 className="app-card-name">{app.name}</h3>
                                <span className="app-card-category">{app.category}</span>

                                <div className="app-card-footer">
                                    <div className="app-card-meta">
                                        <User size={14} strokeWidth={2} />
                                        <span>{app.owner}</span>
                                    </div>
                                    <div className="app-card-meta">
                                        <Clock size={14} strokeWidth={2} />
                                        <span>{app.updated}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {filteredApps.length > PAGE_SIZE && (
                    <div className="pagination">
                        <button
                            type="button"
                            className="page-btn"
                            disabled={currentPage === 1}
                            onClick={() => setPage((p) => Math.max(1, p - 1))}
                        >
                            <ChevronLeft size={14} />
                        </button>
                        {Array.from({ length: totalPages }, (_, i) => i + 1)
                            .filter((n) => n === 1 || n === totalPages || Math.abs(n - currentPage) <= 1)
                            .map((n, i, arr) => (
                                <span key={n} style={{ display: 'contents' }}>
                                    {i > 0 && arr[i - 1] !== n - 1 && <span style={{ padding: '0 4px', color: 'var(--ink-soft)' }}>…</span>}
                                    <button
                                        type="button"
                                        className={`page-btn ${n === currentPage ? 'active' : ''}`}
                                        onClick={() => setPage(n)}
                                    >
                                        {n}
                                    </button>
                                </span>
                            ))}
                        <button
                            type="button"
                            className="page-btn"
                            disabled={currentPage === totalPages}
                            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                        >
                            <ChevronRight size={14} />
                        </button>
                    </div>
                )}
            </div>

            {paletteOpen && (
                <div className="cmdk-backdrop" onClick={closePalette}>
                    <div className="cmdk-modal" onClick={(e) => e.stopPropagation()}>
                        <div className="cmdk-input-row">
                            <Search size={18} strokeWidth={2} />
                            <input
                                ref={paletteInputRef}
                                type="text"
                                placeholder="Ketik nama aplikasi, kategori, atau owner..."
                                value={paletteQuery}
                                onChange={(e) => handlePaletteQueryChange(e.target.value)}
                                onKeyDown={handlePaletteKeyDown}
                            />
                        </div>
                        <div className="cmdk-results">
                            {paletteResults.length === 0 ? (
                                <div className="cmdk-empty">Tidak ada aplikasi yang cocok.</div>
                            ) : (
                                paletteResults.map((app, i) => (
                                    <div
                                        key={app.id}
                                        className={`cmdk-result-item ${i === paletteIndex ? 'active' : ''}`}
                                        onMouseEnter={() => setPaletteIndex(i)}
                                        onClick={() => selectPaletteApp(app)}
                                    >
                                        <div className="cmdk-result-icon">
                                            <Boxes size={15} strokeWidth={2} color="#FFFFFF" />
                                        </div>
                                        <div className="cmdk-result-body">
                                            <span className="cmdk-result-name">{app.name}</span>
                                            <span className="cmdk-result-meta">{app.category} · {app.owner}</span>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                        <div className="cmdk-footer">
                            <div className="cmdk-footer-hints">
                                <span><span className="cmdk-kbd">↑</span><span className="cmdk-kbd">↓</span> navigasi</span>
                                <span><span className="cmdk-kbd">↵</span> buka</span>
                            </div>
                            <span><span className="cmdk-kbd">esc</span> tutup</span>
                        </div>
                    </div>
                </div>
            )}
        </Layout>
    );
}

export default AppPortofolioMain;