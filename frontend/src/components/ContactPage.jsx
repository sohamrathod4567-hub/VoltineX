export default function ContactPage() {
  return (
    <section className="page">
      <div className="content-card">
        <span className="eyebrow">Contact</span>
        <h1 className="section-title">Start a conversation around deployment and monitoring needs.</h1>
        <p className="section-copy">
          This contact page is intentionally simple and ready for future backend integration.
        </p>
      </div>

      <div className="contact-grid">
        <article className="contact-card">
          <form>
            <div className="field">
              <label htmlFor="name">Name</label>
              <input id="name" name="name" type="text" placeholder="Your name" />
            </div>

            <div className="field">
              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" placeholder="your@email.com" />
            </div>

            <div className="field">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message" placeholder="Tell us about your project" />
            </div>

            <button type="button" className="primary-button">
              Send Message
            </button>
          </form>
        </article>

        <aside className="contact-rail">
          <div className="contact-item">
            <h3>Office</h3>
            <p>VoltineX Systems Lab</p>
            <p>Monitoring solutions for modern electrical infrastructure.</p>
          </div>
          <div className="contact-item">
            <h3>Email</h3>
            <p>contact@voltinex.example</p>
          </div>
          <div className="contact-item">
            <h3>Availability</h3>
            <p>Monday to Friday</p>
            <p>09:00 to 18:00</p>
          </div>
        </aside>
      </div>
    </section>
  );
}
