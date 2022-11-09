import { expect } from "chai";
// import mockCustomerData from "./data/mockCustomerData";
// import mockBookingsData from "./data/mockBookingsData";
// import mockRoomData from "./data/mockRoomData";
import Customer from "../src/class/customer.js";
// src/class/customer.js
// import Booking from "./src/class/booking.js";
// import Room from "..src/class/room.js";

describe("Customer", () => {
  let customer1, customer2, room1, room2, book1, book2;

  beforeEach(() => {
    customer1 = new Customer({"id": 1, "name": "Jack Torrence"});
    customer2 = new Customer({"id": 2, "name": "Danny Torrence"});

    // room1 = new Room();
    // book1 = new Booking();
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

  it('should do things', () => {

  });

})
