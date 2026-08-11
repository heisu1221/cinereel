// Fuente única de verdad para el cálculo de totales: tanto el modal de reserva
// (mientras se arma la orden) como la lista de reservas (después de guardarla,
// incluso tras quitar un alimento) usan esta misma función. Así el total nunca
// queda desincronizado del contenido real de la reserva.
export function computeBookingTotal({ seats, seatPrice, foodItems }) {
  const seatsTotal = seats * seatPrice;
  const foodTotal = foodItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  return seatsTotal + foodTotal;
}
