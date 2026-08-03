import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Boxes,
    Code2,
    Terminal,
    Server,
    Database,
    GitBranch,
    Workflow,
    FileText,
    Layers3,
} from 'lucide-react';
import Layout from '../../components/Layout';
import { applications } from './Application_Data';
import '../../style/app_portofolio_style/App_Profile_Style.css';

const statusColor = {
    Active: 'badge-active',
    Maintenance: 'badge-maintenance',
    Inactive: 'badge-inactive',
};

function AppDetailTabs({ id }) {
    const { pathname } = useLocation();
    const tabs = [
        { label: 'Profile', path: `/applications/${id}` },
        { label: 'Architecture', path: `/applications/${id}/architecture` },
        { label: 'Compliance & Security', path: `/applications/${id}/compliance-security` },
        { label: 'Tech Info', path: `/applications/${id}/tech-info` },
        { label: 'App View', path: `/applications/${id}/app-view` },
    ];
    return (
        <div className="profile-tabs" role="tablist" aria-label="Detail aplikasi">
            {tabs.map((tab) => (
                <Link
                    key={tab.path}
                    to={tab.path}
                    className={`profile-tab ${pathname === tab.path ? 'active' : ''}`}
                >
                    {tab.label}
                </Link>
            ))}
        </div>
    );
}

function TechInfo() {
    const { id } = useParams();
    const navigate = useNavigate();
    const app = applications.find((item) => item.id === id);

    if (!app) {
        return (
            <Layout title="Tech Info">
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

    const techItems = [
        { label: 'Framework', value: app.framework, icon: Code2 },
        { label: 'Bahasa Pemrograman', value: app.language, icon: Terminal },
        { label: 'Server', value: app.server, icon: Server },
        { label: 'Database', value: app.database, icon: Database },
        { label: 'Repository', value: app.repository, icon: GitBranch },
        { label: 'CI/CD Pipeline', value: app.cicdPipeline, icon: Workflow },
        { label: 'Dokumentasi API', value: app.apiDocumentation, icon: FileText },
    ].filter((item) => item.value);

    const techStack = app.techStack || [];
    const hasAnyContent = techItems.length > 0 || techStack.length > 0;

    return (
        <Layout title="Tech Info">
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

                <AppDetailTabs id={id} />

                {!hasAnyContent ? (
                    <div className="section-card">
                        <div className="section-empty">
                            <Layers3 size={22} strokeWidth={1.6} />
                            <p>Informasi teknis belum dilengkapi untuk aplikasi ini.</p>
                        </div>
                    </div>
                ) : (
                    <>
                        {techStack.length > 0 && (
                            <div className="section-card">
                                <div className="section-card-title">
                                    <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                        <Layers3 size={16} strokeWidth={2} />
                                        Tech Stack
                                    </span>
                                </div>
                                <div className="chip-row">
                                    {techStack.map((item) => (
                                        <span className="chip" key={item}>{item}</span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {techItems.length > 0 && (
                            <div className="profile-info-grid">
                                {techItems.map((item) => {
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
                        )}
                    </>
                )}
            </div>
        </Layout>
    );
}

export default TechInfo;
