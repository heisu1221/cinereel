import { useEffect, useMemo, useState } from 'react';
import { posterUrl } from '../services/tmdb.js';
import { CONCESSIONS, CURRENCY, SEAT_PRICE, SHOWTIMES } from '../data/concessions.js';
import { computeBookingTotal } from '../utils/pricing.js';

export default function BookingModal({ movie, onClose, onConfirm }) {
  const [showtime, setShowtime] = useState(SHOWTIMES[0]);
  const [seats, setSeats] = useState(1);
  const [foodQty, setFoodQty] = useState({});

  useEffect(() => {
    function handleKey(e) {
      if (e.key === 'Escape') onClose();
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const foodItems = useMemo(
    () =>
      Object.entries(foodQty)
        .filter(([, qty]) => qty > 0)
        .map(([id, qty]) => {
          const item = CONCESSIONS.find((c) => c.id === id);
          return { id: item.id, name: item.name, price: item.price, qty };
        }),
    [foodQty]
  );

  const total = useMemo(
    () => computeBookingTotal({ seats, seatPrice: SEAT_PRICE, foodItems }),
    [seats, foodItems]
  );

  function updateFoodQty(id, delta) {
    setFoodQty((prev) => ({ ...prev, [id]: Math.max(0, (prev[id] || 0) + delta) }));
  }

  function handleConfirm() {
    onConfirm({
      id: crypto.randomUUID(),
      movieId: movie.id,
      movieTitle: movie.title,
      poster: movie.poster_path,
      showtime,
      seats,
      seatPrice: SEAT_PRICE,
      foodItems,
      createdAt: new Date().toISOString(),
    });
  }

  const poster = posterUrl(movie.poster_path);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button type="button" className="modal-close" onClick={onClose} aria-label="Cerrar">
          ×
        </button>

        <div className="modal-header">
          {poster ? (
            <img src={poster} alt="" className="modal-poster" />
          ) : (
            <div className="modal-poster skeleton" />
          )}
          <div>
            <h3 id="booking-title" className="modal-title">
              {movie.title}
            </h3>
            <p className="modal-subtitle">Reserva tus entradas</p>
          </div>
        </div>

        <div className="modal-body">
          <section className="modal-section">
            <h4 className="modal-section-title">Función</h4>
            <div className="showtime-pills">
              {SHOWTIMES.map((time) => (
                <button
                  key={time}
                  type="button"
                  className={`showtime-pill${showtime === time ? ' active' : ''}`}
                  onClick={() => setShowtime(time)}
                  aria-pressed={showtime === time}
                >
                  {time}
                </button>
              ))}
            </div>
          </section>

          <section className="modal-section">
            <h4 className="modal-section-title">Asientos</h4>
            <div className="stepper">
              <button type="button" onClick={() => setSeats((s) => Math.max(1, s - 1))} aria-label="Quitar asiento">
                −
              </button>
              <span>{seats}</span>
              <button type="button" onClick={() => setSeats((s) => Math.min(10, s + 1))} aria-label="Agregar asiento">
                +
              </button>
            </div>
            <p className="stepper-hint">
              {CURRENCY} {SEAT_PRICE.toFixed(2)} por asiento
            </p>
          </section>

          <section className="modal-section">
            <h4 className="modal-section-title">Dulcería</h4>
            <div className="concession-list">
              {CONCESSIONS.map((item) => (
                <div key={item.id} className="concession-item">
                  <div className="concession-item__info">
                    <span className="concession-item__name">{item.name}</span>
                    <span className="concession-item__price">
                      {CURRENCY} {item.price.toFixed(2)}
                    </span>
                  </div>
                  <div className="stepper stepper--sm">
                    <button
                      type="button"
                      onClick={() => updateFoodQty(item.id, -1)}
                      aria-label={`Quitar ${item.name}`}
                    >
                      −
                    </button>
                    <span>{foodQty[item.id] || 0}</span>
                    <button
                      type="button"
                      onClick={() => updateFoodQty(item.id, 1)}
                      aria-label={`Agregar ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="modal-footer">
          <div className="booking-total">
            <span>Total</span>
            <strong>
              {CURRENCY} {total.toFixed(2)}
            </strong>
          </div>
          <div className="modal-footer-actions">
            <button type="button" className="btn-ghost" onClick={onClose}>
              Cancelar
            </button>
            <button type="button" className="btn-primary" onClick={handleConfirm}>
              Confirmar reserva
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
