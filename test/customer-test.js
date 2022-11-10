import { expect } from "chai";
import bookingData from "../src/data/booking-data.js";
import roomData from "../src/data/room-data.js";
import Customer from "../src/class/customer.js";
import Room from "../src/class/room.js";
import Booking from "../src/class/booking.js";

describe("Customer", () => {
  let customer1, customer2;

  beforeEach(() => {
    customer1 = new Customer({"id": 1, "name": "Jack Torrence"});
    customer2 = new Customer({"id": 2, "name": "Danny Torrence"});
  })

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

  it('should be able to return a list of bookings', () => {
    expect(customer1.showBookings(bookingData)).to.deep.equal([
      { "id": "5fwrgu4i7k55hl6sz", "userID": 1, "date": "2022/04/22", "roomNumber": 1 },
      { "id": "5fwrgu4i7k55hl6t5", "userID": 1, "date": "2022/01/24", "roomNumber": 4,}
    ]);
    expect(customer2.showBookings(bookingData)).to.deep.equal([
      { "id": "5fwrgu4i7k55hl6t8", "userID": 2, "date": "2022/02/05", "roomNumber": 3 },
      { "id": "5fwrgu4i7k55hl6t9", "userID": 2, "date": "2023/12/14", "roomNumber": 6,}
    ]);
  });

  it('should be able to provide a total cost for all bookings', () => {
    expect(customer1.totalCosts(bookingData, roomData)).to.equal(787.84);
    expect(customer2.totalCosts(bookingData, roomData)).to.equal(888.16);
  });

  // it()

})
