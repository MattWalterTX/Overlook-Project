import { expect } from "chai";
import bookingData from "../src/data/booking-data.js";
import roomData from "../src/data/room-data.js";
import Customer from "../src/class/customer.js";
import Room from "../src/class/room.js";

describe("Customer", () => {
  let customer1, customer2, room1, room2, room3;

  beforeEach(() => {
    customer1 = new Customer({"id": 1, "name": "Jack Torrence"});
    customer2 = new Customer({"id": 2, "name": "Danny Torrence"});
    room1 = new Room(roomData[0]);
    room2 = new Room(roomData[1]);
    room3 = new Room(roomData[2]);
  });

  it('should create an instance of Customer', () => {
    expect(customer1).to.be.an.instanceOf(Customer);
  });

  it('should have an id', () => {
    expect(customer1.id).to.equal(1);
    expect(customer2.id).to.equal(2);
  });

  it('should have a name', () => {
    expect(customer1.name).to.equal('Jack Torrence');
    expect(customer2.name).to.equal('Danny Torrence');
  });

  it('should be able to store a list of their bookings', () => {
    customer1.myBookings(bookingData);
    customer2.myBookings(bookingData);
    expect(customer1.bookings).to.deep.equal([
      { "id": "5fwrgu4i7k55hl6sz", "userID": 1, "date": "2022/04/22", "roomNumber": 1 },
      { "id": "5fwrgu4i7k55hl6t5", "userID": 1, "date": "2022/01/24", "roomNumber": 1,}
    ]);
    expect(customer2.bookings).to.deep.equal([
      { "id": "5fwrgu4i7k55hl6t8", "userID": 2, "date": "2022/02/05", "roomNumber": 3 },
      { "id": "5fwrgu4i7k55hl6t9", "userID": 2, "date": "2023/12/14", "roomNumber": 3,}
    ]);
  });

  it('should be able to provide a total cost for all their bookings', () => {
    customer1.myBookings(bookingData);
    customer2.myBookings(bookingData);
    customer1.totalCosts(roomData);
    customer2.totalCosts(roomData);
    expect(customer1.totalCosts(roomData)).to.equal(716.8);
    expect(customer2.totalCosts(roomData)).to.equal(982.28);
  });

  it('should be able to filter available rooms by date', () => {
    expect(customer1.checkRooms(bookingData, roomData, '2022/04/22')).to.deep.equal([room2, room3]);
  });

});
