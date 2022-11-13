class Manager {
  constructor() {
    this.name = 'manager';
  };

  availableRooms(bookings, date) {
    return bookings.filter(booking => booking.date === date)
  };

  todaysRevenue(bookings, rooms, date) {
    const books = this.availableRooms(bookings, date)
    const matches = [];
    books.forEach(booking => {
        let x = rooms.find(room => room.number === booking.roomNumber);
        matches.push(x)
    });
    const total = matches.reduce((acc, curr) => {
      acc += curr.costPerNight
      return acc
    }, 0)
    return total
  };

  percentOccupied(bookings, rooms, date) {
    const books = this.availableRooms(bookings, date)
    console.log([books.length / rooms.length])
    return Math.floor(books.length / rooms.length * 100)
  };

};

export default Manager