import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Check, Trash2,} from 'lucide-react';
import Layout from '../../components/Layout';
import { applications } from './Application_Data';
import '../../style/app_portofolio_style/Main_Style.css';

const compareFields = [
  { key: 'category', label: 'Kategori' },
  { key: 'owner', label: 'Owner' },
  { key: 'status', label: 'Status' },
  { key: 'updated', label: 'Update Terakhir' },
  { key: 'description', label: 'Deskripsi' },
  { key: 'version', label: 'Versi' },
  { key: 'url', label: 'URL' },
  { key: 'uptime', label: 'Uptime' },
  { key: 'server', label: 'Server' },
  { key: 'database', label: 'Database' },
  { key: 'sla', label: 'SLA' },
  { key: 'documentation', label: 'Dokumentasi' },
  { key: 'supportContact', label: 'Support' },
];

const statusColor = {
  Active: 'badge-active',
  Maintenance: 'badge-maintenance',
  Inactive: 'badge-inactive',
};

function Compare() {
  const navigate = useNavigate();
  const [selectedIds, setSelectedIds] = useState([]);
  const [filter, setFilter] = useState('');

  const filteredApps = useMemo(() => {
    const q = filter.toLowerCase();
    return applications.filter(
      (app) =>
        app.name.toLowerCase().includes(q) ||
        app.category.toLowerCase().includes(q) ||
        app.owner.toLowerCase().includes(q)
    );
  }, [filter]);

  const selectedApps = useMemo(
    () => applications.filter((app) => selectedIds.includes(app.id)),
    [selectedIds]
  );

  const toggleSelect = (id) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((value) => value !== id);
      }
      if (prev.length >= 4) return prev;
      return [...prev, id];
    });
  };

  const clearSelection = () => setSelectedIds([]);

  return (
    <Layout>
      <div className="portofolio-content">
        <div className="compare-header">
          <button type="button" className="compare-back-btn" onClick={() => navigate('/applications')}>
            <ArrowLeft size={16} />
            Back to Portfolio
          </button>
          <div>
            <h1>Compare Applications</h1>
            <p>Bandingkan hingga 4 aplikasi secara berdampingan untuk melihat perbedaan teknis dan operasional.</p>
          </div>
        </div>

        <div className="compare-meta-row">
          <div className="compare-selection-state">
            <span>{selectedApps.length} aplikasi dipilih</span>
            <span>Minimal 2 aplikasi diperlukan untuk membandingkan.</span>
          </div>
          <button type="button" className="compare-clear-btn" onClick={clearSelection}>
            <Trash2 size={14} />
            Clear selection
          </button>
        </div>

        <div className="compare-panel">
          <div className="compare-panel-column">
            <div className="compare-filter">
              <Search size={18} strokeWidth={2} />
              <input
                type="text"
                placeholder="Cari aplikasi untuk dibandingkan..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>

            <div className="compare-app-list">
              <div className="compare-app-list-header">
                <span>Daftar aplikasi</span>
                <span>Centang aplikasi untuk dibandingkan</span>
              </div>

              <div className="compare-app-list-body">
                {filteredApps.map((app) => (
                  <button
                    key={app.id}
                    type="button"
                    className={`compare-app-row ${selectedIds.includes(app.id) ? 'active' : ''}`}
                    onClick={() => toggleSelect(app.id)}
                  >
                    <div>
                      <strong>{app.name}</strong>
                      <span>{app.category} · {app.owner}</span>
                    </div>
                    <div className="compare-app-row-action">
                      {selectedIds.includes(app.id) ? <Check size={16} /> : <span>{selectedIds.length < 4 ? 'Select' : 'Max 4'}</span>}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="compare-panel-column">
            {selectedApps.length >= 2 ? (
              <div className="compare-table-wrap">
                <table className="compare-table">
                  <thead>
                    <tr>
                      <th>Field</th>
                      {selectedApps.map((app) => (
                        <th key={app.id}>{app.name}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {compareFields.map((field) => (
                      <tr key={field.key}>
                        <td>{field.label}</td>
                        {selectedApps.map((app) => (
                          <td key={app.id}>
                            {field.key === 'status' ? (
                              <span className={`status-badge ${statusColor[app.status]}`}>{app.status}</span>
                            ) : (
                              app[field.key] || '-'
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="compare-empty-state">
                <p>Pilih setidaknya 2 aplikasi untuk melihat perbandingan.</p>
                <p>Kamu bisa memilih sampai 4 aplikasi sekaligus.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Compare;
