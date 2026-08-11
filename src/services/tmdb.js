const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';
const IMG_BASE = 'https://image.tmdb.org/t/p/w342';

class TmdbConfigError extends Error {}

function assertKey() {
  if (!API_KEY) {
    throw new TmdbConfigError(
      'Falta la API key de TMDB. Cópiala en un archivo .env como VITE_TMDB_API_KEY (ver README.md).'
    );
  }
}

async function request(path, params = {}) {
  assertKey();
  const url = new URL(`${BASE_URL}${path}`);
  url.searchParams.set('api_key', API_KEY);
  url.searchParams.set('language', 'es-ES');
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== '') url.searchParams.set(key, value);
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.status_message || `Error de TMDB (${res.status})`);
  }
  return res.json();
}

export function posterUrl(path) {
  return path ? `${IMG_BASE}${path}` : null;
}

export async function getPopularMovies(page = 1) {
  const data = await request('/movie/popular', { page });
  return data.results;
}

export async function getNowPlaying(page = 1) {
  const data = await request('/movie/now_playing', { page });
  return data.results;
}

export async function getTopRated(page = 1) {
  const data = await request('/movie/top_rated', { page });
  return data.results;
}

export async function getUpcoming(page = 1) {
  const data = await request('/movie/upcoming', { page });
  return data.results;
}

export async function searchMovies(query, page = 1) {
  if (!query.trim()) return getPopularMovies(page);
  const data = await request('/search/movie', { query, page });
  return data.results;
}

export { TmdbConfigError };
