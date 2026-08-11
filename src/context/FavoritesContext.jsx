import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const FavoritesContext = createContext(null);
const STORAGE_KEY = 'cinereel:favorites';

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function favoritesReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      if (state.some((m) => m.id === action.movie.id)) return state;
      return [...state, action.movie];
    }
    case 'REMOVE':
      return state.filter((m) => m.id !== action.movieId);
    case 'TOGGLE': {
      const exists = state.some((m) => m.id === action.movie.id);
      return exists
        ? state.filter((m) => m.id !== action.movie.id)
        : [...state, action.movie];
    }
    default:
      return state;
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, dispatch] = useReducer(favoritesReducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const favoriteIds = useMemo(() => new Set(favorites.map((m) => m.id)), [favorites]);

  const value = useMemo(
    () => ({
      favorites,
      favoriteIds,
      addFavorite: (movie) => dispatch({ type: 'ADD', movie }),
      removeFavorite: (movieId) => dispatch({ type: 'REMOVE', movieId }),
      toggleFavorite: (movie) => dispatch({ type: 'TOGGLE', movie }),
      isFavorite: (movieId) => favoriteIds.has(movieId),
    }),
    [favorites, favoriteIds]
  );

  return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites debe usarse dentro de <FavoritesProvider>');
  return ctx;
}
