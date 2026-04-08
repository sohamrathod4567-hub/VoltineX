const componentItems = [
  {
    title: 'Sensor Layer',
    text: 'Reads voltage, current, and temperature from field-connected devices.'
  },
  {
    title: 'Processing Layer',
    text: 'Prepares incoming measurements for monitoring and system review.'
  },
  {
    title: 'Dashboard Layer',
    text: 'Presents transformer health in a clear and compact interface.'
  }
];

export default function ComponentsPage() {
  return (
    <section className="page">
      <div className="content-card">
        <span className="eyebrow">Components</span>
        <h1 className="section-title">A simple structure behind each monitoring cycle.</h1>
        <p className="section-copy">
          VoltineX groups its product story into clear parts, from sensing to display, so the
          full system feels understandable without unnecessary detail.
        </p>
      </div>

      <div className="component-grid">
        {componentItems.map((item) => (
          <article key={item.title} className="component-card">
            <p className="card-kicker">Module</p>
            <h2 className="card-title">{item.title}</h2>
            <p className="card-copy">{item.text}</p>
            <ul className="feature-list">
              <li>Focused role within the monitoring workflow</li>
              <li>Readable presentation with minimal visual noise</li>
              <li>Prepared for future real-time integration</li>
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
