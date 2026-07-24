import '../style/Table_Style.css';

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
