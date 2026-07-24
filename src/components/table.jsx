import '../style/Table_Style.css';

/**
 * Table reusable
 *
 * Props:
 * - title: string (opsional) - judul di atas tabel
 * - columns: array of { key: string, label: string, render?: (row) => ReactNode }
 * - data: array of object - baris data, setiap object harus punya properti sesuai `key` di columns
 * - emptyMessage: string (opsional) - pesan saat data kosong
 *
 * Contoh pemakaian:
 * <Table
 *   title="Aktivitas Terbaru"
 *   columns={[
 *     { key: 'user', label: 'Pengguna' },
 *     { key: 'action', label: 'Aksi' },
 *     { key: 'target', label: 'Target' },
 *     { key: 'time', label: 'Waktu', className: 'table-muted' },
 *   ]}
 *   data={recentActivity}
 * />
 */
function Table({ title, columns = [], data = [], emptyMessage = 'Belum ada data.' }) {
    return (
        <div className="table-card">
            {title && <h2 className="table-title">{title}</h2>}

            <div className="table-wrapper">
                <table className="app-table">
                    <thead>
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key}>{col.label}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td colSpan={columns.length} className="table-empty">
                                    {emptyMessage}
                                </td>
                            </tr>
                        ) : (
                            data.map((row, rowIndex) => (
                                <tr key={row.id ?? rowIndex}>
                                    {columns.map((col) => (
                                        <td key={col.key} className={col.className || ''}>
                                            {col.render ? col.render(row) : row[col.key]}
                                        </td>
                                    ))}
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default Table;
