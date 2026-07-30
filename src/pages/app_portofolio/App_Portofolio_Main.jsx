import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Plus, Boxes, Clock, User } from 'lucide-react';
import Layout from '../../components/Layout';
import { applications } from './Application_Data';
import '../../style/app_portofolio_style/Main_Style.css';

const statusColor = {
    Active: 'badge-active',
    Maintenance: 'badge-maintenance',
    Inactive: 'badge-inactive',
};

function AppPortofolioMain() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');
    const navigate = useNavigate();

    const categories = useMemo(
        () => ['All', ...new Set(applications.map((app) => app.category))],
        []
    );

    const filteredApps = applications.filter((app) => {
        const matchesSearch =
            app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            app.category.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === 'All' || app.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

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
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
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
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                <p className="portofolio-count">{filteredApps.length} aplikasi ditemukan</p>

                {filteredApps.length === 0 ? (
                    <div className="portofolio-empty">
                        Tidak ada aplikasi yang cocok dengan pencarian atau filter.
                    </div>
                ) : (
                    <div className="app-card-grid">
                        {filteredApps.map((app) => (
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
            </div>
        </Layout>
    );
}

export default AppPortofolioMain;
