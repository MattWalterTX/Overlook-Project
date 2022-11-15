# Overlook

## Abstract
- Self contained application that acts as a hotel management tool for hotel customers and staff to manage room bookings and calculate customer bills.

#### Goals and Objectives

- Use OOP to drive the design of the application and the code
- Work with an API to send and receive data
- Solidify the code review process
- Create a robust test suite that thoroughly tests all functionality of a client-side application

## Technologies
- ![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
- ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
- ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
- ![Mocha](https://img.shields.io/badge/-mocha-%238D6748?style=for-the-badge&logo=mocha&logoColor=white)
- ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
- ![Webpack](https://img.shields.io/badge/webpack-%238DD6F9.svg?style=for-the-badge&logo=webpack&logoColor=black)

## Illustrations
![Screenshot 2022-11-15 at 11 47 45 AM](https://user-images.githubusercontent.com/106847513/201992298-8492643f-0ff5-4732-befa-4c1785e33d84.png)

![Screenshot 2022-11-15 at 11 47 58 AM](https://user-images.githubusercontent.com/106847513/201992312-762b78f4-1c85-4a6f-8385-d5ec00ac02e4.png)

![Screenshot 2022-11-15 at 11 48 14 AM](https://user-images.githubusercontent.com/106847513/201992337-e97610d6-ef2e-415b-98c6-16cabfaeb312.png)


## Features
- Login for multiple users
- Available rooms searchable by date and room type
- All user bookings shown on home page with total spent
- 100% accessibility score on Lighthouse and app is fully tabbable

## Possible Future Extensions
- Complete Manager class interactions to view a customers bookings, then add and remove bookings
- Display daily revenue streams and occupation percentages by date

#### Milestones
- I feel that I am gaining better understanding of manipulating DOM objects for desired results
- Outside of a few issues with attaching event listeners, I did not have to reach out for help nearly as much as I thought I would. 

#### Challenges 
- I learned a valuable lesson about reusing code: Double check it now, not later! I lost hours of time looking for non-existent Javascript error when the error was that i did not double check the CSS styling code of my buttons. While fighting an issue on another project we had inserted a pointer-event: none; that was disabling my created DOM elements from being able to accept the needed click to fire off.  

## Set Up
1. Clone the repo
   ```sh
   git clone git@github.com:MattWalterTX/Overlook-Project.git
   ```
2. Enter the directory and install NPM packages
   ```sh
   npm install
   npm start
   ``` 
3. Clone the local API repo 
   ```sh
   git clone git@github.com:turingschool-examples/overlook-api.git
   ```
4. Enter the API directory and start the local server
   ```sh
   npm install
   npm start
   ```
5. Enter the following url in your browser: http://localhost:8080/
6. Explore the website

## Sources
  - [MDN](http://developer.mozilla.org/en-US/)
  - [YouTube](https://www.youtube.com/)
  - [Canva](https://www.canva.com/)

## Contributors
  - [Matt Walter](https://github.com/MattWalterTX)

## Project Specs
  - The project spec & rubric can be found [here](https://frontend.turing.edu/projects/overlook.html)

