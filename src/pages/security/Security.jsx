import {
    Activity,
    AlertTriangle,
    CheckCircle2,
    KeyRound,
    Lock,
    ShieldCheck,
} from 'lucide-react';
import Layout from '../../components/Layout';
import '../../style/security_style/Main_Style.css';

const summaryCards = [
    {
        title: 'Risk Level',
        value: 'Medium',
        detail: '2 item butuh perhatian',
        icon: AlertTriangle,
        tone: 'warning',
    },
    {
        title: 'Control Coverage',
        value: '94%',
        detail: 'Kebijakan aktif berjalan',
        icon: ShieldCheck,
        tone: 'good',
    },
    {
        title: 'MFA Enabled',
        value: '87%',
        detail: 'Pengguna terverifikasi',
        icon: Lock,
        tone: 'neutral',
    },
    {
        title: 'Incident Trend',
        value: 'Stable',
        detail: 'Tidak ada insiden kritis',
        icon: Activity,
        tone: 'good',
    },
];

const controls = [
    {
        name: 'Access Review',
        detail: 'Hak akses harian telah diverifikasi oleh tim IT',
    },
    {
        name: 'Encryption Standard',
        detail: 'TLS 1.3 dan AES-256 aktif pada layanan utama',
    },
    {
        name: 'Secrets Rotation',
        detail: 'Kunci rahasia diperbarui dalam 30 hari terakhir',
    },
];

const actions = [
    {
        title: 'Tinjau policy MFA',
        text: 'Aktifkan MFA untuk akun administrator yang belum tercover.',
    },
    {
        title: 'Refresh backup test',
        text: 'Lakukan uji pemulihan pada sistem core sebelum akhir bulan.',
    },
];

function Security() {
    return (
        <Layout>
            <div className="security-page">
                <div className="security-summary-grid">
                    {summaryCards.map((card) => {
                        const Icon = card.icon;
                        return (
                            <div className={`security-summary-card ${card.tone}`} key={card.title}>
                                <div className="security-summary-icon">
                                    <Icon size={18} strokeWidth={2} />
                                </div>
                                <div>
                                    <p className="security-summary-title">{card.title}</p>
                                    <h3>{card.value}</h3>
                                    <span>{card.detail}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className="security-grid">
                    <section className="security-card">
                        <div className="security-card-header">
                            <div>
                                <p className="security-card-label">Current Controls</p>
                                <h2>Kontrol keamanan utama</h2>
                            </div>
                            <span className="security-chip">Protected</span>
                        </div>

                        <div className="security-list">
                            {controls.map((item) => (
                                <div className="security-list-item" key={item.name}>
                                    <div className="security-list-main">
                                        <div className="security-list-icon">
                                            <KeyRound size={16} strokeWidth={2} />
                                        </div>
                                        <div>
                                            <h3>{item.name}</h3>
                                            <p>{item.detail}</p>
                                        </div>
                                    </div>
                                    <span className="security-status">OK</span>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="security-card">
                        <div className="security-card-header">
                            <div>
                                <p className="security-card-label">Recommended Actions</p>
                                <h2>Prioritas tindakan</h2>
                            </div>
                        </div>

                        <div className="security-alert-list">
                            {actions.map((action) => (
                                <div className="security-alert-item" key={action.title}>
                                    <div className="security-alert-icon">
                                        <CheckCircle2 size={18} strokeWidth={2} />
                                    </div>
                                    <div>
                                        <h3>{action.title}</h3>
                                        <p>{action.text}</p>
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

export default Security;
