import { useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, Check, Trash2, Columns3, Grid2x2, X, Highlighter } from 'lucide-react';
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

const PIVOT_FIELDS = [
  { key: 'category', label: 'Kategori' },
  { key: 'status', label: 'Status' },
  { key: 'owner', label: 'Owner' },
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
  const [viewMode, setViewMode] = useState('sidebyside'); // 'sidebyside' | 'pivot'
  const [pivotRowField, setPivotRowField] = useState('category');
  const [pivotColField, setPivotColField] = useState('status');
  const [drilldown, setDrilldown] = useState(null); // { rowValue, colValue, apps }
  const [highlightDiff, setHighlightDiff] = useState(false);
  const filterInputRef = useRef(null);

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

  const removeFromCompare = (id) => {
    setSelectedIds((prev) => prev.filter((value) => value !== id));
  };

  const clearSelection = () => setSelectedIds([]);

  const focusSearch = () => filterInputRef.current?.focus();

  // ---------- Diff perbandingan (dipakai untuk highlight & badge ringkasan) ----------
  const fieldDiffs = useMemo(() => {
    if (selectedApps.length < 2) return [];
    return compareFields.map((field) => {
      const values = selectedApps.map((app) => app[field.key] ?? '-');
      return { key: field.key, differs: !values.every((v) => v === values[0]) };
    });
  }, [selectedApps]);

  const diffByKey = useMemo(
    () => Object.fromEntries(fieldDiffs.map((f) => [f.key, f.differs])),
    [fieldDiffs]
  );

  const diffCount = fieldDiffs.filter((f) => f.differs).length;

  // ---------- Pivot table ----------
  const pivotRowLabel = PIVOT_FIELDS.find((f) => f.key === pivotRowField)?.label;
  const pivotColLabel = PIVOT_FIELDS.find((f) => f.key === pivotColField)?.label;

  const pivotRows = useMemo(
    () => [...new Set(applications.map((a) => a[pivotRowField]))].filter(Boolean).sort(),
    [pivotRowField]
  );
  const pivotCols = useMemo(
    () => [...new Set(applications.map((a) => a[pivotColField]))].filter(Boolean).sort(),
    [pivotColField]
  );

  function appsInCell(rowValue, colValue) {
    return applications.filter((a) => a[pivotRowField] === rowValue && a[pivotColField] === colValue);
  }

  function handlePivotRowChange(value) {
    setPivotRowField(value);
    setDrilldown(null);
    if (value === pivotColField) {
      const fallback = PIVOT_FIELDS.find((f) => f.key !== value);
      setPivotColField(fallback.key);
    }
  }

  function handlePivotColChange(value) {
    setPivotColField(value);
    setDrilldown(null);
  }

  return (
    <Layout>
      <div className="portofolio-content">
        <div className="compare-header">
          <button type="button" className="compare-back-btn" onClick={() => navigate('/applications')}>
            <ArrowLeft size={16} />
            Back to Portfolio
          </button>
        </div>

        <div className="compare-meta-row">
          <div className="compare-selection-state">
            <span>{selectedApps.length} aplikasi dipilih</span>
            <span>Minimal 2 aplikasi diperlukan untuk membandingkan.</span>
          </div>

          <div className="compare-meta-actions">
            <div className="view-toggle" role="tablist" aria-label="Mode perbandingan">
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'sidebyside' ? 'active' : ''}`}
                onClick={() => setViewMode('sidebyside')}
              >
                <Columns3 size={14} strokeWidth={2} />
                Side-by-side
              </button>
              <button
                type="button"
                className={`view-toggle-btn ${viewMode === 'pivot' ? 'active' : ''}`}
                onClick={() => setViewMode('pivot')}
              >
                <Grid2x2 size={14} strokeWidth={2} />
                Pivot
              </button>
            </div>

            <button type="button" className="compare-clear-btn" onClick={clearSelection}>
              <Trash2 size={14} />
              Clear selection
            </button>
          </div>
        </div>

        {viewMode === 'sidebyside' ? (
          <div className="compare-panel">
            <div className="compare-panel-column">
              <div className="compare-filter">
                <Search size={18} strokeWidth={2} />
                <input
                  ref={filterInputRef}
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
                <>
                  <div className="compare-table-toolbar">
                    <button
                      type="button"
                      className={`compare-highlight-toggle ${highlightDiff ? 'active' : ''}`}
                      onClick={() => setHighlightDiff((v) => !v)}
                    >
                      <Highlighter size={14} strokeWidth={2} />
                      Highlight perbedaan
                    </button>
                    <span className="compare-diff-badge">
                      {diffCount} dari {compareFields.length} field berbeda
                    </span>
                  </div>

                  <div className="compare-table-wrap">
                    <table className="compare-table">
                      <thead>
                        <tr>
                          <th>Field</th>
                          {selectedApps.map((app) => (
                            <th key={app.id}>
                              <div className="compare-th-app">
                                <span>{app.name}</span>
                                <button
                                  type="button"
                                  className="compare-th-remove"
                                  onClick={() => removeFromCompare(app.id)}
                                  aria-label={`Hapus ${app.name} dari perbandingan`}
                                  title="Hapus dari perbandingan"
                                >
                                  <X size={13} strokeWidth={2.4} />
                                </button>
                              </div>
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {compareFields.map((field) => {
                          const rowDiffers = highlightDiff && diffByKey[field.key];
                          return (
                            <tr key={field.key} className={rowDiffers ? 'diff-row' : ''}>
                              <td>{field.label}</td>
                              {selectedApps.map((app) => (
                                <td key={app.id} className={rowDiffers ? 'diff-cell' : ''}>
                                  {field.key === 'status' ? (
                                    <span className={`status-badge ${statusColor[app.status]}`}>{app.status}</span>
                                  ) : (
                                    app[field.key] || '-'
                                  )}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </>
              ) : (
                <div className="compare-empty-state">
                  <p>Pilih setidaknya 2 aplikasi untuk melihat perbandingan.</p>
                  <p>Kamu bisa memilih sampai 4 aplikasi sekaligus, dari sini atau dari tab Pivot.</p>
                  <button type="button" className="compare-empty-cta" onClick={focusSearch}>
                    <Search size={14} strokeWidth={2} />
                    Cari aplikasi
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="pivot-panel">
            <div className="pivot-controls">
              <label className="pivot-control">
                Baris
                <select value={pivotRowField} onChange={(e) => handlePivotRowChange(e.target.value)}>
                  {PIVOT_FIELDS.map((f) => (
                    <option key={f.key} value={f.key}>{f.label}</option>
                  ))}
                </select>
              </label>
              <label className="pivot-control">
                Kolom
                <select value={pivotColField} onChange={(e) => handlePivotColChange(e.target.value)}>
                  {PIVOT_FIELDS.filter((f) => f.key !== pivotRowField).map((f) => (
                    <option key={f.key} value={f.key}>{f.label}</option>
                  ))}
                </select>
              </label>
              <p className="pivot-hint">Klik angka di sel untuk melihat & memilih aplikasi di perpotongan itu.</p>
            </div>

            <div className="pivot-table-wrap">
              <table className="pivot-table">
                <thead>
                  <tr>
                    <th className="pivot-corner">{pivotRowLabel} \ {pivotColLabel}</th>
                    {pivotCols.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                    <th className="pivot-total-col">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {pivotRows.map((row) => {
                    const rowApps = pivotCols.map((col) => appsInCell(row, col));
                    const rowTotal = rowApps.reduce((sum, apps) => sum + apps.length, 0);
                    return (
                      <tr key={row}>
                        <td className="pivot-row-label">{row}</td>
                        {pivotCols.map((col, i) => {
                          const apps = rowApps[i];
                          const isActiveCell = drilldown?.rowValue === row && drilldown?.colValue === col;
                          return (
                            <td key={col}>
                              {apps.length > 0 ? (
                                <button
                                  type="button"
                                  className={`pivot-cell-btn ${isActiveCell ? 'active' : ''}`}
                                  onClick={() => setDrilldown({ rowValue: row, colValue: col, apps })}
                                >
                                  {apps.length}
                                </button>
                              ) : (
                                <span className="pivot-cell-empty">–</span>
                              )}
                            </td>
                          );
                        })}
                        <td className="pivot-total-cell">{rowTotal}</td>
                      </tr>
                    );
                  })}
                  <tr className="pivot-total-row">
                    <td className="pivot-row-label">Total</td>
                    {pivotCols.map((col) => {
                      const colTotal = pivotRows.reduce((sum, row) => sum + appsInCell(row, col).length, 0);
                      return (
                        <td key={col} className="pivot-total-cell">{colTotal}</td>
                      );
                    })}
                    <td className="pivot-total-cell grand">{applications.length}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {drilldown && (
              <div className="pivot-drilldown">
                <div className="pivot-drilldown-head">
                  <div>
                    <strong>{drilldown.rowValue} × {drilldown.colValue}</strong>
                    <span>{drilldown.apps.length} aplikasi — centang untuk ditambahkan ke perbandingan</span>
                  </div>
                  <button type="button" className="pivot-drilldown-close" onClick={() => setDrilldown(null)} aria-label="Tutup">
                    <X size={16} />
                  </button>
                </div>

                <div className="compare-app-list-body">
                  {drilldown.apps.map((app) => (
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

                {selectedApps.length >= 2 && (
                  <button type="button" className="pivot-drilldown-compare-btn" onClick={() => setViewMode('sidebyside')}>
                    Lihat perbandingan ({selectedApps.length}) →
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default Compare;