import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Check, Server } from 'lucide-react';
import Layout from '../../components/Layout';
import '../../style/oss_style/Main_Style.css';

const VENDOR_OPTIONS = ['Nokia', 'Huawei', 'Ericsson', 'ZTE', 'Cisco', 'Juniper Networks'];

const COVERAGE_AREA_OPTIONS = ['Sumabagut', 'Sumagteng', 'Sumagsel', 'Jabo Inner', 'Jabo Outer', 'Nasional'];

const OS_TYPE_OPTIONS = [
    'Linux (RHEL)',
    'Linux (Ubuntu)',
    'Windows Server',
    'Cisco IOS-XR',
    'Junos OS',
    'Unix (Solaris)',
    'Embedded / Proprietary',
];

const SERVER_LOCATION_OPTIONS = [
    'Data Center Jakarta',
    'Data Center Bandung',
    'Data Center Surabaya',
    'Data Center Medan',
    'Cloud (AWS)',
    'Cloud (GCP)',
];

const LICENSE_OPTIONS = ['09/01/2027V2', '15/03/2026V1', '22/11/2025V3', 'Belum ada sertifikat'];

const initialFormData = {
    vendor: VENDOR_OPTIONS[0],
    applicationName: '',
    ipAddress: '',
    hostname: '',
    url: '',
    coverageArea: '',
    osType: '',
    serverLocation: '',
    details: '',
    serialNumber: '',
    rackLocation: '',
    licensedCertificate: LICENSE_OPTIONS[0],
    tsaStatus: '',
};

function Add_OSS() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState(initialFormData);
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Kirim formData ke API backend untuk diproses.
        console.log('OSS registration submitted:', formData);
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <Layout>
                <div className="oss-page">
                    <div className="oss-form-success">
                        <div className="oss-form-success-icon">
                            <Check size={32} strokeWidth={2.5} color="#FFFFFF" />
                        </div>
                        <h2>OSS Berhasil Ditambahkan</h2>
                        <p>
                            <strong>{formData.applicationName || 'Perangkat baru'}</strong> dari vendor{' '}
                            <strong>{formData.vendor}</strong> telah tercatat di inventaris OSS.
                        </p>
                        <button className="oss-btn-primary" onClick={() => navigate('/oss-data')}>
                            Kembali ke OSS Data Integration
                        </button>
                    </div>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="oss-page">
                <button type="button" className="oss-form-back-btn" onClick={() => navigate('/oss-data')}>
                    <ArrowLeft size={16} strokeWidth={2} />
                    Back to OSS Data Integration
                </button>

                <form className="oss-form-card" onSubmit={handleSubmit}>
                    <div className="oss-form-title-row">
                        <div className="oss-form-header-icon">
                            <Server size={18} strokeWidth={2.2} color="#FFFFFF" />
                        </div>
                        <h2 className="oss-form-title">Create New OSS Details</h2>
                    </div>

                    <div className="oss-form-grid">
                        <div className="oss-form-group">
                            <label htmlFor="vendor">Vendor</label>
                            <select id="vendor" name="vendor" value={formData.vendor} onChange={handleChange}>
                                {VENDOR_OPTIONS.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="oss-form-group">
                            <label htmlFor="applicationName">Application Name</label>
                            <input
                                id="applicationName"
                                name="applicationName"
                                type="text"
                                placeholder="e.g. Nokia NC10"
                                value={formData.applicationName}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="oss-form-group">
                            <label htmlFor="ipAddress">IP Address</label>
                            <input
                                id="ipAddress"
                                name="ipAddress"
                                type="text"
                                placeholder="e.g. 10.40.48.9"
                                value={formData.ipAddress}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="oss-form-group">
                            <label htmlFor="hostname">Hostname</label>
                            <input
                                id="hostname"
                                name="hostname"
                                type="text"
                                placeholder="e.g. oss-srv-01"
                                value={formData.hostname}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="oss-form-group">
                            <label htmlFor="url">URL</label>
                            <input
                                id="url"
                                name="url"
                                type="text"
                                placeholder="e.g. https://nokia-nc10.internal"
                                value={formData.url}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="oss-form-group">
                            <label htmlFor="coverageArea">Coverage Area</label>
                            <select id="coverageArea" name="coverageArea" value={formData.coverageArea} onChange={handleChange}>
                                <option value="">Select coverage area</option>
                                {COVERAGE_AREA_OPTIONS.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="oss-form-group">
                            <label htmlFor="osType">OS Type</label>
                            <select id="osType" name="osType" value={formData.osType} onChange={handleChange}>
                                <option value="">Select operating system</option>
                                {OS_TYPE_OPTIONS.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="oss-form-group">
                            <label htmlFor="serverLocation">Server Location</label>
                            <select id="serverLocation" name="serverLocation" value={formData.serverLocation} onChange={handleChange}>
                                <option value="">Select datacenter region</option>
                                {SERVER_LOCATION_OPTIONS.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="oss-form-group">
                            <label htmlFor="details">Details</label>
                            <input
                                id="details"
                                name="details"
                                type="text"
                                placeholder="Hardware Only"
                                value={formData.details}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="oss-form-group">
                            <label htmlFor="serialNumber">Serial Number</label>
                            <input
                                id="serialNumber"
                                name="serialNumber"
                                type="text"
                                placeholder="e.g. 6804701018969206893741248"
                                value={formData.serialNumber}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="oss-form-group">
                            <label htmlFor="rackLocation">Rack Location</label>
                            <input
                                id="rackLocation"
                                name="rackLocation"
                                type="text"
                                placeholder="e.g. Rack 04, Slot B"
                                value={formData.rackLocation}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="oss-form-group">
                            <label htmlFor="licensedCertificate">Licensed Sertifikat</label>
                            <select
                                id="licensedCertificate"
                                name="licensedCertificate"
                                value={formData.licensedCertificate}
                                onChange={handleChange}
                            >
                                {LICENSE_OPTIONS.map((option) => (
                                    <option key={option} value={option}>{option}</option>
                                ))}
                            </select>
                        </div>

                        <div className="oss-form-group">
                            <label htmlFor="tsaStatus">TSA Status</label>
                            <input
                                id="tsaStatus"
                                name="tsaStatus"
                                type="text"
                                placeholder="e.g. Evaluated / Active"
                                value={formData.tsaStatus}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <div className="oss-form-actions">
                        <button type="button" className="oss-btn-secondary" onClick={() => navigate('/oss-data')}>
                            Cancel
                        </button>
                        <button type="submit" className="oss-btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </Layout>
    );
}

export default Add_OSS;