import { expect } from "chai";
import Customer from "../src/class/customer.js";
import Room from "../src/class/room.js";
import Booking from "../src/class/booking.js";

describe("Room", () => {
  let customer1, customer2, room1, room2, book1, book2;

  beforeEach(() => {
    customer1 = new Customer({ "id": 1, "name": "Jack Torrence" });
    customer2 = new Customer({ "id": 2, "name": "Danny Torrence" });
    room1 = new Room({ "number": 15, "roomType": "residential suite",
      "bidet": true, "bedSize": "queen", "numBeds": 1, "costPerNight": 358.4 });
    room2 = new Room( { "number": 24, "roomType": "suite", "bidet": false,
      "bedSize": "full", "numBeds": 2, "costPerNight": 477.38 });
    book1 = new Booking({ "id": "5fwrgu4i7k55hl6sz", "userID": 1,
      "date": "2022/04/22", "roomNumber": 15, });
    book2 = new Booking({ "id": "5fwrgu4i7k55hl6t5", "userID": 2,
      "date": "2022/01/24", "roomNumber": 24, });
  });

  it('should create an instance of Booking', () => {
    expect(book1).to.be.an.instanceOf(Booking);
  });

  it('should have a unique id', () => {
    expect(book1.id).to.equal("5fwrgu4i7k55hl6sz");
    expect(book2.id).to.equal("5fwrgu4i7k55hl6t5");
  });

  it('should have a user id', () => {
    expect(book1.userID).to.equal(1);
    expect(book2.userID).to.equal(2);
  });

  it('should have a date', () => {
    expect(book1.date).to.equal("2022/04/22");
    expect(book2.date).to.equal("2022/01/24");
  });

  it('should have a room number', () => {
    expect(book1.roomNumber).to.equal(15);
    expect(book2.roomNumber).to.equal(24);
  });

});