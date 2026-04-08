function formatValue(value, unit) {
  if (typeof value !== 'number') {
    return '--';
  }

  return `${value} ${unit}`;
}

export default function DashboardPage({ data, isLoading, error }) {
  const latestRecord = data[0];
  const metrics = [
    {
      label: 'Voltage',
      value: formatValue(latestRecord?.voltage, 'V')
    },
    {
      label: 'Current',
      value: formatValue(latestRecord?.current, 'A')
    },
    {
      label: 'Temperature',
      value: formatValue(latestRecord?.temperature, 'C')
    }
  ];

  return (
    <section className="page">
      <div className="hero-card">
        <div>
          <span className="eyebrow">Dashboard</span>
          <h1 className="hero-title">Clear monitoring for critical transformer systems.</h1>
          <p className="hero-copy">
            VoltineX gives teams a focused view of electrical health with a clean interface
            for real-time voltage, current, and temperature visibility.
          </p>
          <div className="hero-actions dashboard-status-row">
            <div className="status-chip">{isLoading ? 'Loading data' : 'Live feed ready'}</div>
            <div className="status-chip is-muted">
              {error || (data.length ? `${data.length} records loaded` : 'No records available')}
            </div>
          </div>
        </div>

        <aside className="hero-aside">
          <div className="preview-panel">
            <div className="preview-header">
              <span>Live Preview</span>
              <span>{latestRecord ? 'Connected' : 'Waiting'}</span>
            </div>
            <div className="preview-grid">
              {metrics.map((metric) => (
                <div key={metric.label} className="preview-tile">
                  <p className="preview-label">{metric.label}</p>
                  <p className="preview-value">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>

      <div className="stats-grid">
        {metrics.map((metric) => (
          <article key={metric.label} className="stat-card">
            <p className="card-kicker">Reading</p>
            <h2 className="stat-value">{metric.value}</h2>
            <p className="stat-label">{metric.label}</p>
          </article>
        ))}
      </div>

      <div className="content-card readings-card">
        <p className="card-kicker">Latest Data</p>
        <div className="reading-list">
          {metrics.map((metric) => (
            <div key={metric.label} className="reading-row">
              <span className="reading-name">{metric.label}</span>
              <span className="reading-number">{metric.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
