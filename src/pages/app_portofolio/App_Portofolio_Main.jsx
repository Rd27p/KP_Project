import { useState, useMemo } from 'react';
import { Search, Plus, Boxes, Clock, User } from 'lucide-react';
import Layout from '../../components/layout';
import '../../style/app_portofolio_style/Main_Style.css';

// Data aplikasi utama. Diekspor supaya halaman lain (misal Dashboard)
// bisa pakai data yang sama tanpa perlu file data terpisah.
const applications = [
    { name: 'GarasiBMW Portal', category: 'Operational', owner: 'Raka Adi', status: 'Active', updated: '20 Jul 2026' },
    { name: 'HRIS Telkomsel', category: 'Human Resource', owner: 'Siti Rahma', status: 'Active', updated: '18 Jul 2026' },
    { name: 'App Catalog SSO', category: 'Network', owner: 'Dimas Prayoga', status: 'Active', updated: '22 Jul 2026' },
    { name: 'Finance Dashboard', category: 'Finance', owner: 'Wulan Sari', status: 'Maintenance', updated: '15 Jul 2026' },
    { name: 'Inventory System', category: 'Operational', owner: 'Fajar Nugroho', status: 'Inactive', updated: '10 Jun 2026' },
    { name: 'Monitoring Grafana', category: 'Network', owner: 'Raka Adi', status: 'Active', updated: '23 Jul 2026' },
    { name: 'Payroll Gateway', category: 'Finance', owner: 'Siti Rahma', status: 'Active', updated: '19 Jul 2026' },
    { name: 'Security Scanner', category: 'Security', owner: 'Dimas Prayoga', status: 'Active', updated: '21 Jul 2026' },
];

const statusColor = {
    Active: 'badge-active',
    Maintenance: 'badge-maintenance',
    Inactive: 'badge-inactive',
};

function AppPortofolioMain() {
    const [searchTerm, setSearchTerm] = useState('');
    const [activeCategory, setActiveCategory] = useState('All');

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
        <Layout title="App Portofolio">
            <div className="portofolio-content">
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
                            <div className="app-card" key={app.name}>
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
