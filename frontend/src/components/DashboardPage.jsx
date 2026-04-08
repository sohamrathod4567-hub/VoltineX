export default function DashboardPage() {
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
          <div className="hero-actions">
            <button type="button" className="primary-button">
              View Overview
            </button>
            <button type="button" className="secondary-button">
              System Status
            </button>
          </div>
        </div>

        <aside className="hero-aside">
          <div className="preview-panel">
            <div className="preview-header">
              <span>Live Preview</span>
              <span>Idle</span>
            </div>
            <div className="preview-grid">
              <div className="preview-tile">
                <p className="preview-label">Voltage</p>
                <p className="preview-value">231 V</p>
              </div>
              <div className="preview-tile">
                <p className="preview-label">Current</p>
                <p className="preview-value">14.2 A</p>
              </div>
              <div className="preview-tile">
                <p className="preview-label">Temperature</p>
                <p className="preview-value">46 C</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      <div className="stats-grid">
        <article className="stat-card">
          <p className="card-kicker">Uptime</p>
          <h2 className="stat-value">99.2%</h2>
          <p className="stat-label">Monitoring continuity across connected units.</p>
        </article>
        <article className="stat-card">
          <p className="card-kicker">Coverage</p>
          <h2 className="stat-value">24/7</h2>
          <p className="stat-label">Always-on observation for operational confidence.</p>
        </article>
        <article className="stat-card">
          <p className="card-kicker">Signals</p>
          <h2 className="stat-value">3</h2>
          <p className="stat-label">Voltage, current, and temperature in one flow.</p>
        </article>
      </div>
    </section>
  );
}
