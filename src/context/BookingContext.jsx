import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

const BookingContext = createContext(null);
const STORAGE_KEY = 'cinereel:bookings';

function loadInitialState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function bookingsReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return [...state, action.booking];
    case 'REMOVE':
      return state.filter((b) => b.id !== action.bookingId);
    case 'REMOVE_FOOD_ITEM':
      return state.map((b) =>
        b.id === action.bookingId
          ? { ...b, foodItems: b.foodItems.filter((f) => f.id !== action.foodId) }
          : b
      );
    default:
      return state;
  }
}

export function BookingProvider({ children }) {
  const [bookings, dispatch] = useReducer(bookingsReducer, undefined, loadInitialState);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const value = useMemo(
    () => ({
      bookings,
      addBooking: (booking) => dispatch({ type: 'ADD', booking }),
      removeBooking: (bookingId) => dispatch({ type: 'REMOVE', bookingId }),
      removeFoodItem: (bookingId, foodId) => dispatch({ type: 'REMOVE_FOOD_ITEM', bookingId, foodId }),
    }),
    [bookings]
  );

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookings() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error('useBookings debe usarse dentro de <BookingProvider>');
  return ctx;
}
