import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    Cpu,
    Database,
    HardDrive,
    Network,
    ShieldCheck,
} from 'lucide-react';
import Layout from '../../components/Layout';
import '../../style/infrastructure_style/Main_Style.css';

const summaryCards = [
    {
        title: 'Availability',
        value: '99.98%',
        detail: 'Selama 30 hari terakhir',
        icon: Activity,
        tone: 'good',
    },
    {
        title: 'Server Aktif',
        value: '24/24',
        detail: 'Semua node online',
        icon: HardDrive,
        tone: 'neutral',
    },
    {
        title: 'Layanan Utama',
        value: '12',
        detail: 'Berjalan normal',
        icon: Network,
        tone: 'good',
    },
    {
        title: 'Risiko',
        value: '2',
        detail: 'Butuh perhatian',
        icon: AlertTriangle,
        tone: 'warning',
    },
];

const services = [
    {
        name: 'Core API Gateway',
        status: 'Healthy',
        detail: 'Latency 98ms · 3 replicas',
        icon: ShieldCheck,
    },
    {
        name: 'Database Cluster',
        status: 'Stable',
        detail: 'CPU 42% · Storage 68%',
        icon: Database,
    },
    {
        name: 'Compute Nodes',
        status: 'Monitor',
        detail: '2 node pending reboot',
        icon: Cpu,
    },
];

const alerts = [
    {
        title: 'Patch window',
        text: 'Maintenance rutin dijadwalkan malam ini pukul 22.00.',
    },
    {
        title: 'Capacity review',
        text: 'Penggunaan storage mendekati threshold 70%.',
    },
];

function Infra() {
    return (
        <Layout>
            <div className="infra-page">
                <div className="infra-hero">
                    <div>
                        <p className="infra-eyebrow">Infrastructure Visibility</p>
                        <h1>Pantau infrastruktur secara terpusat</h1>
                        <p>Ikhtisar status layanan, performa server, dan kondisi jaringan dalam satu tampilan yang mudah dibaca.</p>
                    </div>
                    <div className="infra-hero-badge">
                        <span className="infra-dot" />
                        Semua sistem berjalan normal
                    </div>
                </div>

                <div className="infra-summary-grid">
                    {summaryCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div className={`infra-summary-card ${card.tone}`} key={card.title}>
                                <div className="infra-summary-icon">
                                    <Icon size={18} strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="infra-summary-title">{card.title}</p>
                                    <h3>{card.value}</h3>
                                    <span>{card.detail}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="infra-grid">
                    <section className="infra-card">
                        <div className="infra-card-header">
                            <div>
                                <p className="infra-card-label">Service Status</p>
                                <h2>Ringkasan layanan utama</h2>
                            </div>
                            <span className="infra-chip">Live</span>
                        </div>

                        <div className="infra-service-list">
                            {services.map((service) => {
                                const Icon = service.icon;
                                return (
                                    <div className="infra-service-item" key={service.name}>
                                        <div className="infra-service-main">
                                            <div className="infra-service-icon">
                                                <Icon size={18} strokeWidth={2} />
                                            </div>
                                            <div>
                                                <h3>{service.name}</h3>
                                                <p>{service.detail}</p>
                                            </div>
                                        </div>
                                        <span className="infra-status-badge">{service.status}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </section>

                    <section className="infra-card">
                        <div className="infra-card-header">
                            <div>
                                <p className="infra-card-label">Operational Alert</p>
                                <h2>Notifikasi penting</h2>
                            </div>
                        </div>

                        <div className="infra-alert-list">
                            {alerts.map((alert) => (
                                <div className="infra-alert-item" key={alert.title}>
                                    <div className="infra-alert-icon">
                                        <CheckCircle2 size={18} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h3>{alert.title}</h3>
                                        <p>{alert.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>
            </div>
        </Layout>
    );
}

export default Infra;
