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

// GLOBAL VARIABLES
let customersData, roomsData, bookingsData, currentUser, currentBookings, currentRooms, selectedDate;

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
const roomButton = document.querySelector('.room-button');
const bookingsGrid = document.querySelector('#bookings-grid');
const availableGrid = document.querySelector('#available-grid');
const greeting = document.querySelector('#greeting');
const reward = document.querySelector('#reward');
const calendar = document.querySelector('#start');

// EVENT LISTENERS
window.addEventListener('load', instantiateData);
homeButton.addEventListener('click', showHome);
galleryButton.addEventListener('click', showGallery);
aboutButton.addEventListener('click', showAbout);
// roomButton.addEventListener('click', showRoomDetails);
calendar.addEventListener('change', (e) => {
  e.preventDefault();
  selectedDate = e.target.value.split('-').join('/')
  // console.log(typeof selectedDate)
  roomsByDate(currentBookings, selectedDate)
})

// FUNCTIONS
function loadUser() {
  currentUser.myBookings(currentBookings)
  loadGreeting();
  loadRewards();
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
  greeting.innerHTML = `Welcome Back ${currentUser.name}!`;
};

function loadRewards() {
  console.log
  reward.innerHTML = `You have spent $${currentUser.totalCosts(currentRooms)} with this year. Spend over $10,000.00 with us for a complimentary 5 night stay!`;
};

function renderBookings() {
  bookingsGrid.innerHTML = '';
  bookingsGrid.innerHTML = 
    currentUser.bookings.map(booking => 
    `<li class="booking-card">
    <div class="booking-info">
      <h3 id="" class="info">${booking.date}</h3>
      <h3 id="" class="info">Room Number ${booking.roomNumber}</h3>
    </div>
    <button id="${booking.id}" class="room-button info">View Room Details</button>
    <div>
      <h3 id="" class="info">Conf# ${booking.id}</h3>
    </div>
  </li>`)
  .join('');
};

function roomsByDate(data, date) {
  const today = currentUser.checkRooms(data, date);
  
  console.log(date, today)
  // availableGrid.innerHTML = '';
  // availableGrid.innerHTML = 
    
};



