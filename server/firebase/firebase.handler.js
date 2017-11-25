'use strict';
let serviceAccount = require('./firebase.service-key.json');
let firebaseConfig = require('./firebase.config.json');

class FirebaseHandler {

	constructor() {
		this.firebase = require('firebase');
		this.admin = require('firebase-admin');

		this.firebase.initializeApp(firebaseConfig);
		this.admin.initializeApp({
		  credential: this.admin.credential.cert(serviceAccount),
		  databaseURL: "https://booking-system-7f301.firebaseio.com"
		});
		this.database = this.admin.database();
	}

	signIn(email, password) {
		return this.firebase.auth().signInWithEmailAndPassword(email, password)
			.then((user) => {
				return this.getIdToken();
			})
			.catch((error) => {
				if (error.code === 'auth/wrong-password') {
					throw 'Wrong password';
				} else if (error.code === 'auth/user-not-found') {
					throw 'Wrong email';
				} else {
					throw false;
				}
			});
	}

	getIdToken() {
		return this.firebase.auth().currentUser.getIdToken(true)
			.then(function(idToken) {
				return idToken;
			}).catch(function(error) {
			  console.log(error.message);
			  console.log('error getIdToken')
			  throw false;
			});
	}

	authToken(idToken) {
		return this.admin.auth().verifyIdToken(idToken)
		  .then(function(decodedToken) {
		    return true;
		  }).catch(function(error) {
		  	console.log('error authToken2')
		  	console.log(error.message);
		  	throw false;
		  });
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