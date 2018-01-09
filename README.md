# Booking-system

[![Build Status](https://travis-ci.org/kundkingan/booking-system.svg?branch=dev)](https://travis-ci.org/kundkingan/booking-system)
[![Build Status](https://scrutinizer-ci.com/g/kundkingan/booking-system/badges/build.png?b=master)](https://scrutinizer-ci.com/g/kundkingan/booking-system/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/kundkingan/booking-system/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/kundkingan/booking-system/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/kundkingan/booking-system/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/kundkingan/booking-system/?branch=master)
[![codecov](https://codecov.io/gh/kundkingan/booking-system/branch/master/graph/badge.svg)](https://codecov.io/gh/kundkingan/booking-system)
[![Maintainability](https://api.codeclimate.com/v1/badges/58920c3afec03c58e431/maintainability)](https://codeclimate.com/github/kundkingan/booking-system/maintainability)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Installation

```bash
$ git clone https://github.com/kundkingan/booking-system.git
$ npm install
$ npm start
```

Navigate to `http://localhost:3000`

## Development

### Requirements

[Angular CLI](https://github.com/angular/angular-cli). How to install and use it is found there.

### Start backend

Run `$ npm start` to start backend server on port 3000.  

Run `$ ng serve` to start frontend server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

You can change server port with environment variable. e.g `$ PORT=8080 npm start`

If you changed the server port, you have to manually change the port for frontend.

Navigate to `src/app/_services/services/socket.service.ts`

On line 5 change, to the port you choose for the server.

`const URL = 'ws://localhost:3000/'`


## Build project

Run `$ ng build` to build the project. The build artifacts will be stored in the `server/dist/` directory. Use the `-prod` flag for a production build.

## Running tests

Run `$ ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

Use the  `--single-run false` flag for no single run.

## Docker

### Run project

I'm using Docker-compose for this project. To deploy with docker, execute the following:

```bash
# Build image
docker-compose build server

# Start image
docker-compose run server
```

### Running tests

You can run 3 different test within a docker container. Each container contains a node version. 

To run a test execute the following:

```bash
# Build images
$ npm run docker-build

# Node v8
$ npm run docker-test-8

# Node v9
$ npm run docker-test-9

# Node latest
$ npm run docker-test-latest
```


## About

The point of this project is to build a booking application that is simple and easy to use. My frontend is built by using Angular. The use of Angular is because I have experience with Angular since before and I think it's a really great framework to use if you want to get started with an web application fast and smooth. Angular also used TypeScript which makes the code cleaner and better scaleable. For backend I choose to use Express also because I've used it before and it's really flexibile, simlpe and got good performance.

### Features

* Secure login with Firebase
* Realtime booking
* See previously booking
* Responsive for mobile


### CI

I choose to use two different tools for each area e.g build status, code coverage and code quaility. This is because I'm not a super fan of 
Scruitinizer but I like that they got everything you need in for your CI. I choose to not only use Scrutinizer and instead use additional tools evaluate my code. This is because I think it's good to get to know not only one tool but multiple to gain more knowledge and experience and also to see what's the difference between the results. Mostly the use of additional tools is also because I really don't like the design of Scrutinizer website and is more a fan of Travis, Codecov and Codeclimate, they feel more modern than Scrutinizer.

Below you will find what each of the testing tools provide to my CI

#### Scrutinzer 
[![Build Status](https://scrutinizer-ci.com/g/kundkingan/booking-system/badges/build.png?b=master)](https://scrutinizer-ci.com/g/kundkingan/booking-system/build-status/master)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/kundkingan/booking-system/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/kundkingan/booking-system/?branch=master)
[![Code Coverage](https://scrutinizer-ci.com/g/kundkingan/booking-system/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/kundkingan/booking-system/?branch=master)

Scrutinizer is used for build status, code coverage and code quaility. 

#### Travis
[![Build Status](https://travis-ci.org/kundkingan/booking-system.svg?branch=dev)](https://travis-ci.org/kundkingan/booking-system)

Travis for build status

#### Codecov
[![codecov](https://codecov.io/gh/kundkingan/booking-system/branch/master/graph/badge.svg)](https://codecov.io/gh/kundkingan/booking-system)

Codecov for code coverage

#### Codeclimate
[![Maintainability](https://api.codeclimate.com/v1/badges/58920c3afec03c58e431/maintainability)](https://codeclimate.com/github/kundkingan/booking-system/maintainability)

Codeclimate for code quality

### Realtime

Realtime is used for communications between frontend and backend. This is done by having the backend server running a [Websocket module](https://www.npmjs.com/package/ws) to achieve the realtime functionality. Every request made from frontend is sent with a websocket. This technique is really easy and flexible to use because it's possible to send JSON objects between frontend and backend. This makes it easy to filter what kind of message/request that is coming to the receiver.

### Database

For storage I use Firebase [Firebase](https://firebase.google.com/). The storage is used to store data about the user and bookings done by the user. 

The data is stored in two "tables", users and bookings. The choice to have two tables is to make it easier to handle a users bookings and display them on their profile page. This could also been achieved with one table with only bookings with a id of the user that booked a time. But with that method I would be required to filter the list of bookings to find a specific user bookings. I choose to priorties the performance of the server since it would be decreased incase there is alot of bookings and there is multiple users requesting their bookings. In the user table I store all their bookings so they can see a history of their recent bookings. 

Since Firebase is using a no-sql database I still think that regular relationship database is good to use. In this case I can divide my data into to tables and then get the data I want with one query. But if there is alot of data with many relations e.g a web shop, I think that a relationship database is better. Then you can query the result you want so you don't filter the result in your backend. The database will have to handle many queries but they are built to handle many queries. But for smaller projects I like to use a no-sql database like Firebase because it's so easy to use and very modern.

### Own module

[Firebase-auth-node](https://www.npmjs.com/package/firebase-auth-node) is a module that is used to authenticate the user through [Firebase](https://firebase.google.com/) own authentication method with email and password. If sign in is successful it will return the id token and uid of the user as an object. 
NPM is a powerful packagemanager and is really easy to use. The way Node.js modules and npm works is great and the way the package.json file works with npm is really making it easy to develop new projects. If you want to upload your own module it is also really easy because of the way the package.json file is built.
