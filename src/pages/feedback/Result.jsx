import { useState } from 'react';
import {
    FileText,
    FolderOpen,
    CheckCircle2,
    ArrowLeft,
    Check,
    MessageSquareWarning,
} from 'lucide-react';
import Layout from '../../components/Layout';
import ProgressBarList from '../../components/ProgressBar';
import '../../style/feedback_style/Main_Style.css';

const complaintSources = [
    { label: 'TEST1', value: 340 },
    { label: 'TEST3', value: 210 },
    { label: 'TEST2', value: 335 },
];

const totalComplaint = complaintSources.reduce((sum, item) => sum + item.value, 0);

const topCategories = [
    { label: 'Data Not Synchronize', value: 92 },
    { label: 'Reviewer User', value: 76 },
    { label: 'Ticketing Handling', value: 64 },
    { label: 'RH Visit', value: 58 },
    { label: 'KPI', value: 45 },
];

const resolutionStatus = [
    { label: 'Already Resolved', count: 512, tone: 'resolved' },
    { label: 'Closed by Dev', count: 188, tone: 'closed' },
    { label: 'Check', count: 96, tone: 'check' },
    { label: 'None', count: 89, tone: 'none' },
];

const complainSteps = [
    { id: 1, label: 'Personal Information' },
    { id: 2, label: 'Issue' },
    { id: 3, label: 'User Management' },
    { id: 4, label: 'Issue Description' },
];

const initialComplainData = {
    fullName: '',
    email: '',
    phone: '',
    regional: '',
    issueType: '',
    application: '',
    category: '',
    ldapUsername: '',
    role: '',
    description: '',
};

function Result() {
    const [view, setView] = useState('dashboard'); // 'dashboard' | 'complain'
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState(initialComplainData);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (currentStep < complainSteps.length) setCurrentStep((prev) => prev + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep((prev) => prev - 1);
    };

    const handleSubmit = () => {
        console.log('Complaint submitted:', formData);
        setSubmitted(true);
    };

    const backToDashboard = () => {
        setView('dashboard');
        setCurrentStep(1);
        setFormData(initialComplainData);
        setSubmitted(false);
    };

    if (view === 'complain') {
        if (submitted) {
            return (
                <Layout title="Feedback">
                    <div className="feedback-content">
                        <div className="feedback-success">
                            <div className="feedback-success-icon">
                                <Check size={32} strokeWidth={2.5} color="#FFFFFF" />
                            </div>
                            <h2>Keluhan Berhasil Diajukan</h2>
                            <p>
                                Terima kasih, {formData.fullName || 'Pengguna'}. Keluhan kamu terkait{' '}
                                <strong>{formData.application || 'aplikasi terkait'}</strong> sudah
                                diterima dan akan segera ditindaklanjuti.
                            </p>
                            <button className="feedback-btn-primary" onClick={backToDashboard}>
                                Kembali ke Result Feedback
                            </button>
                        </div>
                    </div>
                </Layout>
            );
        }

        return (
            <Layout title="Feedback">
                <div className="feedback-content">
                    <button className="feedback-back-btn" onClick={backToDashboard}>
                        <ArrowLeft size={16} strokeWidth={2} />
                        Kembali ke Result Feedback
                    </button>

                    <div className="feedback-breadcrumb">Leave Feedback / Complain</div>

                    <div className="feedback-stepper">
                        {complainSteps.map((step, index) => (
                            <div className="feedback-stepper-item" key={step.id}>
                                <div className="feedback-stepper-node">
                                    <div
                                        className={`feedback-stepper-circle ${
                                            currentStep === step.id
                                                ? 'active'
                                                : currentStep > step.id
                                                ? 'completed'
                                                : ''
                                        }`}
                                    >
                                        {currentStep > step.id ? (
                                            <Check size={14} strokeWidth={3} />
                                        ) : (
                                            step.id
                                        )}
                                    </div>
                                    <span
                                        className={`feedback-stepper-label ${
                                            currentStep === step.id ? 'active' : ''
                                        }`}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                                {index < complainSteps.length - 1 && (
                                    <div className="feedback-stepper-line" />
                                )}
                            </div>
                        ))}
                    </div>

                    <div className="feedback-form-card">
                        {currentStep === 1 && (
                            <>
                                <span className="feedback-form-badge">Please Inform Who You Are</span>
                                <div className="feedback-form-grid">
                                    <div className="form-group">
                                        <label htmlFor="fullName">Full Name *</label>
                                        <input
                                            id="fullName"
                                            name="fullName"
                                            type="text"
                                            placeholder="Type here..."
                                            value={formData.fullName}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            id="email"
                                            name="email"
                                            type="email"
                                            placeholder="Type here..."
                                            value={formData.email}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="phone">No Handphone (Whatsapp) *</label>
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
                                        <label htmlFor="regional">Regional *</label>
                                        <select
                                            id="regional"
                                            name="regional"
                                            value={formData.regional}
                                            onChange={handleChange}
                                        >
                                            <option value="">Pilih regional...</option>
                                            <option value="HQ">HQ</option>
                                            <option value="RI SUMBAGUT">RI SUMBAGUT</option>
                                            <option value="R4 WEST JAVA">R4 WEST JAVA</option>
                                            <option value="R6 EAST JAVA">R6 EAST JAVA</option>
                                        </select>
                                    </div>
                                    <div className="form-group feedback-form-full">
                                        <label htmlFor="issueType">I Have an Issue *</label>
                                        <select
                                            id="issueType"
                                            name="issueType"
                                            value={formData.issueType}
                                            onChange={handleChange}
                                        >
                                            <option value="">Pilih jenis isu...</option>
                                            <option value="Aplication Error">Aplication Error</option>
                                            <option value="Data Not Synchronize">Data Not Synchronize</option>
                                            <option value="Performance">Performance</option>
                                            <option value="User Management">User Management</option>
                                        </select>
                                    </div>
                                </div>
                            </>
                        )}

                        {currentStep === 2 && (
                            <>
                                <span className="feedback-form-badge">Issue Detail</span>
                                <div className="feedback-form-grid">
                                    <div className="form-group">
                                        <label htmlFor="application">Application</label>
                                        <input
                                            id="application"
                                            name="application"
                                            type="text"
                                            placeholder="Nama aplikasi terkait"
                                            value={formData.application}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="category">Category</label>
                                        <input
                                            id="category"
                                            name="category"
                                            type="text"
                                            placeholder="contoh: Ticketing Handling"
                                            value={formData.category}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {currentStep === 3 && (
                            <>
                                <span className="feedback-form-badge">User Management</span>
                                <div className="feedback-form-grid">
                                    <div className="form-group">
                                        <label htmlFor="ldapUsername">Username LDAP</label>
                                        <input
                                            id="ldapUsername"
                                            name="ldapUsername"
                                            type="text"
                                            placeholder="Type here..."
                                            value={formData.ldapUsername}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="role">Role / Jabatan</label>
                                        <input
                                            id="role"
                                            name="role"
                                            type="text"
                                            placeholder="Type here..."
                                            value={formData.role}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                            </>
                        )}

                        {currentStep === 4 && (
                            <>
                                <span className="feedback-form-badge">Issue Description</span>
                                <div className="form-group">
                                    <label htmlFor="description">Jelaskan Masalah Kamu</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        rows={5}
                                        placeholder="Ceritakan detail masalah yang kamu alami..."
                                        value={formData.description}
                                        onChange={handleChange}
                                    />
                                </div>
                            </>
                        )}

                        <div className="feedback-form-actions">
                            {currentStep > 1 ? (
                                <button className="feedback-btn-secondary" onClick={handleBack}>
                                    Back
                                </button>
                            ) : (
                                <div />
                            )}
                            <div className="feedback-form-actions-right">
                                {currentStep < complainSteps.length ? (
                                    <button className="feedback-btn-primary" onClick={handleNext}>
                                        Next
                                    </button>
                                ) : (
                                    <button className="feedback-btn-primary" onClick={handleSubmit}>
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

    return (
        <Layout title="Feedback">
            <div className="feedback-content">
                <div className="feedback-toolbar">
                    <div>
                        <h1 className="feedback-title">Result Feedback</h1>
                        <p className="feedback-subtitle">
                            Ringkasan keluhan dan umpan balik pengguna dari seluruh sumber.
                        </p>
                    </div>
                    <button className="feedback-complain-btn" onClick={() => setView('complain')}>
                        <MessageSquareWarning size={18} strokeWidth={2.2} />
                        I Want to Complain
                    </button>
                </div>

                <div className="feedback-stats-grid">
                    <div className="feedback-stat-card feedback-stat-total">
                        <div className="feedback-stat-icon">
                            <FileText size={22} strokeWidth={2.2} color="#FFFFFF" />
                        </div>
                        <div className="feedback-stat-info">
                            <span className="feedback-stat-value">{totalComplaint}</span>
                            <span className="feedback-stat-label">Total Complaint</span>
                        </div>
                    </div>

                    {complaintSources.map((source) => (
                        <div className="feedback-stat-card" key={source.label}>
                            <div className="feedback-stat-icon feedback-stat-icon-muted">
                                <FolderOpen size={20} strokeWidth={2} />
                            </div>
                            <div className="feedback-stat-info">
                                <span className="feedback-stat-value">{source.value}</span>
                                <span className="feedback-stat-label">{source.label}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="feedback-split">
                    <ProgressBarList title="Top Complaint Category" data={topCategories} />

                    <div className="feedback-resolution-card">
                        <h2 className="feedback-resolution-title">Complaint Resolution Status</h2>
                        <div className="feedback-resolution-list">
                            {resolutionStatus.map((item) => (
                                <div className="feedback-resolution-row" key={item.label}>
                                    <div className="feedback-resolution-left">
                                        <CheckCircle2
                                            size={16}
                                            strokeWidth={2}
                                            className={`feedback-resolution-icon feedback-resolution-icon-${item.tone}`}
                                        />
                                        <span>{item.label}</span>
                                    </div>
                                    <span className={`feedback-resolution-badge feedback-resolution-badge-${item.tone}`}>
                                        {item.count}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Result;