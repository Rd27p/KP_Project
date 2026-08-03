import { useNavigate } from 'react-router-dom';
import { UserCheck, Plus } from 'lucide-react';
import Layout from '../../components/Layout';
import Table from '../../components/Table';
import '../../style/user_access_style/Main_Style.css';

// Belum ada data permintaan akses. Kalau nanti sudah terhubung ke API/backend,
// tinggal ganti array kosong ini dengan data asli dari server.
const accessRequests = [];

const columns = [
    { key: 'fullName', label: 'Nama Lengkap' },
    { key: 'nik', label: 'NIK' },
    { key: 'application', label: 'Aplikasi Diminta' },
    { key: 'requestDate', label: 'Tanggal Pengajuan', className: 'table-muted' },
    { key: 'status', label: 'Status' },
];

function UserAccessMain() {
    const navigate = useNavigate();

    return (
        <Layout>
            <div className="user-access-content">
                <div className="user-access-hero">
                    <div className="user-access-hero-left">
                        <div className="user-access-hero-eyebrow">Review akses</div>
                        <h1 className="user-access-hero-title">Permintaan Akses Pengguna</h1>
                        <p className="user-access-hero-desc">Pastikan izin aplikasi tetap aman dan terkontrol. Ajukan permintaan akses atau tinjau statusnya dari satu halaman.</p>
                    </div>
                    <button
                        className="user-access-add-btn"
                        onClick={() => navigate('/user-access/register')}
                    >
                        <Plus size={18} strokeWidth={2.2} />
                        Ajukan Permintaan Akses
                    </button>
                </div>

                {accessRequests.length === 0 ? (
                    <div className="user-access-empty">
                        <div className="user-access-empty-icon">
                            <UserCheck size={32} strokeWidth={1.8} />
                        </div>
                        <h2 className="user-access-empty-title">Belum ada permintaan akses</h2>
                        <p className="user-access-empty-text">
                            Saat ini tidak ada permintaan akses pengguna yang perlu disetujui.
                            Permintaan baru akan muncul di sini setelah diajukan.
                        </p>
                        <button
                            className="user-access-add-btn"
                            onClick={() => navigate('/user-access/register')}
                        >
                            <Plus size={18} strokeWidth={2.2} />
                            Ajukan Permintaan Akses
                        </button>
                    </div>
                ) : (
                    <Table
                        title="Daftar Permintaan Akses"
                        columns={columns}
                        data={accessRequests}
                        emptyMessage="Belum ada permintaan akses."
                    />
                )}
            </div>
        </Layout>
    );
}

export default UserAccessMain;