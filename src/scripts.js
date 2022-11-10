// IMPORTS
import './css/styles.css';
import './images/turing-logo.png';
import './images/overlook-staff.png';
import './images/bar.png';
import './images/communal-study.png';
import './images/communal-study2.png';
import './images/elevators.png';
import './images/gold-room1.png';
import './images/gold-room-entry.png';
import './images/hall.png';
import './images/room.png';
import './images/suite-bathroom.png';
import Customer from './class/customer';
import Room from "../src/class/room.js";
import Booking from "../src/class/booking.js";
import {
  getCustomerData,
  getBookingData,
  getRoomData
} from './apiCalls';

// remove after connecting api
import bookingData from "../src/data/booking-data.js";
import roomData from "../src/data/room-data.js";
import customerData from "../src/data/customer-data.js";

// GLOBAL VARIABLES
let customersData, roomsData, bookingsData, currentUser, currentBookings, currentRooms;

// API
function instantiateData(data) {
  Promise.all([getCustomerData(), getBookingData(), getRoomData()]).then(
    (data) => {
      customersData = data[0].customers;
      bookingsData = data[1].bookings;
      roomsData = data[2].rooms;
      currentUser = new Customer (
        customersData[Math.floor(Math.random() * customersData.length)]
      );
      currentBookings = bookingsData.map(booking => {
        const newBooking = new Booking(booking);
        return newBooking
      });
      currentRooms = roomsData.map(room => {
        const newRoom = new Room(room);
        return newRoom
      });
      loadUser();
    }
  );
};

// QUERY SELECTORS
const homeView = document.querySelector('#home-view');
const galleryView = document.querySelector('#gallery-view');
const aboutView = document.querySelector('#about-view');
const homeButton = document.querySelector('#home-button');
const galleryButton = document.querySelector('#gallery-button');
const aboutButton = document.querySelector('#about-button');
const bookingsGrid = document.querySelector('#bookings-grid');
const greeting = document.querySelector('#greeting');

// EVENT LISTENERS
window.addEventListener('load', instantiateData);
homeButton.addEventListener('click', showHome);
galleryButton.addEventListener('click', showGallery);
aboutButton.addEventListener('click', showAbout);

// FUNCTIONS
function loadUser() {
  currentUser.myBookings(currentBookings)
  loadGreeting();
  renderBookings();
};

// View
function showHome() {
  galleryView.classList.add('hidden');
  aboutView.classList.add('hidden');
  homeView.classList.remove('hidden');
};

function showGallery() {
  homeView.classList.add('hidden');
  aboutView.classList.add('hidden');
  galleryView.classList.remove('hidden');
};

function showAbout() {
  homeView.classList.add('hidden');
  galleryView.classList.add('hidden');
  aboutView.classList.remove('hidden');
};

// HELPERS
function loadGreeting() {
  greeting.innerHTML = `Welcome Back ${currentUser.name}!`
}

function renderBookings() {
  bookingsGrid.innerHTML = '';
  bookingsGrid.innerHTML = 
    currentUser.bookings.map(booking => 
    `<li class="booking-card">
    <div class="booking-info">
      <h3 id="" class="date">${booking.date}</h3>
      <h3 id="" class="date">${booking.roomNumber}</h3>
    </div>
    <div>
      <h3 id="" class="date">Confirmation ${booking.id}</h3>
    </div>
  </li>`)
  .join('');
};



