import {
  LayoutGrid,
  AlertTriangle,
  HeartPulse,
  FileCheck2,
  Inbox,
  ClipboardList,
  ShieldCheck,
  MessageSquareWarning,
  CircleAlert,
  Activity,
  Lock,
  CheckCircle2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import ProgressBar from '../components/ProgressBar';
import '../style/Dashboard_Style.css';
import '../style/Table_Style.css';

const kpis = [
  {
    key: 'total',
    hero: true,
    icon: LayoutGrid,
    trend: '▲ 4.2%',
    trendType: 'up',
    value: '128',
    label: 'Total Aplikasi Terdaftar',
    sub: '109 Live · 12 On Review · 7 Draft',
    spark: [35, 50, 40, 60, 55, 75, 100],
  },
  {
    key: 'alarm',
    icon: AlertTriangle,
    tone: 'red',
    value: '3',
    label: 'Alarm Kritis Aktif',
    sub: 'Perlu ditindaklanjuti hari ini',
  },
  {
    key: 'health',
    icon: HeartPulse,
    tone: 'green',
    trend: '▲ 1.8%',
    trendType: 'up',
    value: '92.6%',
    label: 'Kesehatan Rata-rata',
    sub: '15 dari 128 butuh perhatian',
  },
  {
    key: 'completeness',
    icon: FileCheck2,
    tone: 'amber',
    value: '86%',
    label: 'Kelengkapan Data',
    sub: '18 aplikasi belum lengkap',
  },
];

const healthCategories = [
  { key: 'operation', label: 'Operation', pct: 6.94, tone: 'red', icon: CircleAlert },
  { key: 'performance', label: 'Performance', pct: 78.4, tone: 'amber', icon: Activity },
  { key: 'security', label: 'Security', pct: 100, tone: 'green', icon: Lock },
  { key: 'compliance', label: 'Compliance', pct: 96.1, tone: 'green', icon: CheckCircle2 },
];

const alarms = [
  {
    title: 'Payment Gateway API — response time > 8s',
    meta: 'Operation · 12 menit lalu',
    severity: 'critical',
  },
  {
    title: 'CRM Suite — sertifikat SSL akan kedaluwarsa',
    meta: 'Security · 1 jam lalu',
    severity: 'warning',
  },
  {
    title: 'Inventory Service — CPU usage 94%',
    meta: 'Performance · 2 jam lalu',
    severity: 'critical',
  },
];

const statusBreakdown = [
  { label: 'Live', value: 109, pct: 85.2, tone: 'green' },
  { label: 'On Review', value: 12, pct: 9.4, tone: 'amber' },
  { label: 'Draft', value: 7, pct: 5.4, tone: 'neutral' },
];

const tickets = [
  { label: 'Request Baru', value: 24, icon: Inbox },
  { label: 'Use Case', value: 9, icon: ClipboardList },
  { label: 'Security Assessment', value: 5, icon: ShieldCheck },
  { label: 'Complaint', value: 7, icon: MessageSquareWarning },
];

const healthPulseLegend = [
  { label: 'Security 100%', tone: 'green' },
  { label: 'Compliance 96%', tone: 'green' },
  { label: 'Performance 78%', tone: 'amber' },
  { label: 'Operation 7%', tone: 'red' },
];

const servers = [
  { app: 'Payment Gateway API', category: 'Finance', total: 14, util: 91, status: 'Live', tone: 'red' },
  { app: 'CRM Suite', category: 'Sales', total: 8, util: 54, status: 'Live', tone: 'green' },
  { app: 'Inventory Service', category: 'Operation', total: 11, util: 94, status: 'On Review', tone: 'amber' },
  { app: 'HR Self Service', category: 'People', total: 5, util: 38, status: 'Live', tone: 'green' },
  { app: 'Document Vault', category: 'Compliance', total: 6, util: 47, status: 'Live', tone: 'green' },
];

const toneVar = {
  red: 'var(--red)',
  redDeep: 'var(--red-deep)',
  amber: 'var(--amber)',
  green: 'var(--green)',
  neutral: '#C7CCDA',
};

/** Ring gauge kecil untuk kartu "Health Pulse" */
function HealthPulseRing({ percent = 0, label = 'Sehat' }) {
  const radius = 70;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  return (
    <svg width="168" height="168" viewBox="0 0 168 168">
      <circle cx="84" cy="84" r={radius} fill="none" stroke="#EEEFF3" strokeWidth="16" />
      <circle
        cx="84"
        cy="84"
        r={radius}
        fill="none"
        stroke="var(--green)"
        strokeWidth="16"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform="rotate(-90 84 84)"
      />
      <text x="84" y="80" textAnchor="middle" fontFamily="Space Grotesk" fontWeight="800" fontSize="30" fill="#1F2A44">
        {percent}%
      </text>
      <text x="84" y="100" textAnchor="middle" fontFamily="Inter" fontSize="11" fill="#6B7488">
        {label}
      </text>
    </svg>
  );
}

export default function Dashboard() {
  return (
    <Layout showSearch>
      <div className="dashboard">
        <div className="dashboard-hero">
          <div>
            <div className="dashboard-hero-eyebrow">Ringkasan operasional</div>
            <h2>Wujudkan visibilitas aplikasi dalam satu layar.</h2>
            <p>Pantau kesehatan aplikasi, alarm aktif, dan status permintaan tanpa harus berpindah halaman.</p>
          </div>
          <Link to="/feedback/result" className="hero-action">Lihat alarm & status</Link>
        </div>

      {/* ---------- KPI ROW ---------- */}
      <div className="kpi-row">
        {kpis.map((kpi) => {
          const Icon = kpi.icon;
          return (
            <div key={kpi.key} className={`kpi-card ${kpi.hero ? 'kpi-hero' : ''}`}>
              <div className="kpi-top">
                <div
                  className="kpi-icon"
                  style={
                    !kpi.hero
                      ? {
                          background: `var(--${kpi.tone}-soft, var(--surface))`,
                          color: toneVar[kpi.tone] || 'var(--red)',
                        }
                      : undefined
                  }
                >
                  <Icon size={19} />
                </div>
                {kpi.trend && (
                  <div className={`trend-chip trend-${kpi.trendType}`}>{kpi.trend}</div>
                )}
              </div>

              <div>
                <div
                  className="kpi-num"
                  style={kpi.tone === 'red' ? { color: 'var(--red-deep)' } : undefined}
                >
                  {kpi.value}
                </div>
                <div className="kpi-label">{kpi.label}</div>
              </div>

              <div className="kpi-sub">{kpi.sub}</div>

              {kpi.spark && (
                <div className="mini-spark">
                  {kpi.spark.map((h, i) => (
                    <i
                      key={i}
                      className={i === kpi.spark.length - 1 ? 'on' : ''}
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ---------- ROW 2: Healthiness + Alarms ---------- */}
      <div className="grid-2">
        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="panel-title">Healthiness per Kategori</div>
              <div className="panel-note">Diurutkan dari yang paling butuh perhatian</div>
            </div>
            <span className="link-btn">Lihat detail →</span>
          </div>

          {healthCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div className="health-row" key={cat.key}>
                <div
                  className="health-icon"
                  style={{ background: `var(--${cat.tone}-soft)`, color: toneVar[cat.tone] }}
                >
                  <Icon size={16} />
                </div>
                <div className="health-body">
                  <div className="health-top">
                    <span>{cat.label}</span>
                    <span className="pct" style={{ color: toneVar[cat.tone] }}>
                      {cat.pct}%
                    </span>
                  </div>
                  <ProgressBar value={cat.pct} color={toneVar[cat.tone]} />
                </div>
              </div>
            );
          })}
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="panel-title">Alarm Kritis</div>
              <div className="panel-note">3 memerlukan tindakan segera</div>
            </div>
          </div>

          {alarms.map((alarm, i) => (
            <div className="alarm-item" key={i}>
              <div className={`alarm-dot ${alarm.severity === 'warning' ? 'alarm-dot-warning' : ''}`} />
              <div style={{ flex: 1 }}>
                <div className="alarm-title">{alarm.title}</div>
                <div className="alarm-meta">{alarm.meta}</div>
              </div>
              <span className={`sev-chip sev-${alarm.severity}`}>
                {alarm.severity === 'critical' ? 'Critical' : 'Warning'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ---------- ROW 3: Status + Ticketing / Health Pulse ---------- */}
      <div className="grid-2">
        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="panel-title">Status Aplikasi</div>
              <div className="panel-note">Distribusi dari 128 aplikasi terdaftar</div>
            </div>
          </div>

          <div className="status-bar">
            {statusBreakdown.map((s, i) => (
              <div key={i} style={{ width: `${s.pct}%`, background: toneVar[s.tone] }} />
            ))}
          </div>
          <div className="status-legend">
            {statusBreakdown.map((s, i) => (
              <div className="status-legend-item" key={i}>
                <span className="status-legend-dot" style={{ background: toneVar[s.tone] }} />
                {s.label} <b>{s.value}</b>
              </div>
            ))}
          </div>

          <div className="panel-head" style={{ marginTop: 22 }}>
            <div>
              <div className="panel-title" style={{ fontSize: 14 }}>
                Ringkasan Ticketing
              </div>
            </div>
          </div>
          <div className="ticket-grid">
            {tickets.map((t) => {
              const Icon = t.icon;
              return (
                <div className="ticket-card" key={t.label}>
                  <div className="ticket-icon">
                    <Icon size={15} />
                  </div>
                  <div className="ticket-num">{t.value}</div>
                  <div className="ticket-label">{t.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="panel">
          <div className="panel-head">
            <div>
              <div className="panel-title">Health Pulse</div>
              <div className="panel-note">Rata-rata seluruh kategori</div>
            </div>
          </div>
          <div className="ring-wrap">
            <HealthPulseRing percent={92.6} />
            <div className="ring-legend">
              {healthPulseLegend.map((l, i) => (
                <div className="ring-legend-item" key={i}>
                  <span className="ring-legend-dot" style={{ background: toneVar[l.tone] }} />
                  {l.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ---------- SERVER TABLE ---------- */}
      <div className="panel">
        <div className="panel-head">
          <div>
            <div className="panel-title">Total Server per Aplikasi</div>
            <div className="panel-note">Utilisasi server yang menangani masing-masing aplikasi</div>
          </div>
          <span className="link-btn">Lihat semua 128 aplikasi →</span>
        </div>

        <table className="server-table">
          <thead>
            <tr>
              <th>Aplikasi</th>
              <th>Kategori</th>
              <th>Server</th>
              <th>Utilisasi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {servers.map((row) => (
              <tr key={row.app}>
                <td>
                  <div className="app-name-cell">
                    <span className="app-dot" style={{ background: toneVar[row.tone] }} />
                    {row.app}
                  </div>
                </td>
                <td>{row.category}</td>
                <td>{row.total}</td>
                <td>
                  <div className="util-cell">
                    <ProgressBar value={row.util} color={toneVar[row.tone]} height={7} />
                    <span>{row.util}%</span>
                  </div>
                </td>
                <td>
                  <span className={`status-pill ${row.status === 'Live' ? 'pill-live' : 'pill-review'}`}>
                    {row.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </Layout>
  );
}
