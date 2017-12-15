'use strict';
let serviceAccount = require('./firebase.service-key.json');
let firebaseConfig = require('./firebase.config.json');

class FirebaseHandler {
	constructor() {
		this.admin = require('firebase-admin');

		this.admin.initializeApp({
			credential: this.admin.credential.cert(serviceAccount),
			databaseURL: "https://booking-system-7f301.firebaseio.com"
		});
		this.database = this.admin.database();
	}

	getSpecificDate(date) {
		return this.database.ref('bookings').child(date).once('value')
			.then(snapshot => {
				return snapshot.val();
			})
			.catch((error) => {
				console.log('error get date');
				throw error;
			});
	}

	getUser(uid) {
		return this.database.ref('users').child(uid).once('value')
			.then(snapshot => {
				return snapshot.val();
			})
			.catch((error) => {
				console.log('error get userinfo');
				throw error;
			});
	}

	updateBooking(date, time, name) {
		return this.database.ref('bookings').child(date).child(time)
			.set({ time: time, by: name })
			.then(() => {
				return this.getSpecificDate(date);
			})
			.catch((error) => {
				console.log('error book');
				throw error;
			});
	}

	updateUserBooking(uid, date, time) {
		return this.database.ref('users')
			.child(uid).child('bookings').child(date)
			.set({ date: date, time: time , active: true})
			.catch((error) => {
				console.log('error book');
				throw error;
			});
	}

	removeBooking(date, time) {
		return this.database.ref('bookings').child(date).child(time)
			.remove()
			.then(() => {
				return this.getSpecificDate(date);
			})
			.catch((error) => {
				console.log('error cancel');
				throw error;
			});
	}

	removeUserBooking(uid, date) {
		return this.database.ref('users')
			.child(uid).child('bookings').child(date)
			.remove()
			.catch((error) => {
				console.log('error book');
				throw error;
			});
	}
	
}

module.exports = new FirebaseHandler();
