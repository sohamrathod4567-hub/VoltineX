export default function Navbar({ items, activePage, onNavigate }) {
  return (
    <header className="navbar">
      <div className="brand-block">
        <p className="brand-mark">VoltineX</p>
        <p className="brand-copy">Transformer monitoring interface</p>
      </div>

      <nav className="nav-links" aria-label="Primary">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`nav-link ${activePage === item.id ? 'is-active' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </header>
  );
}
