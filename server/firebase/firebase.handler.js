'use strict';
let serviceAccount = require('./firebase.service-key.json');
let firebaseConfig = require('./firebase.config.json');

class FirebaseHandler {

	constructor() {
		// this.firebase = require('firebase');
		this.admin = require('firebase-admin');

		// this.firebase.initializeApp(firebaseConfig, 'database');
		this.admin.initializeApp({
			credential: this.admin.credential.cert(serviceAccount),
			databaseURL: "https://booking-system-7f301.firebaseio.com"
		});
		this.database = this.admin.database();
	}

	fetchSpecificDate(date) {
		return this.database.ref('bookings').child(date).once('value')
		.then(snapshot => {
			return snapshot.val();
		})
		.catch((error) => {
			console.log(error.message);
			console.log('error fetch')
			throw error;
		});
	}

	bookTime(date, name, time) {
		return this.database.ref('bookings').child(date).child(time)
		.set({ time: time, by: name })
		.then(() => {
			return this.fetchSpecificDate(date);
		})
		.catch((error) => {
			console.log('error book')
			throw error;
		});
	}

}

module.exports = new FirebaseHandler();