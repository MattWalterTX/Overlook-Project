class Customer {
  constructor(details) {
    this.id = details.id;
    this.name = details.name;
  };

  showBookings(data) {
    return data.filter(booking => booking.userID === this.id);
  };
  
  totalCosts(bookingData, roomData) {
    const info = this.showBookings(bookingData).map(booking => {
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