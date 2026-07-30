import { useNavigate } from 'react-router-dom';
import { FileText, ClipboardList, ArrowRight } from 'lucide-react';
import Layout from '../../components/Layout';
import '../../style/request_style/Main_Style.css';

const requestOptions = [
    {
        title: 'Application Registration',
        description: 'Daftarkan aplikasi baru ke dalam Application Catalog, lengkap dengan detail dan asset owner.',
        icon: FileText,
        path: '/request/app-registration',
    },
    {
        title: 'Use Case Request',
        description: 'Ajukan kasus penggunaan (use case) baru untuk aplikasi yang sudah terdaftar.',
        icon: ClipboardList,
        path: '/request/use-case',
    },
];

function RequestMain() {
    const navigate = useNavigate();

    return (
        <Layout title="Request" subtitle="Pilih jenis permintaan yang paling sesuai dengan kebutuhan Anda agar proses berjalan lebih cepat.">
            <div className="request-content">
                <div className="request-hero">
                    <div>
                        <div className="request-hero-eyebrow">Alur yang lebih jelas</div>
                        <h2>Ajukan permintaan dengan panduan yang lebih informatif.</h2>
                    </div>
                    <div className="request-hero-meta">Satu halaman untuk memulai registrasi aplikasi atau kebutuhan use case baru.</div>
                </div>

                <div className="request-header">
                    <h1 className="request-title">Request</h1>
                    <p className="request-subtitle">
                        Pilih jenis permintaan yang ingin kamu ajukan.
                    </p>
                </div>

                <div className="request-option-grid">
                    {requestOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                            <div
                                className="request-option-card"
                                key={option.path}
                                onClick={() => navigate(option.path)}
                                role="button"
                                tabIndex={0}
                            >
                                <div className="request-option-icon">
                                    <Icon size={26} strokeWidth={2} color="#FFFFFF" />
                                </div>
                                <div className="request-option-body">
                                    <h3>{option.title}</h3>
                                    <p>{option.description}</p>
                                </div>
                                <ArrowRight size={20} strokeWidth={2} className="request-option-arrow" />
                            </div>
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

export default RequestMain;