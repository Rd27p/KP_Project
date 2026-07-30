import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, UserPlus } from 'lucide-react';
import Layout from '../../components/Layout';
import { applications } from '../app_portofolio/Application_Data';
import '../../style/user_access_style/Main_Style.css';

const accessLevels = ['Read Only', 'Read & Write', 'Admin'];

function UserAccessRegis() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        ldapUsername: '',
        nik: '',
        fullName: '',
        email: '',
        phone: '',
        department: '',
        applicationRequested: '',
        accessLevel: '',
        reason: '',
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        const requiredFields = [
            'ldapUsername',
            'nik',
            'fullName',
            'email',
            'department',
            'applicationRequested',
            'accessLevel',
        ];
        const isIncomplete = requiredFields.some((field) => !formData[field]);

        if (isIncomplete) {
            setError('Mohon lengkapi semua field yang wajib diisi.');
            return;
        }

        // TODO: Kirim data ke API backend untuk diproses tim approval.
        console.log('Access request submitted:', formData);
        setSuccess(true);
    };

    if (success) {
        return (
            <Layout title="User Access - Registration">
                <div className="user-access-content">
                    <div className="user-access-success">
                        <div className="user-access-success-icon">
                            <UserPlus size={32} strokeWidth={1.8} />
                        </div>
                        <h2>Permintaan Berhasil Diajukan</h2>
                        <p>
                            Permintaan akses kamu untuk aplikasi{' '}
                            <strong>{formData.applicationRequested}</strong> sudah dikirim dan
                            menunggu persetujuan tim terkait.
                        </p>
                        <button
                            className="user-access-add-btn"
                            onClick={() => navigate('/user-access')}
                        >
                            Kembali ke User Access
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout title="User Access - Registration">
            <div className="user-access-content">
                <button className="user-access-back-btn" onClick={() => navigate('/user-access')}>
                    <ArrowLeft size={16} strokeWidth={2} />
                    Kembali ke User Access
                </button>

                <div className="user-access-form-card">
                    <h1 className="user-access-title">Formulir Pendaftaran Akses</h1>
                    <p className="user-access-subtitle">
                        Lengkapi data berikut untuk mengajukan whitelisting akses ke aplikasi tertentu.
                    </p>

                    {error && <div className="user-access-error">{error}</div>}

                    <form onSubmit={handleSubmit} className="user-access-form">
                        <div className="user-access-form-section">
                            <h3 className="user-access-section-title">Data Pribadi</h3>

                            <div className="user-access-form-grid">
                                <div className="form-group">
                                    <label htmlFor="ldapUsername">Username LDAP</label>
                                    <input
                                        id="ldapUsername"
                                        name="ldapUsername"
                                        type="text"
                                        placeholder="contoh: raka.adi"
                                        value={formData.ldapUsername}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="nik">NIK</label>
                                    <input
                                        id="nik"
                                        name="nik"
                                        type="text"
                                        placeholder="Nomor Induk Karyawan"
                                        value={formData.nik}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="fullName">Nama Lengkap</label>
                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        placeholder="Nama sesuai identitas"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="nama@telkomsel.internal"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="phone">Nomor Telepon</label>
                                    <input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="08xxxxxxxxxx"
                                        value={formData.phone}
                                        onChange={handleChange}
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="department">Divisi / Departemen</label>
                                    <input
                                        id="department"
                                        name="department"
                                        type="text"
                                        placeholder="contoh: IT Infrastructure"
                                        value={formData.department}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="user-access-form-section">
                            <h3 className="user-access-section-title">Informasi Akses yang Diminta</h3>

                            <div className="user-access-form-grid">
                                <div className="form-group">
                                    <label htmlFor="applicationRequested">Aplikasi yang Diminta</label>
                                    <select
                                        id="applicationRequested"
                                        name="applicationRequested"
                                        value={formData.applicationRequested}
                                        onChange={handleChange}
                                    >
                                        <option value="">Pilih aplikasi</option>
                                        {applications.map((app) => (
                                            <option key={app.id} value={app.name}>
                                                {app.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="accessLevel">Level Akses</label>
                                    <select
                                        id="accessLevel"
                                        name="accessLevel"
                                        value={formData.accessLevel}
                                        onChange={handleChange}
                                    >
                                        <option value="">Pilih level akses</option>
                                        {accessLevels.map((level) => (
                                            <option key={level} value={level}>
                                                {level}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="form-group">
                                <label htmlFor="reason">Alasan Pengajuan</label>
                                <textarea
                                    id="reason"
                                    name="reason"
                                    rows={4}
                                    placeholder="Jelaskan alasan kamu membutuhkan akses ini..."
                                    value={formData.reason}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <button type="submit" className="user-access-submit-btn">
                            Ajukan Permintaan
                        </button>
                    </form>
                </div>
            </div>
        </Layout>
    );
}

export default UserAccessRegis;