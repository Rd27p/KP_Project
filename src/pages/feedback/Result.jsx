import { useState } from 'react';
import {
    FileText,
    ArrowLeft,
    Check,
    MessageSquareWarning,
} from 'lucide-react';
import Layout from '../../components/Layout';
import ProgressBar from '../../components/ProgressBar';
import Table from '../../components/Table';
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
const maxCategoryValue = Math.max(...topCategories.map((c) => c.value));

const resolutionStatus = [
    { label: 'Already Resolved', count: 512, tone: 'resolved', color: 'var(--green)' },
    { label: 'Closed by Dev', count: 188, tone: 'closed', color: 'var(--navy)' },
    { label: 'Check', count: 96, tone: 'check', color: 'var(--amber)' },
    { label: 'None', count: 89, tone: 'none', color: 'var(--ink-soft)' },
];
const totalResolution = resolutionStatus.reduce((sum, item) => sum + item.count, 0);

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

const sourceColumns = [
    { key: 'label', label: 'Source' },
    { key: 'value', label: 'Complaints', className: 'table-num' },
    {
        key: 'share',
        label: 'Share',
        className: 'table-num',
        render: (row) => `${((row.value / totalComplaint) * 100).toFixed(1)}%`,
    },
];

const resolutionColumns = [
    {
        key: 'label',
        label: 'Status',
        render: (row) => (
            <span className="table-status-cell">
                <span className="status-dot" style={{ background: row.color }} />
                {row.label}
            </span>
        ),
    },
    { key: 'count', label: 'Count', className: 'table-num' },
    {
        key: 'progress',
        label: 'Proportion',
        render: (row) => (
            <div className="table-progress-cell">
                <ProgressBar value={(row.count / totalResolution) * 100} color={row.color} height={7} />
            </div>
        ),
    },
];

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
                <Layout>
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
            <Layout>
                <div className="feedback-content">
                    <button className="feedback-back-btn" onClick={backToDashboard}>
                        <ArrowLeft size={16} strokeWidth={2} />
                        Kembali ke Result Feedback
                    </button>


                    <div className="feedback-stepper">
                        {complainSteps.map((step, index) => (
                            <div className="feedback-stepper-item" key={step.id}>
                                <div className="feedback-stepper-node">
                                    <div
                                        className={`feedback-stepper-circle ${currentStep === step.id
                                            ? 'active'
                                            : currentStep > step.id
                                                ? 'completed'
                                                : ''
                                            }`}
                                    >
                                        {currentStep > step.id ? <Check size={14} strokeWidth={3} /> : step.id}
                                    </div>
                                    <span
                                        className={`feedback-stepper-label ${currentStep === step.id ? 'active' : ''
                                            }`}
                                    >
                                        {step.label}
                                    </span>
                                </div>
                                {index < complainSteps.length - 1 && <div className="feedback-stepper-line" />}
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
        <Layout>
            <div className="feedback-content">
                {/* Hero card matching Security Assessment style */}
                <div className="feedback-hero-card">
                    <button className="feedback-complain-btn" onClick={() => setView('complain')}>
                        <MessageSquareWarning size={18} strokeWidth={2.2} />
                        I Want to Complain
                    </button>
                </div>

                <div className="feedback-split">
                    <div className="panel">
                        <div className="panel-head">
                            <div>
                                <div className="panel-title">Top Complaint Category</div>
                                <div className="panel-note">Share of total by issue type</div>
                            </div>
                        </div>
                        <div className="category-list">
                            {topCategories.map((cat) => (
                                <div className="category-row" key={cat.label}>
                                    <div className="category-row-top">
                                        <span>{cat.label}</span>
                                        <span className="category-value">{cat.value}</span>
                                    </div>
                                    <ProgressBar
                                        value={(cat.value / maxCategoryValue) * 100}
                                        color="var(--red)"
                                        height={7}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    <Table
                        title="Complaint Sources"
                        columns={sourceColumns}
                        data={complaintSources}
                        emptyMessage="Belum ada sumber keluhan."
                    />
                </div>

                <Table
                    title="Complaint Resolution Status"
                    columns={resolutionColumns}
                    data={resolutionStatus}
                    emptyMessage="Belum ada data resolusi."
                />
            </div>
        </Layout>
    );
}

export default Result;
