import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Boxes,
    User,
    Clock,
    Tag,
    Link2,
    GitBranch,
    Activity,
    ChevronDown,
    Server,
    Database,
    ShieldCheck,
    FileText,
    Mail,
} from 'lucide-react';
import Layout from '../../components/Layout';
import { applications } from './Application_Data';
import '../../style/app_portofolio_style/App_Profile_Style.css';

const statusColor = {
    Active: 'badge-active',
    Maintenance: 'badge-maintenance',
    Inactive: 'badge-inactive',
};

function AppProfile() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [showDetails, setShowDetails] = useState(false);

    
    const app = applications.find((item) => item.id === id);

    if (!app) {
        return (
            <Layout title="App Profile">
                <div className="profile-notfound">
                    <p>Aplikasi tidak ditemukan.</p>
                    <button className="profile-back-btn" onClick={() => navigate('/applications')}>
                        <ArrowLeft size={16} strokeWidth={2} />
                        Kembali ke App Portofolio
                    </button>
                </div>
            </Layout>
        );
    }

    const mainInfoItems = [
        { label: 'Pemilik', value: app.owner, icon: User },
        { label: 'Kategori', value: app.category, icon: Tag },
        { label: 'Terakhir Diperbarui', value: app.updated, icon: Clock },
        { label: 'Versi', value: app.version, icon: GitBranch },
        { label: 'URL', value: app.url, icon: Link2 },
        { label: 'Uptime', value: app.uptime, icon: Activity },
    ];

    const detailInfoItems = [
        { label: 'Server', value: app.server, icon: Server },
        { label: 'Database', value: app.database, icon: Database },
        { label: 'SLA', value: app.sla, icon: ShieldCheck },
        { label: 'Dokumentasi', value: app.documentation, icon: FileText },
        { label: 'Kontak Support', value: app.supportContact, icon: Mail },
    ].filter((item) => item.value);

    return (
        <Layout title="App Profile">
            <div className="app-profile-content">
                <button className="profile-back-btn" onClick={() => navigate('/applications')}>
                    <ArrowLeft size={16} strokeWidth={2} />
                    Kembali ke App Portofolio
                </button>

                <div className="profile-header-card">
                    <div className="profile-header-top">
                        <div className="profile-header-icon">
                            <Boxes size={28} strokeWidth={2} color="#FFFFFF" />
                        </div>
                        <span className={`status-badge ${statusColor[app.status]}`}>
                            {app.status}
                        </span>
                    </div>

                    <h1 className="profile-app-name">{app.name}</h1>
                    <p className="profile-app-description">{app.description}</p>
                </div>

                <div className="profile-info-grid">
                    {mainInfoItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <div className="profile-info-card" key={item.label}>
                                <div className="profile-info-icon">
                                    <Icon size={18} strokeWidth={2} />
                                </div>
                                <div className="profile-info-body">
                                    <span className="profile-info-label">{item.label}</span>
                                    <span className="profile-info-value">{item.value}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {detailInfoItems.length > 0 && (
                    <div className="profile-detail-section">
                        <button
                            className="profile-detail-toggle"
                            onClick={() => setShowDetails((prev) => !prev)}
                        >
                            <span>{showDetails ? 'Sembunyikan Detail Lengkap' : 'Lihat Detail Lengkap'}</span>
                            <ChevronDown
                                size={18}
                                strokeWidth={2}
                                className={`profile-detail-chevron ${showDetails ? 'profile-detail-chevron-open' : ''}`}
                            />
                        </button>

                        {showDetails && (
                            <div className="profile-info-grid profile-detail-grid">
                                {detailInfoItems.map((item) => {
                                    const Icon = item.icon;
                                    return (
                                        <div className="profile-info-card" key={item.label}>
                                            <div className="profile-info-icon">
                                                <Icon size={18} strokeWidth={2} />
                                            </div>
                                            <div className="profile-info-body">
                                                <span className="profile-info-label">{item.label}</span>
                                                < span className="profile-info-value">{item.value}</span>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default AppProfile;
