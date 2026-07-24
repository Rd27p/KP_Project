import { useState } from 'react';
import { Folder, CheckCircle2, Layers, AlertTriangle } from 'lucide-react';
import Layout from '../components/layout';
import Table from '../components/table';
import { applications } from './app_portofolio/Application_Data';
import '../style/Dashboard_Style.css';

const totalApps = applications.length;
const activeApps = applications.filter((app) => app.status === 'Active').length;
const totalCategories = new Set(applications.map((app) => app.category)).size;
const needsAttention = applications.filter(
    (app) => app.status === 'Maintenance' || app.status === 'Inactive'
).length;

const stats = [
    { label: 'Total Aplikasi', value: totalApps, change: `${totalCategories} kategori`, icon: Folder },
    { label: 'Aplikasi Aktif', value: activeApps, change: `${totalApps - activeApps} lainnya`, icon: CheckCircle2 },
    { label: 'Total Kategori', value: totalCategories, change: 'Berdasarkan portofolio', icon: Layers },
    { label: 'Perlu Perhatian', value: needsAttention, change: 'Maintenance / Inactive', icon: AlertTriangle },
];

const recentActivity = [...applications]
    .sort((a, b) => new Date(b.updated) - new Date(a.updated))
    .slice(0, 5)
    .map((app) => ({
        user: app.owner,
        action: 'Memperbarui aplikasi',
        target: app.name,
        time: app.updated,
    }));

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
                    title="Aplikasi Terbaru Diperbarui"
                    columns={activityColumns}
                    data={recentActivity}
                />
            </div>
        </Layout>
    );
}

export default Dashboard;
