let FirebaseHandler = require('../firebase/firebase.handler');
let FirebaseAuthNode = require('firebase-auth-node');
let firebaseConfig = require('../firebase/firebase.config.json');
let serviceAccount = require('../firebase/firebase.service-key.json');

class SendHandler {
	
	constructor(webSocketServer, webSocket) {
		this.wss = webSocketServer;
		this.webSocket = webSocket;
		this.firebaseAuth = new FirebaseAuthNode(firebaseConfig, serviceAccount, 'admin-auth');
		this.users = {};
		this.posOfLeaver;
	}

	initSendHandler(webSocketServer, webSocket) {
		this.wss = webSocketServer;
		this.webSocket = webSocket;
		this.users = [];
	}

	onConnection(ws) {
		let posFound = false, pos;

		for (let i = 0; i < this.users.length; i++) {
			if (!this.users[i]) {
				posFound = true;
				pos = i;
				break;
			}
		}
		posFound ? this.users[pos] = ws : pos = this.users.push(ws) - 1;

		this.sendToClient(ws, { type: 'userId', id: pos });
		console.log('Connection received: ' + this.wss.clients.size);
	}

	onClose(ws, code, reason) {
		this.sendToClients({type: 'close', clients: this.wss.clients.size});
		for (let i = 0; i < this.users.length; i++) {
			if (this.users[i] === ws) {
				this.users.splice(i, 1, null);
				break;
			}
		}
		console.log(`Closing connection: ${code} ${reason}`);
	}

	onMessage(message) {
		console.log(message);
		switch (message.type) {
			case 'login':
				this.handleSignIn(message.id, message.email, message.password);
				break;

			case 'valid':
				this.handleCheckValidToken(message.id, message.idToken);
				break;

			case 'date':
				this.handleGetSpecificDate(message.id, message.idToken, message.date);
				break;

			case 'book':
				this.handleUpdateBookings(
					message.id,
					message.idToken,
					message.uid,
					message.date,
					message.time,
					message.name);
				break;

			case 'user':
				this.handleGetUser(
					message.id,
					message.idToken,
					message.uid);
				break;

			case 'cancel':
				this.handleRemoveBooking(
					message.id,
					message.idToken,
					message.uid,
					message.date,
					message.time);
				break;
		}
	}

	sendToClient(ws, message) {
		this.wss.clients.forEach((client) => {
			if (client.readyState === this.webSocket.OPEN) {
				if (client === ws) {client.send(JSON.stringify(message));}
			}
		});
	}

	sendToClients(message) {
		this.wss.clients.forEach((client) => {
			if (client.readyState === this.webSocket.OPEN) {client.send(JSON.stringify(message));}
		});
	}

	handleSignIn(id, email, password) {
		if (email && password) {
			this.firebaseAuth.signIn(email, password)
			.then((user) => {
				this.sendToClient(this.users[id],
				{
					type: 'login',
					success: true,
					idToken: user.idToken,
					uid: user.uid,
					name: email.substr(0, email.indexOf('@'))
				});
			})
			.catch((error) => {
				this.sendToClient(this.users[id], { type: 'login', success: false, errorMsg: error });
			});
		}
	}

	handleCheckValidToken(id, idToken) {
		this.firebaseAuth.authToken(idToken)
			.then(() => {
				console.log('valid')
				this.sendToClient(this.users[id], { type: 'valid', valid: true })
			})
			.catch((error) => {
				console.log('invalid')
				this.sendToClient(this.users[id], { type: 'valid', valid: false })
			});
	}

	handleGetSpecificDate(id, idToken, date) {
		this.firebaseAuth.authToken(idToken)
		.then(() => {
			FirebaseHandler.getSpecificDate(date)
			.then((res) => {
				this.sendToClient(
					this.users[id],
					{
						type: 'bookings',
						date: date,
						bookings: res ? [res] : []
					}
				);
			})
			.catch((error) => {
				console.log('error : getSpecificDate');
			});
		})
		.catch((error) => {
			/* TODO Hantera expired IDTOKEN */
			console.log('error : authToken');
		});
	}

	handleGetUser(id, idToken, uid) {
		this.firebaseAuth.authToken(idToken)
		.then(() => {
			FirebaseHandler.getUser(uid)
			.then((res) => {
				this.sendToClient(
					this.users[id],
					{
						type: 'user',
						bookings: res['bookings']
					}
				);
			})
			.catch((error) => {
				console.log('error : getUserInfo');
			});
		})
		.catch((error) => {
			/* TODO Hantera expired IDTOKEN */
			console.log('error : authToken');
		});
	}

	handleUpdateBookings(id, idToken, uid, date, time, name) {
		this.firebaseAuth.authToken(idToken)
			.then(() => {
				FirebaseHandler.updateUserBooking(uid, date, time)
					.catch((error) => {
						console.log('error : booking');
					});

				FirebaseHandler.updateBooking(date, time, name)
					.then((res) => {
						this.sendToClients({
							type: 'bookings',
							date: date,
							bookings: res ? [res] : []
						});
					})
					.catch((error) => {
						console.log('error : booking');
					});
			})
			.catch((error) => {
				console.log('error : authToken');
			});
	}

	handleRemoveBooking(id, idToken, uid, date, time) {
		this.firebaseAuth.authToken(idToken)
			.then(() => {
				FirebaseHandler.removeUserBooking(uid, date)
					.then(() => {
						this.sendToClient(this.users[id], { type: 'cancel', success: true })
						FirebaseHandler.removeBooking(date, time)
							.then((res) => {
								this.sendToClients({
									type: 'bookings',
									date: date,
									bookings: res ? [res] : []
								});
							})
							.catch((error) => {
								console.log('error : removeBooking')
							});
					})
					.catch((error) => {
						this.sendToClient(this.users[id], { type: 'cancel', success: false })
						console.log('error : removeBooking')
					});
			})
			.catch((error) =>{
				console.log('error : auth')
			});
	}
}

module.exports = new SendHandler();
