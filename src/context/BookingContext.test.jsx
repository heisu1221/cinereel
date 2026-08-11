import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BookingProvider, useBookings } from './BookingContext.jsx';

const sampleBooking = {
  id: 'b1',
  movieId: 1,
  movieTitle: 'Interstellar',
  poster: '/x.jpg',
  showtime: '7:00 PM',
  seats: 2,
  seatPrice: 18,
  foodItems: [
    { id: 'pop-l', name: 'Palomitas grande', price: 13, qty: 1 },
    { id: 'soda-s', name: 'Gaseosa chica', price: 6, qty: 2 },
  ],
  createdAt: '2026-01-01T00:00:00.000Z',
};

function Probe() {
  const { bookings, addBooking, removeBooking, removeFoodItem } = useBookings();
  const first = bookings[0];
  return (
    <div>
      <span data-testid="count">{bookings.length}</span>
      <span data-testid="food-count">{first ? first.foodItems.length : 0}</span>
      <button onClick={() => addBooking(sampleBooking)}>add</button>
      <button onClick={() => removeBooking('b1')}>remove</button>
      <button onClick={() => removeFoodItem('b1', 'soda-s')}>remove-food</button>
    </div>
  );
}

describe('BookingContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('empieza sin reservas', () => {
    render(
      <BookingProvider>
        <Probe />
      </BookingProvider>
    );
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('agrega una reserva completa', () => {
    render(
      <BookingProvider>
        <Probe />
      </BookingProvider>
    );
    fireEvent.click(screen.getByText('add'));
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('food-count').textContent).toBe('2');
  });

  it('quita un alimento sin borrar la reserva', () => {
    render(
      <BookingProvider>
        <Probe />
      </BookingProvider>
    );
    fireEvent.click(screen.getByText('add'));
    fireEvent.click(screen.getByText('remove-food'));
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('food-count').textContent).toBe('1');
  });

  it('cancela la reserva completa', () => {
    render(
      <BookingProvider>
        <Probe />
      </BookingProvider>
    );
    fireEvent.click(screen.getByText('add'));
    fireEvent.click(screen.getByText('remove'));
    expect(screen.getByTestId('count').textContent).toBe('0');
  });
});
