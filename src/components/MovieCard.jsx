import { memo } from 'react';
import { posterUrl } from '../services/tmdb.js';

function HeartIcon({ filled }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill={filled ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2">
      <path d="M12 21s-6.7-4.35-9.33-8.2C.86 10.1 1.4 6.6 4.3 5.1c2.2-1.14 4.6-.4 5.9 1.3.4.5.7 1 .8 1.2.1-.2.4-.7.8-1.2 1.3-1.7 3.7-2.44 5.9-1.3 2.9 1.5 3.44 5 1.63 7.7C18.7 16.65 12 21 12 21z" />
    </svg>
  );
}

function TicketIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v1.5a1.5 1.5 0 0 0 0 3V15a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1.5a1.5 1.5 0 0 0 0-3V9z" />
      <path d="M13 5v2M13 17v2M13 10v4" strokeLinecap="round" />
    </svg>
  );
}

function MovieCard({ movie, isFavorite, onToggleFavorite, onBook }) {
  const year = movie.release_date ? movie.release_date.slice(0, 4) : '—';
  const rating = typeof movie.vote_average === 'number' ? movie.vote_average.toFixed(1) : '—';
  const poster = posterUrl(movie.poster_path);

  return (
    <article className="movie-card">
      <div className="movie-card__poster-wrap">
        {poster ? (
          <img src={poster} alt={`Póster de ${movie.title}`} loading="lazy" />
        ) : (
          <div className="skeleton" style={{ width: '100%', height: '100%' }} />
        )}
        <span className="rating-badge">★ {rating}</span>
        <button
          type="button"
          className={`fav-btn${isFavorite ? ' active' : ''}`}
          onClick={() => onToggleFavorite(movie)}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? `Quitar ${movie.title} de favoritos` : `Agregar ${movie.title} a favoritos`}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      </div>
      <div className="movie-card__body">
        <p className="movie-card__title">{movie.title}</p>
        <span className="movie-card__year">{year}</span>
        {onBook && (
          <button type="button" className="btn-book" onClick={() => onBook(movie)}>
            <TicketIcon /> Reservar
          </button>
        )}
      </div>
    </article>
  );
}

// React.memo evita re-renders innecesarios de cada tarjeta cuando cambia el
// estado de otras tarjetas en la grilla (criterio de optimización de rendimiento).
export default memo(MovieCard);
