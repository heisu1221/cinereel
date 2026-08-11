import Logo from './Logo.jsx';

const NAV_ITEMS = [
  { key: 'popular', label: 'Populares' },
  { key: 'favorites', label: 'Favoritos' },
  { key: 'reservations', label: 'Reservas' },
];

export default function Navbar({
  view,
  onNavigate,
  onLogoClick,
  username,
  onLogout,
  favoritesCount,
  bookingsCount,
}) {
  const counts = { favorites: favoritesCount, reservations: bookingsCount };

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Logo onClick={onLogoClick} />

        <nav className="navbar__links" aria-label="Navegación principal">
          {NAV_ITEMS.map((item) => {
            const count = counts[item.key];
            return (
              <button
                key={item.key}
                type="button"
                className={`nav-link${view === item.key ? ' active' : ''}`}
                onClick={() => onNavigate(item.key)}
              >
                {item.label}
                {typeof count === 'number' && count > 0 && (
                  <span className="nav-badge">{count}</span>
                )}
              </button>
            );
          })}
        </nav>

        <div className="navbar__user">
          <span className="user-pill">{username}</span>
          <button type="button" className="btn-ghost" onClick={onLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
}
