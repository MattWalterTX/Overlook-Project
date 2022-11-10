// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

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

// GLOBAL VARIABLES
let customersData, roomsData, bookingsData, currentUser, currentBookings;

// API
let gatherData = (url) => {
  return fetch(url)
    .then(response => response.json())
    .catch(err => console.log(err));
};

function instantiateData(data) {
  Promise.all([
    gatherData('http://localhost:3001/api/v1/customers'),
    gatherData('http://localhost:3001/api/v1/rooms'),
    gatherData('http://localhost:3001/api/v1/bookings')
  ]).then(data => {
    customersData = data[0];
    roomsData = data[1];
    bookingsData = data[2];
    loadUser();
  });
};

// QUERY SELECTORS
const homeView = document.querySelector('#home-view');
const galleryView = document.querySelector('#gallery-view');
const aboutView = document.querySelector('#about-view');
const homeButton = document.querySelector('#home-button');
const galleryButton = document.querySelector('#gallery-button');
const aboutButton = document.querySelector('#about-button');
const bookingsGrid = document.querySelector('#bookings-grid');

// EVENT LISTENERS
window.addEventListener('load', instantiateData)
homeButton.addEventListener('click', showHome);
galleryButton.addEventListener('click', showGallery);
aboutButton.addEventListener('click', showAbout);

// FUNCTIONS
function loadUser() {
  getCurrentUser();
  getCurrentBookings();
  // const newBookingsData = Object.values(bookingsData.bookings);
  // const newBookingData = 
  // currentBookings = currentUser.showBookings(bookingsData);
};

// View
function showHome() {
  galleryView.classList.add('hidden');
  aboutView.classList.add('hidden');
  homeView.classList.remove('hidden');
  console.log(currentUser)
  // renderBookings()
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
function getCurrentUser() {
  const newCustomerData = Object.keys(customersData.customers);
  const currentUserID = newCustomerData[Math.floor(Math.random() * newCustomerData.length)];
  const customers = Object.values(customersData.customers);
  const current = customers.find(user => user.id === Number(currentUserID));
  currentUser = new Customer(current)
  console.log(currentUser) // remove
};

function getCurrentBookings() {
  const newBookingsData = [bookingsData.bookings];
  console.log('New Bookings: ', newBookingsData)
  const bookings = newBookingsData.map(booking => {
    console.log('booking: ', booking);
    const x = new Booking(booking);
    return x
  });
  console.log(bookings[0])
  // const currentBookings = newBookingsData
  currentBookings = currentUser.showBookings(bookings, roomsData);
  console.log(currentBookings[0]) 
};

function getRooms() {
  console.log(roomsData[0])
  const allRooms = roomsData.map(room => {
    const x = new Room(room);
    return x
  });
  console.log('AllRooms: ', allRooms)
}

function renderBookings() {
  bookingsGrid.innerHTML = '';
  bookingsGrid.innerHTML = 
  data.map(booking => `<li class="booking-card">
    <div class="booking-info">
      <h3 id="" class="date">${booking.date}</h3>
      <h3 id="" class="date">${booking.roomNumber}</h3>
    </div>
    <div class="tag-container">Room Details
      <ul class="room-info">
          ${room[booking.roomNumber].roomType}
          ${room[booking.roomNumber].bedSize}
          ${room[booking.roomNumber].numBeds}
          ${room[booking.roomNumber].bidet}
      </ul>
    </div>
    <div>
      <h3 id="" class="">Cost per Night: ${room[booking.roomNumber].costPerNight}
      <h3 id="" class="date">Confirmation ${booking.id}</h3>
    </div>
    <button class="remove-button" id="${recipe.id}">Remove from Favorites</button>
  </li>`
  ).join('');
};