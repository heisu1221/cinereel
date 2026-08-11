import { useBookings } from '../context/BookingContext.jsx';
import { posterUrl } from '../services/tmdb.js';
import { CURRENCY } from '../data/concessions.js';
import { computeBookingTotal } from '../utils/pricing.js';

export default function ReservationsList() {
  const { bookings, removeBooking, removeFoodItem } = useBookings();

  if (bookings.length === 0) {
    return (
      <div className="state-message">
        <h3>Aún no tienes reservas</h3>
        <p>Toca "Reservar" en cualquier película para separar tus entradas.</p>
      </div>
    );
  }

  return (
    <div className="reservations-list">
      {bookings.map((booking) => {
        const poster = posterUrl(booking.poster);
        return (
          <article key={booking.id} className="reservation-card">
            <div className="reservation-card__header">
              {poster ? (
                <img src={poster} alt="" className="reservation-card__poster" />
              ) : (
                <div className="reservation-card__poster skeleton" />
              )}
              <div className="reservation-card__info">
                <p className="reservation-card__title">{booking.movieTitle}</p>
                <p className="reservation-meta">
                  {booking.showtime} · {booking.seats} {booking.seats === 1 ? 'asiento' : 'asientos'}
                </p>
              </div>
              <button
                type="button"
                className="btn-danger"
                onClick={() => removeBooking(booking.id)}
              >
                Cancelar reserva
              </button>
            </div>

            {booking.foodItems.length > 0 && (
              <div className="food-lines">
                {booking.foodItems.map((food) => (
                  <div key={food.id} className="food-line">
                    <span>
                      {food.qty}× {food.name}
                    </span>
                    <span className="food-line__right">
                      {CURRENCY} {(food.price * food.qty).toFixed(2)}
                      <button
                        type="button"
                        className="food-line__remove"
                        onClick={() => removeFoodItem(booking.id, food.id)}
                        aria-label={`Quitar ${food.name} de la reserva`}
                        title="Quitar de la reserva"
                      >
                        ×
                      </button>
                    </span>
                  </div>
                ))}
              </div>
            )}

            <div className="reservation-total">
              <span>Total</span>
              <strong>{CURRENCY} {computeBookingTotal(booking).toFixed(2)}</strong>
            </div>
          </article>
        );
      })}
    </div>
  );
}
