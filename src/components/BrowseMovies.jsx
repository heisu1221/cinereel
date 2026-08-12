import { useEffect, useState } from 'react';
import {
  getNowPlaying,
  getPopularMovies,
  getTopRated,
  getUpcoming,
  searchMovies,
  TmdbConfigError,
} from '../services/tmdb.js';
import SearchBar from './SearchBar.jsx';
import MovieSection from './MovieSection.jsx';
import MovieGrid from './MovieGrid.jsx';

const SECTIONS = [
  { key: 'now_playing', title: 'En cartelera', fetcher: getNowPlaying },
  { key: 'popular', title: 'Películas populares', fetcher: getPopularMovies },
  { key: 'top_rated', title: 'Mejor valoradas', fetcher: getTopRated },
  { key: 'upcoming', title: 'Próximamente', fetcher: getUpcoming },
];

function SkeletonGrid() {
  return (
    <div className="movie-grid">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="skeleton" style={{ aspectRatio: '2 / 3', borderRadius: 10 }} />
      ))}
    </div>
  );
}

export default function BrowseMovies({ query, onQueryChange, isFavorite, onToggleFavorite, onBook }) {
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [sectionsData, setSectionsData] = useState({});
  const [sectionsError, setSectionsError] = useState('');
  const [searchResults, setSearchResults] = useState(null);
  const [searchStatus, setSearchStatus] = useState('idle');
  const [searchError, setSearchError] = useState('');

  useEffect(() => {
    const id = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(id);
  }, [query]);

  useEffect(() => {
    let cancelled = false;
    async function loadSections() {
      try {
        const entries = await Promise.all(SECTIONS.map(async (s) => [s.key, await s.fetcher()]));
        if (!cancelled) setSectionsData(Object.fromEntries(entries));
      } catch (err) {
        if (!cancelled) {
          setSectionsError(
            err instanceof TmdbConfigError ? err.message : 'No se pudo cargar la cartelera de TMDB.'
          );
        }
      }
    }
    loadSections();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!debouncedQuery) {
      setSearchResults(null);
      setSearchStatus('idle');
      return;
    }
    let cancelled = false;
    async function runSearch() {
      setSearchStatus('loading');
      try {
        const results = await searchMovies(debouncedQuery);
        if (!cancelled) {
          setSearchResults(results);
          setSearchStatus('ready');
        }
      } catch (err) {
        if (!cancelled) {
          setSearchError(err instanceof TmdbConfigError ? err.message : 'No se pudo buscar en TMDB.');
          setSearchStatus('error');
        }
      }
    }
    runSearch();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery]);

  const isSearching = Boolean(debouncedQuery);

  return (
    <div className="browse-movies">
      <div className="search-bar-inline">
        <SearchBar value={query} onChange={onQueryChange} />
      </div>

      {isSearching ? (
        <MovieSection title={`Resultados para "${debouncedQuery}"`}>
          {searchStatus === 'loading' && <SkeletonGrid />}
          {searchStatus === 'error' && (
            <div className="state-message">
              <h3>No pudimos buscar en TMDB</h3>
              <p>{searchError}</p>
            </div>
          )}
          {searchStatus === 'ready' && searchResults.length === 0 && (
            <div className="state-message">
              <h3>Sin resultados</h3>
              <p>Prueba con otro título.</p>
            </div>
          )}
          {searchStatus === 'ready' && searchResults.length > 0 && (
            <MovieGrid
              movies={searchResults}
              isFavorite={isFavorite}
              onToggleFavorite={onToggleFavorite}
              onBook={onBook}
            />
          )}
        </MovieSection>
      ) : (
        <>
          {sectionsError && (
            <div className="state-message">
              <h3>No pudimos cargar las películas</h3>
              <p>{sectionsError}</p>
            </div>
          )}
          {!sectionsError &&
            SECTIONS.map((s) => (
              <MovieSection key={s.key} title={s.title}>
                {sectionsData[s.key] ? (
                  <MovieGrid
                    movies={sectionsData[s.key]}
                    isFavorite={isFavorite}
                    onToggleFavorite={onToggleFavorite}
                    onBook={onBook}
                  />
                ) : (
                  <SkeletonGrid />
                )}
              </MovieSection>
            ))}
        </>
      )}
    </div>
  );
}
