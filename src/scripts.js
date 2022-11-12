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
let customersData, roomsData, bookingsData, currentUser, currentBookings, currentRooms, selectedDate, filterSelector, today;

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
  });
};

// QUERY SELECTORS
const homeView = document.querySelector('#home-view');
const galleryView = document.querySelector('#gallery-view');
const aboutView = document.querySelector('#about-view');
const loginView = document.querySelector('#login-view');
const homeButton = document.querySelector('#home-button');
const galleryButton = document.querySelector('#gallery-button');
const aboutButton = document.querySelector('#about-button');
// const roomButton = document.querySelector('#room-button');
const bookButton = document.querySelector('#book-button');
const bookingsGrid = document.querySelector('#bookings-grid');
const availableGrid = document.querySelector('#available-grid');
const greeting = document.querySelector('#greeting');
const reward = document.querySelector('#reward');
const calendar = document.querySelector('#start');
// const typesDropDown = document.querySelector('#filter');
const rS = document.querySelector('#rS');
const s = document.querySelector('#s');
const sR = document.querySelector('#sR');
const jS = document.querySelector('#jS');



// EVENT LISTENERS
window.addEventListener('load', instantiateData);
homeButton.addEventListener('click', showHome);
galleryButton.addEventListener('click', showGallery);
aboutButton.addEventListener('click', showAbout);
// roomButton.addEventListener('click', showRoomDetails);
calendar.addEventListener('change', (e) => {
  e.preventDefault();
  selectedDate = e.target.value.split('-').join('/')
  roomsByDate(currentBookings, currentRooms, selectedDate)
});
rS.addEventListener('change', alterList);
s.addEventListener('change', alterList);
sR.addEventListener('change', alterList);
jS.addEventListener('change', alterList);
bookButton.addEventListener('click', (e) => {
  // e.preventDefault();
  console.log('selected room: ', e.target.id)
  const selectedRoom = e.target;
  bookRoom(selectedRoom)
});


// FUNCTIONS
function loadUser() {
  currentUser.myBookings(currentBookings)
  loadGreeting();
  loadRewards();
  renderBookings();
};

// View
function toggleHidden(view) {
  // loginView
  homeView.classList.add('hidden');
  galleryView.classList.add('hidden');
  aboutView.classList.add('hidden');
  view.classList.remove('hidden')

}

function showHome() {
  toggleHidden(homeView);
};

function showGallery() {
  toggleHidden(galleryView);
};

function showAbout() {
  toggleHidden(aboutView);
};

// HELPERS
function loadGreeting() {
  greeting.innerHTML = `Welcome Back ${currentUser.name}!`;
};

function loadRewards() {
  if(currentUser.totalCosts(currentRooms) < 10000) {
    reward.innerHTML = `<p>You have spent $${currentUser.totalCosts(currentRooms)} with this year. 
      <br>Spend over $10,000.00 with us for a complimentary 5 night stay!</p>`;
  }
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

// function showRoomDetails() {
  
// }

function roomsByDate(books, roms, date) {
  today = currentUser.checkRooms(books, roms, date);
  const todaysRooms = today;
  if(today.length > 0) {
    availableGrid.innerHTML = '';
    availableGrid.innerHTML = 
    today.map(room => 
    `<li class="room-card">
        <div class="room-info">
          <div>
            <h3 id="" class="info">Room Number : ${room.number}</h3>
            <h3 id="" class="info">Room Type : ${room.roomType}</h3>
            <h3 id="" class="info">Bed Type : ${room.bedSize}</h3>
          </div>
          <div>
            <h3 id="" class="info">Bed Count : ${room.numBeds}</h3>
            <h3 id="" class="info">Has Bidet : ${room.bidet}</h3>
            <h3 id="" class="info">Nightly Cost : ${room.costPerNight}</h3>
          </div>
        </div>
        <button id="book-room" class="room-button info">Book Room</button>
    </li>`)
  .join('');
  } else {
    availableGrid.innerHTML = '';
    availableGrid.innerHTML = 
      `<div class="message">
        <p>There are no availabilties  on this date - Please enter a new date</p>
        <span> We apologize for the inconvenience! When you do find the room of your dreams, please call in to our front desk! 
          Let them know your first choice was already booked and our Maître d'Hôtel will off you his personal apologies as well as a verbal confirmation for your stay. 
        <br>This confirmation will also provide a comp of your party's dinner on the night of your arrival.</span>
        <p>Compliments of Dick Hallorann</p>
      </div>`
  };
};

function bookRoom(room) {
  // event.preventDefault();
  console.log('room: ', room)
}

function roomsByType(data) {
  if(data !== 'residential suite' || 'suite' || 'single room' || 'junior suite') {
    availableGrid.innerHTML = '';
    availableGrid.innerHTML = `<p>Please Select a Date to View Rooms</p>`
    return 'error'
  } else {
  const filterSelector = today.filter(room => room.roomType === data);
  // console.log('filter selector', filterSelector)
  availableGrid.innerHTML = '';
  availableGrid.innerHTML = 
  filterSelector.map(room => 
  `<li class="room-card">
      <div class="room-info">
        <div>
          <h3 id="" class="info">Room Number : ${room.number}</h3>
          <h3 id="" class="info">Room Type : ${room.roomType}</h3>
          <h3 id="" class="info">Bed Type : ${room.bedSize}</h3>
        </div>
        <div>
          <h3 id="" class="info">Bed Count : ${room.numBeds}</h3>
          <h3 id="" class="info">Has Bidet : ${room.bidet}</h3>
          <h3 id="" class="info">Nightly Cost : ${room.costPerNight}</h3>
        </div>
      </div>
      <button id="book-button" class="room-button info">Book Room</button>
  </li>`)
  .join(''); }
};

function alterList(event) {
  event.preventDefault();
  // console.log(event.target.id)
  const filterSelector = event.target.value;
  roomsByType(filterSelector);
};


