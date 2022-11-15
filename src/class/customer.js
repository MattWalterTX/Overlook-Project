class Customer {
  constructor(details) {
    this.id = details.id;
    this.name = details.name;
    this.bookings = [];
  };

  myBookings(bookingData) {
    this.bookings = bookingData.filter(booking => booking.userID === this.id);
  };
  
  totalCosts(roomData) {
    const info = this.bookings.map(booking => {
      const room = roomData.find(room => room.number === booking.roomNumber);
      return room
    });
    const total = info.reduce((acc, booking) => {
      acc += booking.costPerNight;
      return acc
    }, 0);
    return Number(total.toFixed(2))
  };

  checkRooms(books, roms, date) {
    let available = roms;
    const check = books.filter(booking => booking.date === date)
      .map(book => {return book.roomNumber});
    const compare = check.map(num => roms.find(room => room.number === num));
    const remove = compare.forEach(r => {
      available = roms
      const i = available.indexOf(r);
      const x = available.splice(i, 1);
      return available
    });
      return available
  };
  
};

export default Customer