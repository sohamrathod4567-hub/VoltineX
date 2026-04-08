import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts';

function formatValue(value, unit) {
  if (typeof value !== 'number') {
    return '--';
  }

  return `${value} ${unit}`;
}

function formatTick(timestamp, index) {
  if (!timestamp) {
    return `${index + 1}`;
  }

  const date = new Date(timestamp);
  if (Number.isNaN(date.getTime())) {
    return `${index + 1}`;
  }

  return date.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  });
}

export default function DashboardPage({ data, isLoading, error }) {
  const latestRecord = data[0];
  const chartData = [...data]
    .slice(0, 20)
    .reverse()
    .map((item, index) => ({
      name: formatTick(item?.timestamp, index),
      voltage: item?.voltage,
      current: item?.current
    }));
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
            <div className="status-chip">{isLoading ? 'Loading data' : 'Realtime updates on'}</div>
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

      <div className="chart-grid">
        <article className="content-card chart-card">
          <div className="chart-head">
            <p className="card-kicker">Voltage</p>
            <span className="chart-note">Last 20 readings</span>
          </div>
          <div className="chart-shell">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="#e9e9e9" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#6f6f6f', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6f6f6f', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e9e9e9',
                    borderRadius: '16px',
                    color: '#000000'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="voltage"
                  stroke="#000000"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#000000' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className="content-card chart-card">
          <div className="chart-head">
            <p className="card-kicker">Current</p>
            <span className="chart-note">Last 20 readings</span>
          </div>
          <div className="chart-shell">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid stroke="#e9e9e9" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#6f6f6f', fontSize: 12 }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6f6f6f', fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#ffffff',
                    border: '1px solid #e9e9e9',
                    borderRadius: '16px',
                    color: '#000000'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="current"
                  stroke="#1c1c1c"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 4, fill: '#1c1c1c' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </article>
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
