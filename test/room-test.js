import { expect } from "chai";
import Customer from "../src/class/customer.js";
import Room from "../src/class/room.js";

describe("Room", () => {
  let customer1, customer2, room1, room2, book1, book2;

  beforeEach(() => {
    customer1 = new Customer({ "id": 1, "name": "Jack Torrence" });
    customer2 = new Customer({ "id": 2, "name": "Danny Torrence" });
    room1 = new Room({ "number": 1, "roomType": "residential suite", "bidet": true, "bedSize": "queen", "numBeds": 1, "costPerNight": 358.4 });
    room2 = new Room( { "number": 2, "roomType": "suite", "bidet": false, "bedSize": "full", "numBeds": 2, "costPerNight": 477.38 });
  })

  it('should create an instance of Room', () => {
    expect(room1).to.be.an.instanceOf(Room);
  });

  it('should have a room number', () => {
    expect(room1.number).to.equal(1);
    expect(room2.number).to.equal(2);
  });

  it('should have a room type', () => {
    expect(room1.roomType).to.equal('residential suite');
    expect(room2.roomType).to.equal('suite');
  });

  it('should know if it has a bidet', () => {
    expect(room1.bidet).to.equal(true);
    expect(room2.bidet).to.equal(false);
  });
  
  it('should know what type of beds it has', () => {
    expect(room1.bedSize).to.equal('queen');
    expect(room2.bedSize).to.equal('full');
  });

  it('should know how many beds it has', () => {
    expect(room1.numBeds).to.equal(1);
    expect(room2.numBeds).to.equal(2);
  });

  it('should have a cost per night', () => {
    expect(room1.costPerNight).to.equal(358.4);
    expect(room2.costPerNight).to.equal(477.38);
  });

});