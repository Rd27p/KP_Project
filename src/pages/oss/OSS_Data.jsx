import { Database, CloudCog, Code2, ServerCog } from 'lucide-react';
import Layout from '../../components/Layout';
import '../../style/oss_style/Main_Style.css';

const summaryCards = [
  {
    title: 'Data Sources',
    value: '14',
    detail: 'Integrasi data OSS aktif',
    icon: Database,
    tone: 'good',
  },
  {
    title: 'Sync Success',
    value: '98%',
    detail: 'Sinkronisasi harian berhasil',
    icon: CloudCog,
    tone: 'good',
  },
  {
    title: 'Pending Tasks',
    value: '4',
    detail: 'Tugas integrasi yang tertunda',
    icon: Code2,
    tone: 'neutral',
  },
  {
    title: 'Health Score',
    value: 'A',
    detail: 'Kondisi OSS stabil',
    icon: ServerCog,
    tone: 'good',
  },
];

const integrations = [
  {
    name: 'Repository Scanner',
    status: 'Active',
    detail: 'Memindai semua paket open source.',
  },
  {
    name: 'Compliance Feed',
    status: 'Monitoring',
    detail: 'Memeriksa lisensi dan policy kompatibilitas.',
  },
  {
    name: 'Security Dashboard',
    status: 'Live',
    detail: 'Menampilkan metrik OSS secara realtime.',
  },
];

const dataHighlights = [
  'Pembaruan dependency dilacak setiap 24 jam.',
  'Lisensi OSS divalidasi sebelum produksi.',
  'Laporan risiko tersedia untuk tim pengembang.',
];

function OSSData() {
  return (
    <Layout>
      <div className="oss-page">
        <section className="oss-hero">
          <div>
            <p className="oss-eyebrow">OSS Data Integration</p>
            <h1>Open Source Security Dashboard</h1>
            <p>
              Pantau integrasi data OSS, status sinkronisasi, dan temuan keamanan open source di satu tempat.
            </p>
          </div>
          <div className="oss-hero-badge">Integration</div>
        </section>

        <div className="oss-summary-grid">
          {summaryCards.map((card) => {
            const Icon = card.icon;
            return (
              <div className={`oss-summary-card ${card.tone}`} key={card.title}>
                <div className="oss-summary-icon">
                  <Icon size={18} strokeWidth={2} />
                </div>
                <div>
                  <p className="oss-summary-title">{card.title}</p>
                  <h3>{card.value}</h3>
                  <span>{card.detail}</span>
                </div>
              </div>
            );
          })}
        </div>

        <div className="oss-grid">
          <section className="oss-card">
            <div className="oss-card-header">
              <div>
                <p className="oss-card-label">Integration status</p>
                <h2>Koneksi data OSS</h2>
              </div>
              <span className="oss-chip">Realtime</span>
            </div>

            <div className="oss-list">
              {integrations.map((item) => (
                <div className="oss-list-item" key={item.name}>
                  <div>
                    <h3>{item.name}</h3>
                    <p>{item.detail}</p>
                  </div>
                  <span className={`oss-status-badge ${item.status.toLowerCase()}`}>{item.status}</span>
                </div>
              ))}
            </div>
          </section>

          <section className="oss-card">
            <div className="oss-card-header">
              <div>
                <p className="oss-card-label">Data highlights</p>
                <h2>Ringkasan OSS</h2>
              </div>
            </div>

            <div className="oss-highlights">
              {dataHighlights.map((item) => (
                <div className="oss-highlight-item" key={item}>
                  <span>•</span>
                  <p>{item}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </Layout>
  );
}

export default OSSData;
