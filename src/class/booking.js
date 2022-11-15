class Booking {
  constructor(details) {
    this.id = details.id;
    this.userID = details.userID;
    this.date = details.date;
    this.roomNumber = details.roomNumber;
  };
};

export default Booking