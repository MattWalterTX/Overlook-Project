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

// GLOBAL VARIABLES


// QUERY SELECTORS
const homeView = document.querySelector('#home-view');
const galleryView = document.querySelector('#gallery-view');
const aboutView = document.querySelector('#about-view');
const homeButton = document.querySelector('#home-button');
const galleryButton = document.querySelector('#gallery-button');
const aboutButton = document.querySelector('#about-button');

// EVENT LISTENERS
homeButton.addEventListener('click', showHome);
galleryButton.addEventListener('click', showGallery);
aboutButton.addEventListener('click', showAbout);


// Views
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

function renderBookings(data) {
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