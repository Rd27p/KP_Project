import { useState } from 'react';
import { Folder, Users, Mail, Zap } from 'lucide-react';
import Layout from '../components/layout';
import Table from '../components/table';
import '../style/Dashboard_Style.css';

const stats = [
    { label: 'Total Aplikasi', value: '24', change: '+3 bulan ini', icon: Folder },
    { label: 'Pengguna Aktif', value: '1,204', change: '+82 minggu ini', icon: Users },
    { label: 'Permintaan Akses', value: '7', change: '3 menunggu review', icon: Mail },
    { label: 'Uptime Sistem', value: '99.9%', change: '30 hari terakhir', icon: Zap },
];

const recentActivity = [
    { user: 'Dimas Prayoga', action: 'Mengakses aplikasi', target: 'GarasiBMW Portal', time: '5 menit lalu' },
    { user: 'Siti Rahma', action: 'Meminta akses', target: 'HRIS Telkomsel', time: '22 menit lalu' },
    { user: 'Fajar Nugroho', action: 'Login berhasil', target: 'App Catalog SSO', time: '1 jam lalu' },
    { user: 'Wulan Sari', action: 'Ditolak akses', target: 'Finance Dashboard', time: '3 jam lalu' },
    { user: 'Raka Adi', action: 'Menambahkan aplikasi baru', target: 'Inventory System', time: 'Kemarin' },
];

const activityColumns = [
    { key: 'user', label: 'Pengguna' },
    { key: 'action', label: 'Aksi' },
    { key: 'target', label: 'Target' },
    { key: 'time', label: 'Waktu', className: 'table-muted' },
];

function Dashboard() {
    const [user] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });

    return (
        <Layout title="Executive Summary">
            <div className="dashboard-content">
                <div className="dashboard-welcome">
                    <h1>Welcome back{user ? `, ${user.username}` : ''}</h1>
                    <p className="dashboard-subtitle">
                        {user
                            ? 'Berikut ringkasan aktivitas Application Catalog kamu hari ini.'
                            : 'Please log in to access your dashboard.'}
                    </p>
                </div>

                <div className="stats-grid">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <div className="stat-card" key={stat.label}>
                                <div className="stat-icon">
                                    <Icon size={22} strokeWidth={2.2} color="#FFFFFF" />
                                </div>
                                <div className="stat-info">
                                    <span className="stat-value">{stat.value}</span>
                                    <span className="stat-label">{stat.label}</span>
                                    <span className="stat-change">{stat.change}</span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <Table
                    title="Aktivitas Terbaru"
                    columns={activityColumns}
                    data={recentActivity}
                />
            </div>
        </Layout>
    );
}

export default Dashboard;
