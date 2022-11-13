class Manager {
  constructor() {
    this.name = 'manager';
  };

  availableRooms(books, rooms, date) {
    let available = rooms;
    const check = books.filter(booking => booking.date === date)
      .map(book => {return book.roomNumber});
    const compare = check.map(num => rooms.find(room => room.number === num));
    const remove = compare.forEach(r => {
      available = rooms
      const i = available.indexOf(r);
      const x = available.splice(i, 1);
      return available
    });
    return available
  };

  todaysRevenue(bookings, rooms, date) {
    const booked = bookings.filter(booking => booking.date === date);
    const matches = [];
    booked.forEach(booking => {
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
    const booked = bookings.filter(booking => booking.date === date);
    return Math.floor(booked.length / rooms.length * 100)
  };

};

export default Manager