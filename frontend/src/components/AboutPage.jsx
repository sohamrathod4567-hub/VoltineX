export default function AboutPage() {
  return (
    <section className="page">
      <div className="content-card">
        <span className="eyebrow">About</span>
        <h1 className="section-title">Built to simplify transformer monitoring at a glance.</h1>
        <p className="section-copy">
          VoltineX is designed for IoT-based transformer monitoring, helping operators stay
          aware of system conditions with focused visibility and a dashboard that reduces noise.
        </p>
      </div>

      <div className="section-grid">
        <article className="content-card">
          <p className="card-kicker">Purpose</p>
          <h2 className="card-title">Operational clarity</h2>
          <p className="card-copy">
            The interface prioritizes essential readings so teams can review asset condition
            quickly and consistently.
          </p>
        </article>

        <article className="content-card">
          <p className="card-kicker">Approach</p>
          <h2 className="card-title">Minimal by design</h2>
          <p className="card-copy">
            Every section is intentionally restrained, using simple typography, soft contrast,
            and direct content structure.
          </p>
        </article>
      </div>
    </section>
  );
}
