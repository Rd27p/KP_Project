import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom';
import {
    ArrowLeft,
    Boxes,
    RefreshCw,
    ExternalLink,
    Globe,
    ImageOff,
} from 'lucide-react';
import Layout from '../../components/Layout';
import DetailStateWrapper from './DetailStateWrapper';
import { fetchApplicationById } from '../../services/applications';
import '../../style/app_portofolio_style/App_Profile_Style.css';

const statusColor = {
    Active: 'badge-active',
    Maintenance: 'badge-maintenance',
    Inactive: 'badge-inactive',
    Pending: 'badge-maintenance',
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

/**
 * AutoScreenshot
 * ----------------
 * Mengambil screenshot otomatis dari URL aplikasi yang sudah terdaftar, tanpa perlu
 * upload gambar manual. Contoh: jika URL aplikasi adalah https://youtube.com,
 * komponen ini otomatis menampilkan pratinjau halaman YouTube tersebut.
 *
 * Sumber gambar:
 * 1. WordPress mShots (gratis, tanpa API key) — permintaan pertama kadang masih
 *    menampilkan placeholder abu-abu selagi screenshot di-generate di background,
 *    makanya ada auto-refresh sekali setelah beberapa detik.
 * 2. Jika mShots gagal (error jaringan/URL tidak valid), otomatis fallback ke
 *    Microlink sebagai layanan thumbnail cadangan.
 * 3. Jika keduanya gagal, tampilkan state kosong dengan opsi buka situs manual.
 *
 * Diberi `key={app.id}` oleh parent supaya state screenshot selalu fresh
 * setiap kali pindah ke aplikasi lain (bukan lewat effect yang reset state
 * berdasarkan perubahan prop, yang bisa memicu cascading render).
 */
function AutoScreenshot({ url, appName }) {
    const [stage, setStage] = useState('primary'); // 'primary' | 'fallback' | 'failed'
    const [loaded, setLoaded] = useState(false);
    const [cacheBust, setCacheBust] = useState(0);

    // Auto-refresh sekali: mShots sering butuh beberapa detik untuk generate
    // screenshot pertama kali. Ini timer sekali jalan per mount (per aplikasi),
    // bukan reaksi terhadap perubahan state lain—jadi aman dari cascading render.
    useEffect(() => {
        const timer = setTimeout(() => {
            setCacheBust(Date.now());
        }, 4000);
        return () => clearTimeout(timer);
    }, []);

    const encodedUrl = encodeURIComponent(url);
    const primarySrc = `https://s0.wp.com/mshots/v1/${encodedUrl}?w=1200&h=750${cacheBust ? `&t=${cacheBust}` : ''}`;
    const fallbackSrc = `https://api.microlink.io/?url=${encodedUrl}&screenshot=true&meta=false&embed=screenshot.url`;
    const src = stage === 'fallback' ? fallbackSrc : primarySrc;

    function handleError() {
        if (stage === 'primary') {
            setStage('fallback');
            setLoaded(false);
        } else {
            setStage('failed');
        }
    }

    function handleLoad() {
        setLoaded(true);
    }

    function handleManualRefresh() {
        setStage('primary');
        setLoaded(false);
        setCacheBust(Date.now());
    }

    return (
        <div className="screenshot-panel">
            <div className="screenshot-toolbar">
                <div className="screenshot-url">
                    <Globe size={15} strokeWidth={2} />
                    {url}
                </div>
                <div className="screenshot-actions">
                    <button type="button" className="screenshot-btn" onClick={handleManualRefresh}>
                        <RefreshCw size={14} strokeWidth={2} />
                        Refresh
                    </button>
                    <a
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="screenshot-btn primary"
                    >
                        <ExternalLink size={14} strokeWidth={2} />
                        Buka Situs
                    </a>
                </div>
            </div>

            <div className="screenshot-frame">
                {stage === 'failed' ? (
                    <div className="screenshot-fallback">
                        <ImageOff size={28} strokeWidth={1.6} />
                        <p>Pratinjau otomatis untuk {appName} belum bisa dimuat.</p>
                        <button type="button" className="screenshot-btn" onClick={handleManualRefresh}>
                            <RefreshCw size={14} strokeWidth={2} />
                            Coba lagi
                        </button>
                    </div>
                ) : (
                    <>
                        {!loaded && (
                            <div className="screenshot-loading">
                                <div className="screenshot-spinner" />
                                <span>Mengambil screenshot terbaru...</span>
                            </div>
                        )}
                        <img
                            key={src}
                            src={src}
                            alt={`Pratinjau ${appName}`}
                            className="screenshot-image"
                            style={{ display: loaded ? 'block' : 'none' }}
                            onLoad={handleLoad}
                            onError={handleError}
                        />
                    </>
                )}
            </div>

            <div className="screenshot-hint">
                Screenshot diambil otomatis dari URL yang terdaftar—tidak perlu upload gambar manual.
                Contoh: kalau URL aplikasi adalah <b>https://youtube.com</b>, sistem langsung menampilkan
                pratinjau halaman tersebut. Kalau gambar masih terlihat kosong, tunggu beberapa detik lalu
                klik <b>Refresh</b>.
            </div>
        </div>
    );
}

function AppView() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [app, setApp] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        let cancelled = false;
        async function load() {
            setIsLoading(true);
            setError(null);
            try {
                const result = await fetchApplicationById(id);
                if (!cancelled) setApp(result);
            } catch (err) {
                if (!cancelled) setError(err.message || 'Gagal memuat data aplikasi.');
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        }
        load();
        return () => { cancelled = true; };
    }, [id]);

    return (
        <DetailStateWrapper
            isLoading={isLoading}
            error={error}
            notFound={!isLoading && !error && !app}
            onBack={() => navigate('/applications')}
        >
            {app && (
                <Layout>
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
                            <p className="profile-app-description">{app.description || 'Tidak ada deskripsi.'}</p>
                        </div>

                        <AppDetailTabs id={id} />

                        {!app.url ? (
                            <div className="section-card">
                                <div className="section-empty">
                                    <Globe size={22} strokeWidth={1.6} />
                                    <p>URL aplikasi belum terdaftar, jadi screenshot otomatis belum bisa diambil.</p>
                                </div>
                            </div>
                        ) : (
                            <AutoScreenshot key={app.id} url={app.url} appName={app.name} />
                        )}
                    </div>
                </Layout>
            )}
        </DetailStateWrapper>
    );
}

export default AppView;
