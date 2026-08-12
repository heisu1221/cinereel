import { useCallback, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useBookings } from '../context/BookingContext.jsx';
import Navbar from './Navbar.jsx';
import CinematicHome from './CinematicHome.jsx';
import BrowseMovies from './BrowseMovies.jsx';
import MovieSection from './MovieSection.jsx';
import MovieGrid from './MovieGrid.jsx';
import ReservationsList from './ReservationsList.jsx';
import BookingModal from './BookingModal.jsx';

export default function Home() {
  const { user, logout } = useAuth();
  const { favorites, isFavorite, toggleFavorite } = useFavorites();
  const { bookings, addBooking } = useBookings();

  const [view, setView] = useState('home');
  const [query, setQuery] = useState('');
  const [bookingMovie, setBookingMovie] = useState(null);

  const handleToggleFavorite = useCallback((movie) => toggleFavorite(movie), [toggleFavorite]);
  const handleBook = useCallback((movie) => setBookingMovie(movie), []);

  const handleConfirmBooking = useCallback(
    (booking) => {
      addBooking(booking);
      setBookingMovie(null);
      setView('reservations');
    },
    [addBooking]
  );

  function handleHeroSearch(text) {
    setQuery(text);
    setView('popular');
  }

  return (
    <div className="app-shell">
      <Navbar
        view={view}
        onNavigate={setView}
        onLogoClick={() => setView('home')}
        username={user?.username}
        onLogout={logout}
        favoritesCount={favorites.length}
        bookingsCount={bookings.length}
      />

      {view === 'home' && <CinematicHome onSearch={handleHeroSearch} />}

      {view !== 'home' && (
        <main className="main-content">
          {view === 'popular' && (
            <BrowseMovies
              query={query}
              onQueryChange={setQuery}
              isFavorite={isFavorite}
              onToggleFavorite={handleToggleFavorite}
              onBook={handleBook}
            />
          )}

          {view === 'favorites' && (
            <MovieSection title="Tus favoritas">
              {favorites.length > 0 ? (
                <MovieGrid
                  movies={favorites}
                  isFavorite={isFavorite}
                  onToggleFavorite={handleToggleFavorite}
                  onBook={handleBook}
                />
              ) : (
                <div className="state-message">
                  <h3>Aún no tienes favoritas</h3>
                  <p>Toca el corazón de cualquier película para guardarla aquí.</p>
                </div>
              )}
            </MovieSection>
          )}

          {view === 'reservations' && <ReservationsList />}
        </main>
      )}

      {bookingMovie && (
        <BookingModal
          movie={bookingMovie}
          onClose={() => setBookingMovie(null)}
          onConfirm={handleConfirmBooking}
        />
      )}
    </div>
  );
}
