import { useState, useRef, useEffect } from 'react';
import { Bell, ShieldAlert, AlertTriangle } from 'lucide-react';
import Profile from '../pages/Profile';
import '../style/Header_Style.css';

const notifications = [
    {
        id: 1,
        type: 'critical',
        title: 'Security Alert',
        message: 'Finance Dashboard terdeteksi celah keamanan kritis.',
        time: '5 menit lalu',
    },
    {
        id: 2,
        type: 'critical',
        title: 'Server Down',
        message: 'Server GarasiBMW Portal tidak merespon sejak 08:42.',
        time: '18 menit lalu',
    },
    {
        id: 3,
        type: 'warning',
        title: 'Performance Warning',
        message: 'HRIS Telkomsel mengalami latensi tinggi (avg 2.4s).',
        time: '1 jam lalu',
    },
    {
        id: 4,
        type: 'warning',
        title: 'Sertifikat SSL',
        message: 'Sertifikat App Catalog SSO akan kedaluwarsa dalam 7 hari.',
        time: '3 jam lalu',
    },
];

const notificationIcon = {
    critical: ShieldAlert,
    warning: AlertTriangle,
};

function Header({ title = 'Dashboard', user }) {
    const [notifOpen, setNotifOpen] = useState(false);
    const notifRef = useRef(null);

    const criticalCount = notifications.filter((n) => n.type === 'critical').length;

    useEffect(() => {
        function handleClickOutside(e) {
            if (notifRef.current && !notifRef.current.contains(e.target)) {
                setNotifOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <header className="app-header">
            <h2 className="header-title">{title}</h2>

            <div className="header-right">
                <div className="notif-wrapper" ref={notifRef}>
                    <button
                        className="notif-bell-btn"
                        onClick={() => setNotifOpen((prev) => !prev)}
                        aria-label="Notifications"
                    >
                        <Bell size={19} strokeWidth={2} />
                        {notifications.length > 0 && (
                            <span className="notif-badge">{notifications.length}</span>
                        )}
                    </button>

                    {notifOpen && (
                        <div className="notif-dropdown">
                            <div className="notif-dropdown-header">
                                <span>Notifikasi</span>
                                {criticalCount > 0 && (
                                    <span className="notif-critical-count">
                                        {criticalCount} kritis
                                    </span>
                                )}
                            </div>

                            <div className="notif-list">
                                {notifications.length === 0 ? (
                                    <p className="notif-empty">Tidak ada notifikasi baru.</p>
                                ) : (
                                    notifications.map((notif) => {
                                        const Icon = notificationIcon[notif.type];
                                        return (
                                            <div className={`notif-item notif-${notif.type}`} key={notif.id}>
                                                <div className={`notif-icon notif-icon-${notif.type}`}>
                                                    <Icon size={16} strokeWidth={2.2} />
                                                </div>
                                                <div className="notif-item-body">
                                                    <span className="notif-item-title">{notif.title}</span>
                                                    <span className="notif-item-message">{notif.message}</span>
                                                    <span className="notif-item-time">{notif.time}</span>
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>
                    )}
                </div>

                <Profile user={user} />
            </div>
        </header>
    );
}

export default Header;
