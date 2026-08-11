import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, ClipboardList } from 'lucide-react';
import Layout from '../../components/Layout';
import '../../style/request_style/Main_Style.css';

const steps = [
    { id: 1, label: 'Application Summary' },
    { id: 2, label: 'Data Management' },
    { id: 3, label: 'Application Detail' },
    { id: 4, label: 'Asset Owner' },
    { id: 5, label: 'Review' },
];

const initialFormData = {
    // Step 1: Application Summary
    appName: '',
    appCategory: '',
    appDescription: '',
    appUrl: '',
    // Step 2: Data Management
    dataClassification: '',
    dataSource: '',
    dataRetention: '',
    // Step 3: Application Detail
    version: '',
    server: '',
    database: '',
    techStack: '',
    // Step 4: Asset Owner
    ownerName: '',
    ownerEmail: '',
    backupOwner: '',
};

function AppRegis() {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialFormData);
    const [submitted, setSubmitted] = useState(false);

    // Pengguna yang sedang login, dipakai untuk "nama pendaftar" di step Review.
    // Pola sama persis dengan Layout.jsx / Profile.jsx supaya konsisten.
    const [user] = useState(() => {
        try {
            const stored = localStorage.getItem('user');
            return stored ? JSON.parse(stored) : null;
        } catch {
            return null;
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep((prev) => prev + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep((prev) => prev - 1);
        }
    };

    const handleSubmit = () => {
        const payload = {
            ...formData,
            registrant: user?.username || null,
            registrantEmail: user?.email || null,
        };
        // TODO: Kirim payload ke API backend untuk diproses.
        console.log('Application registration submitted:', payload);
        setSubmitted(true);
    };

    // Data untuk step Review — dikelompokkan persis sama seperti struktur step 1-4,
    // supaya user gampang lihat "ini bagian mana yang saya isi".
    const reviewSections = [
        {
            title: 'Application Summary',
            rows: [
                { label: 'App Name', value: formData.appName },
                { label: 'Category', value: formData.appCategory },
                { label: 'Description', value: formData.appDescription },
                { label: 'Application URL', value: formData.appUrl },
            ],
        },
        {
            title: 'Data Management',
            rows: [
                { label: 'Data Classification', value: formData.dataClassification },
                { label: 'Data Source', value: formData.dataSource },
                { label: 'Data Retention Policy', value: formData.dataRetention },
            ],
        },
        {
            title: 'Application Detail',
            rows: [
                { label: 'Version', value: formData.version },
                { label: 'Server', value: formData.server },
                { label: 'Database', value: formData.database },
                { label: 'Technology Stack', value: formData.techStack },
            ],
        },
        {
            title: 'Asset Owner',
            rows: [
                { label: 'Owner Name', value: formData.ownerName },
                { label: 'Owner Email', value: formData.ownerEmail },
                { label: 'Backup Owner', value: formData.backupOwner },
            ],
        },
    ];

    if (submitted) {
        return (
            <Layout>
                <div className="request-content">
                    <div className="request-success">
                        <div className="request-success-icon">
                            <Check size={32} strokeWidth={2.5} color="#FFFFFF" />
                        </div>
                        <h2>Pendaftaran Aplikasi Berhasil</h2>
                        <p>
                            Aplikasi <strong>{formData.appName || 'baru'}</strong> telah didaftarkan oleh{' '}
                            <strong>{user?.username || 'Anda'}</strong> dan menunggu proses verifikasi.
                        </p>
                        <button className="request-btn-primary" onClick={() => navigate('/request')}>
                            Kembali ke Request
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="request-content">

                {/* Page header, no "Feedback" wording, matches BotRegis pattern */}
                <div className="request-page-header">
                    <div className="request-page-header-icon">
                        <ClipboardList size={22} strokeWidth={2.2} color="#FFFFFF" />
                    </div>
                    <div>
                        <h1 className="request-page-header-title">Application Registration</h1>
                        <p className="request-page-header-subtitle">
                            Daftarkan aplikasi baru beserta detail teknis dan pemilik asetnya.
                        </p>
                    </div>
                </div>

                {/* Stepper */}
                <div className="request-stepper">
                    {steps.map((step, index) => (
                        <div className="request-stepper-item" key={step.id}>
                            <div className="request-stepper-node">
                                <div
                                    className={`request-stepper-circle ${currentStep === step.id
                                        ? 'active'
                                        : currentStep > step.id
                                            ? 'completed'
                                            : ''
                                        }`}
                                >
                                    {currentStep > step.id ? <Check size={14} strokeWidth={3} /> : step.id}
                                </div>
                                <span
                                    className={`request-stepper-label ${currentStep === step.id ? 'active' : ''
                                        }`}
                                >
                                    {step.label}
                                </span>
                            </div>
                            {index < steps.length - 1 && <div className="request-stepper-line" />}
                        </div>
                    ))}
                </div>

                <div className="request-form-card">

                    {/* Step 1: Application Summary */}
                    {currentStep === 1 && (
                        <>
                            <span className="request-form-badge">Application Summary</span>
                            <div className="request-form-grid">
                                <div className="form-group">
                                    <label htmlFor="appName">App Name *</label>
                                    <input
                                        id="appName"
                                        name="appName"
                                        type="text"
                                        placeholder="Type here..."
                                        value={formData.appName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="appCategory">Category *</label>
                                    <input
                                        id="appCategory"
                                        name="appCategory"
                                        type="text"
                                        placeholder="Type here..."
                                        value={formData.appCategory}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group request-form-full">
                                    <label htmlFor="appDescription">Description</label>
                                    <textarea
                                        id="appDescription"
                                        name="appDescription"
                                        rows={3}
                                        placeholder="Type here..."
                                        value={formData.appDescription}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="appUrl">Application URL</label>
                                    <input
                                        id="appUrl"
                                        name="appUrl"
                                        type="text"
                                        placeholder="Type here..."
                                        value={formData.appUrl}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Step 2: Data Management */}
                    {currentStep === 2 && (
                        <>
                            <span className="request-form-badge">Data Management</span>
                            <div className="request-form-grid">
                                <div className="form-group">
                                    <label htmlFor="dataClassification">Data Classification</label>
                                    <input
                                        id="dataClassification"
                                        name="dataClassification"
                                        type="text"
                                        placeholder="contoh: Confidential"
                                        value={formData.dataClassification}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dataSource">Data Source</label>
                                    <input
                                        id="dataSource"
                                        name="dataSource"
                                        type="text"
                                        placeholder="Type here..."
                                        value={formData.dataSource}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group request-form-full">
                                    <label htmlFor="dataRetention">Data Retention Policy</label>
                                    <textarea
                                        id="dataRetention"
                                        name="dataRetention"
                                        rows={3}
                                        placeholder="Type here..."
                                        value={formData.dataRetention}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Step 3: Application Detail */}
                    {currentStep === 3 && (
                        <>
                            <span className="request-form-badge">Application Detail</span>
                            <div className="request-form-grid">
                                <div className="form-group">
                                    <label htmlFor="version">Version</label>
                                    <input
                                        id="version"
                                        name="version"
                                        type="text"
                                        placeholder="contoh: v1.0.0"
                                        value={formData.version}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="server">Server</label>
                                    <input
                                        id="server"
                                        name="server"
                                        type="text"
                                        placeholder="Type here..."
                                        value={formData.server}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="database">Database</label>
                                    <input
                                        id="database"
                                        name="database"
                                        type="text"
                                        placeholder="Type here..."
                                        value={formData.database}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="techStack">Technology Stack</label>
                                    <input
                                        id="techStack"
                                        name="techStack"
                                        type="text"
                                        placeholder="contoh: React, Laravel"
                                        value={formData.techStack}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Step 4: Asset Owner */}
                    {currentStep === 4 && (
                        <>
                            <span className="request-form-badge">Asset Owner</span>
                            <div className="request-form-grid">
                                <div className="form-group">
                                    <label htmlFor="ownerName">Owner Name</label>
                                    <input
                                        id="ownerName"
                                        name="ownerName"
                                        type="text"
                                        placeholder="Type here..."
                                        value={formData.ownerName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="ownerEmail">Owner Email</label>
                                    <input
                                        id="ownerEmail"
                                        name="ownerEmail"
                                        type="email"
                                        placeholder="Type here..."
                                        value={formData.ownerEmail}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="form-group request-form-full">
                                    <label htmlFor="backupOwner">Backup Owner</label>
                                    <input
                                        id="backupOwner"
                                        name="backupOwner"
                                        type="text"
                                        placeholder="Type here..."
                                        value={formData.backupOwner}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>
                        </>
                    )}

                    {/* Step 5: Review */}
                    {currentStep === 5 && (
                        <>
                            <span className="request-form-badge">Review</span>

                            <div className="request-review-registrant">
                                <span className="request-review-registrant-avatar">
                                    {(user?.username || 'GU').slice(0, 2).toUpperCase()}
                                </span>
                                <div>
                                    <p className="request-review-registrant-label">Didaftarkan oleh</p>
                                    <p className="request-review-registrant-name">
                                        {user?.username || 'Pengguna tidak dikenal'}
                                    </p>
                                    {user?.email && (
                                        <p className="request-review-registrant-email">{user.email}</p>
                                    )}
                                </div>
                            </div>

                            {reviewSections.map((section) => (
                                <div className="request-review-section" key={section.title}>
                                    <p className="request-review-section-title">{section.title}</p>
                                    <div className="request-summary-list">
                                        {section.rows.map((row) => (
                                            <div className="request-summary-row" key={row.label}>
                                                <span>{row.label}</span>
                                                <span className={!row.value ? 'request-summary-empty' : ''}>
                                                    {row.value || 'Belum diisi'}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </>
                    )}

                    <div className="request-form-actions">
                        {currentStep > 1 && (
                            <button className="request-btn-secondary" onClick={handleBack}>
                                Back
                            </button>
                        )}
                        <div className="request-form-actions-right">
                            {currentStep < steps.length ? (
                                <button className="request-btn-primary" onClick={handleNext}>
                                    Next
                                </button>
                            ) : (
                                <button className="request-btn-primary" onClick={handleSubmit}>
                                    Submit
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default AppRegis;