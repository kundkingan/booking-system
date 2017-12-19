# Booking-system

[![Maintainability](https://api.codeclimate.com/v1/badges/58920c3afec03c58e431/maintainability)](https://codeclimate.com/github/kundkingan/booking-system/maintainability)
[![codecov](https://codecov.io/gh/kundkingan/booking-system/branch/master/graph/badge.svg)](https://codecov.io/gh/kundkingan/booking-system)
[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/kundkingan/booking-system/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/kundkingan/booking-system/?branch=master)
[![Build Status](https://scrutinizer-ci.com/g/kundkingan/booking-system/badges/build.png?b=master)](https://scrutinizer-ci.com/g/kundkingan/booking-system/build-status/master)
[![Code Coverage](https://scrutinizer-ci.com/g/kundkingan/booking-system/badges/coverage.png?b=master)](https://scrutinizer-ci.com/g/kundkingan/booking-system/?branch=master)
[![Build Status](https://travis-ci.org/kundkingan/booking-system.svg?branch=dev)](https://travis-ci.org/kundkingan/booking-system)

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Installation

```
git clone https://github.com/kundkingan/booking-system.git
```

```
npm start
```

## Development server


### Start backend

Run `npm start` to start backend server on port 3030. You can change server port with environment variable. 

`PORT=8080 npm start`

If you changed port, you also have to change the port manually for frontend.
Navigate to `src/app/_services/services/socket.service.ts`

And change line 5 `const URL = 'ws://localhost:3000/'`
To the port your server is running on

### Start frontend

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `server/dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## CI

## Realtime

## Database

## Own module
