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
import Manager from '../src/class/manager.js'
import {
  getCustomerData,
  getBookingData,
  getRoomData
} from './apiCalls';

// GLOBAL VARIABLES
let customersData, roomsData, bookingsData, currentUser, currentBookings, 
    currentRooms, selectedDate, today, valid;

// API
function instantiateData() {
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
      availableGrid.innerHTML = '';
  });
};

function refreshRooms() {
  getRoomData()
    .then(data => {
      roomsData = data.rooms;
      currentRooms = roomsData.map(room => {
        const newRoom = new Room(room);
        return newRoom
      });
    });
};


// QUERY SELECTORS
const homeView = document.querySelector('#home-view');
const galleryView = document.querySelector('#gallery-view');
const aboutView = document.querySelector('#about-view');
const loginView = document.querySelector('#login-view');
const adminView = document.querySelector('#admin-view');
const homeButton = document.querySelector('#home-button');
const galleryButton = document.querySelector('#gallery-button');
const aboutButton = document.querySelector('#about-button');
const logoutButton = document.querySelector('#logout-button');
const submitButton = document.querySelector('#submit-button');
const bookButton = document.querySelectorAll('#book-button');
// const roomButton = document.querySelector('#room-button');
const bookingsGrid = document.querySelector('#bookings-grid');
const availableGrid = document.querySelector('#available-grid');
const totalBookingsGrid = document.querySelector('#total-bookings-grid');
const greeting = document.querySelector('#greeting');
const reward = document.querySelector('#reward');
const calendar = document.querySelector('#calendar');
const adminCalendar = document.querySelector('#admin-calendar');
const adminInfo = document.querySelector('#admin-info');
const rS = document.querySelector('#rS');
const s = document.querySelector('#s');
const sR = document.querySelector('#sR');
const jS = document.querySelector('#jS');
const uName = document.querySelector('#u-name');
const pWord = document.querySelector('#p-word');
const loginError = document.querySelector('#login-error');




// EVENT LISTENERS
window.addEventListener('load', instantiateData);
homeButton.addEventListener('click', showHome);
galleryButton.addEventListener('click', showGallery);
aboutButton.addEventListener('click', showAbout);
logoutButton.addEventListener('click', reloadPage)
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
submitButton.addEventListener('click', (e) => {
  e.preventDefault();
  loginUser(e)
});
// bookButton.addEventListener('click', bookRoom)

function bookRoom(event) {
  if(event.currentTarget) {console.log('fuckmerunning')}
    // { "userID": 48, "date": "2019/09/23", "roomNumber": 4 }
 else {console.log('stillbroken')}
};
// bookButton.forEach(button => {button.addEventListener('click', bookRoom)})


adminCalendar.addEventListener('change', (e) => {
  e.preventDefault();
  selectedDate = e.target.value.split('-').join('/')
  renderTodaysBookings(currentBookings, currentRooms, selectedDate)
});









// FUNCTIONS
function loadUser() {
  currentUser.myBookings(currentBookings)
  loadGreeting();
  loadRewards();
  renderBookings();
};

function toggleHidden(view) {
  // loginView
  homeView.classList.add('hidden');
  galleryView.classList.add('hidden');
  aboutView.classList.add('hidden');
  if(view !== 'admin') {
  
  view.classList.remove('hidden')
  }
}

function showHome(event) {
  toggleHidden(homeView);
};

function showGallery() {
  toggleHidden(galleryView);
};

function showAbout() {
  toggleHidden(aboutView);
};

function loadGreeting() {
  greeting.innerHTML = `Welcome Back ${currentUser.name}!`;
};

function loadRewards() {
  if(currentUser.totalCosts(currentRooms) < 10000) {
    reward.innerHTML = `<p>You have spent $${currentUser.totalCosts(currentRooms)} with this year. 
      <br>Spend over $10,000.00 with us for a complimentary 5 night stay!</p>`;
  };
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

function displayRoomInfo(roomNumber) {

}

function roomsByDate(books, roms, date) {
  today = currentUser.checkRooms(books, roms, date);
  if(today.length > 0 || typeof today === 'string') {
    availableGrid.innerHTML = '';
    let renders = today.forEach(room => {
    let render = `<section class="room-card">
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
        <button id="book-button" class="room-button info" >Book Room</button>
    </section>`;
    availableGrid.innerHTML += render;
    // bookButton.addEventListener('click', loadUser)
    const bookButton = document.querySelectorAll('#book-button');
    bookButton.forEach(button => button.addEventListener('click', function handleClick(event) {
      console.log('fuckfuckfuck')
    }));
  });
  } else {
    availableGrid.innerHTML = '';
    availableGrid.innerHTML = 
      `<div class="message">
        <p>There are no availabilities on this date - Please enter a new date</p>
        <span> We apologize for the inconvenience! When you do find the room of your dreams, please call in to our front desk! 
          Let them know your first choice of stay was already booked and our Maître d'Hôtel will off you his personal apologies as well as a verbal confirmation for your stay. 
        <br>This confirmation will also provide a comp of your party's dinner on the night of your arrival.</span>
        <p>Compliments of Dick Hallorann</p>
      </div>`
  };
  refreshRooms()
};

function roomsByType(data) {
  if(availableGrid.innerHTML === '' || currentUser.name === 'manager') {
    availableGrid.innerHTML = `<p>Please Select a Date to View Rooms</p>`
  } else {
  const filterSelector = today.filter(room => room.roomType === data);
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
  event.preventDefault()
  const filter = event.target.value;
  roomsByType(filter);
};

function loginUser(event) {
  valid = false
  checkCredentials(event);
  if(valid && currentUser.name !== 'manager') {
    unlockNav();
    showHome();
    login.classList.add('hidden');
  }
  if(valid && currentUser.name === 'manager') {
    homeView.classList.add('hidden');
    renderTodaysBookings(currentBookings, currentRooms, '2022/11/15')
    renderAdminMessage('2022-11-15')
    showAdminPage();
    login.classList.add('hidden');
  } 
};

function checkCredentials(event) {
  if(uName.value.includes('customer') && pWord.value === 'overlook2021') {
    const X = parseInt(uName.value.split('customer')[1]);
    if(X < 1 || X > customersData.length) {
      loginError.innerHTML = '';
      loginError.innerHTML = `<p>Invalid Username or Password</p>`;
    } else {
      loginError.innerHTML = '';
    const user = customersData.find(user => user.id === X);
    currentUser = new Customer(user);
    valid = true;
    loadUser();
    };
  } else if(uName.value === 'manager' && pWord.value === 'overlook2021') {
    loginError.innerHTML = '';
    currentUser = new Manager();
    valid = true;
  }  else {
    loginError.innerHTML = '';
    loginError.innerHTML = `<p>Invalid Username or Password</p>`;
  };
};

function unlockNav() {
  homeButton.classList.remove('hidden');
  galleryButton.classList.remove('hidden');
  aboutButton.classList.remove('hidden');
  logoutButton.classList.remove('hidden');
};

function reloadPage() {
  location.reload();
};

function showAdminPage() {
  adminView.classList.remove('hidden');
  logoutButton.classList.remove('hidden');
};

function renderAdminMessage(date) {
  currentUser.todaysRevenue(currentBookings, currentRooms, date);
  currentUser.percentOccupied(currentBookings, currentRooms, date);
  adminInfo.innerHTML = '';
  adminInfo.innerHTML = 
  `<p>Please Select a Date to View Rooms</p>`
  
  
}

function renderTodaysBookings(books, rooms, date) {
  const render = currentUser.availableRooms(books, rooms, date)
  totalBookingsGrid.innerHTML = 
  render.map(room => 
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
  .join(''); 
}

