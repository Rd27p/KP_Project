import '../style/ProgressBar_Style.css';

function ProgressBarList({ title, data = [] }) {
    return (
        <div className="progress-card">
            {title && <h2 className="progress-title">{title}</h2>}

            <div className="progress-list">
                {data.map((item) => (
                    <div className="progress-row" key={item.label}>
                        <div className="progress-row-header">
                            <span className="progress-label">{item.label}</span>
                            <span className="progress-value">{item.value}%</span>
                        </div>
                        <div className="progress-track">
                            <div
                                className="progress-fill"
                                style={{
                                    width: `${item.value}%`,
                                    background: item.color || 'linear-gradient(90deg, #D3324A 0%, #A50224 100%)',
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProgressBarList;