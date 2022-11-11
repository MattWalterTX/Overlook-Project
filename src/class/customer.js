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

  checkRooms(data, date) {
    const check = data.filter(booking => booking.date === date);
    if(check.length === 0) {
      return "There are no room available on this date. We apologize for the inconvenience - Please enter a new date"
    } else {
      return check
    };
  };
  
};

export default Customer