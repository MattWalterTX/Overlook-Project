import { expect } from "chai";
import bookingData from "../src/data/booking-data.js";
import roomsData from "../src/data/room-data.js";
import Customer from "../src/class/customer.js";
import Room from "../src/class/room.js";
import Manager from "../src/class/manager.js";

describe("Manager", () => {
  let customer1, customer2, room1, room2, room3, roomData, manager;

  beforeEach(() => {
    customer1 = new Customer({"id": 1, "name": "Jack Torrence"});
    customer2 = new Customer({"id": 2, "name": "Danny Torrence"});
    room1 = new Room({ "number": 1, "roomType": "residential suite", "bidet": true, "bedSize": "queen", "numBeds": 1, "costPerNight": 358.4 });
    room2 = new Room({ "number": 2, "roomType": "suite", "bidet": false, "bedSize": "full", "numBeds": 2, "costPerNight": 477.38 });
    room3 = new Room({ "number": 3, "roomType": "single room", "bidet": false, "bedSize": "king", "numBeds": 1, "costPerNight": 491.14 });
    roomData = [room1, room2, room3];
    manager = new Manager;
    });

    it('should be an instance of Manager', () => {
      expect(manager).to.be.an.instanceOf(Manager);
    });

    it('should display available rooms for a specific date', () => {
      expect(manager.availableRooms(bookingData, roomsData, '2022/1/19')).to.deep.equal([room2, room3]);
    });

    it('should return total revenue by date', () => {
      expect(manager.todaysRevenue(bookingData, roomData, '2022/01/19')).to.equal(477.38);
    });

    it('should return a percentage of rooms booked by date', () => {
      expect(manager.percentOccupied(bookingData, roomData, '2022/01/19')).to.equal(33);
    });

  })
