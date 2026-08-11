import { useState } from 'react';

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="11" cy="11" r="7" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

export default function CinematicHome({ onSearch }) {
  const [value, setValue] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  }

  return (
    <section className="cinematic-home">
      {/* Fondo: video en loop. Mientras no exista /public/videos/home-background.mp4,
          se ve el degradado de respaldo definido en .cinematic-home__media (no se rompe nada). */}
      <div className="cinematic-home__media">
        <video
          className="cinematic-home__video"
          autoPlay
          loop
          muted
          playsInline
          poster="/home-poster.jpg"
        >
          <source src="/videos/home-background.mp4" type="video/mp4" />
        </video>
        <div className="cinematic-home__overlay" />
      </div>

      <div className="cinematic-home__content">
        <p className="cinematic-home__eyebrow">Bienvenido a CineReel</p>
        <h1 className="cinematic-home__title">Tu próxima función empieza aquí</h1>
        <p className="cinematic-home__subtitle">
          Descubre, guarda y reserva las películas del momento.
        </p>

        <form className="hero-search" onSubmit={handleSubmit}>
          <span className="hero-search__icon">
            <SearchIcon />
          </span>
          <input
            type="search"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Busca películas, actores o descubre algo nuevo..."
            aria-label="Buscar películas"
          />
          <button type="submit" className="hero-search__btn">
            Buscar
          </button>
        </form>
      </div>
    </section>
  );
}
