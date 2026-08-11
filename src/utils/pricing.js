export function computeBookingTotal({ seats, seatPrice, foodItems }) {
  const seatsTotal = seats * seatPrice;
  const foodTotal = foodItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  return seatsTotal + foodTotal;
}
