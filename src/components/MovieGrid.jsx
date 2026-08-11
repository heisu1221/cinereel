import MovieCard from './MovieCard.jsx';

export default function MovieGrid({ movies, isFavorite, onToggleFavorite, onBook }) {
  return (
    <div className="movie-grid">
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          isFavorite={isFavorite(movie.id)}
          onToggleFavorite={onToggleFavorite}
          onBook={onBook}
        />
      ))}
    </div>
  );
}
