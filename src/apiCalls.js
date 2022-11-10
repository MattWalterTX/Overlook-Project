function getCustomerData() {
  return fetch('http://localhost:3001/api/v1/customers')
    .then(response => response.json()
    .catch(err => console.log(err)));
};

function getBookingData() {
  return fetch('http://localhost:3001/api/v1/bookings')
    .then(response => response.json()
    .catch(err => console.log(err)));
};

function getRoomData() {
  return fetch('http://localhost:3001/api/v1/rooms')
    .then(response => response.json()
    .catch(err => console.log(err)));
};

export { getCustomerData, getBookingData, getRoomData }