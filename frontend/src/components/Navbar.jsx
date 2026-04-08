export default function Navbar({ items, activePage, onNavigate, user, onLogout }) {
  return (
    <header className="navbar">
      <div className="brand-block">
        <p className="brand-mark">VoltineX</p>
        <p className="brand-copy">{user ? `Signed in as ${user.name}` : 'Transformer monitoring interface'}</p>
      </div>

      <div className="nav-actions">
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
        <button type="button" className="nav-link" onClick={onLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
