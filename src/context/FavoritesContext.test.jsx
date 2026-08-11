import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { FavoritesProvider, useFavorites } from './FavoritesContext.jsx';

const movie = { id: 1, title: 'Interstellar', poster_path: '/x.jpg', vote_average: 8.6, release_date: '2014-11-06' };

function Probe() {
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  return (
    <div>
      <span data-testid="count">{favorites.length}</span>
      <span data-testid="is-fav">{String(isFavorite(movie.id))}</span>
      <button onClick={() => toggleFavorite(movie)}>toggle</button>
    </div>
  );
}

describe('FavoritesContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('empieza sin favoritas', () => {
    render(
      <FavoritesProvider>
        <Probe />
      </FavoritesProvider>
    );
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('agrega y quita una película al hacer toggle', () => {
    render(
      <FavoritesProvider>
        <Probe />
      </FavoritesProvider>
    );
    const button = screen.getByText('toggle');

    fireEvent.click(button);
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('is-fav').textContent).toBe('true');

    fireEvent.click(button);
    expect(screen.getByTestId('count').textContent).toBe('0');
    expect(screen.getByTestId('is-fav').textContent).toBe('false');
  });
});
