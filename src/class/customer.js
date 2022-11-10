class Customer {
  constructor(details) {
    this.id = details.id;
    this.name = details.name;
    this.bookings = [];
  };

  myBookings(data) {
    this.bookings = data.filter(booking => booking.userID === this.id)
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
  
}

export default Customer