class Room {
  constructor(details) {
    this.number = details.number;
    this.roomType = details.roomType;
    this.bidet = details.bidet;
    this.bedSize = details.bedSize;
    this.numBeds = details.numBeds;
    this.costPerNight = details.costPerNight;
  }
}

export default Room