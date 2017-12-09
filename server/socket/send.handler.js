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
		this.sendToClients({ type: 'open', clients: this.wss.clients.size }, true);
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
		if (message.type === 'login') {
			this.handleSignIn(message.id, message.email, message.password);
		} else if (message.type === 'date') {
			this.handleGetSpecificDate(message.id, message.idToken, message.date);
		} else if (message.type === 'book') {
			this.handleBookTime(
				message.id,
				message.idToken, 
				message.date, 
				message.time, 
				message.name);
		}
	}

	sendToClient(ws, message) {
		this.wss.clients.forEach((client) => {
			if (client.readyState === this.webSocket.OPEN) {
				if (client === ws) client.send(JSON.stringify(message));
			}
		});
	}

	sendToClients(message) {
		this.wss.clients.forEach((client) => {
			if (client.readyState === this.webSocket.OPEN) client.send(JSON.stringify(message));
		});
	}

	handleSignIn(id, email, password) {
		if (email && password) {
			this.firebaseAuth.signIn(email, password)
				.then((res) => {
					this.sendToClient(this.users[id], 
						{
							type: 'login', 
							success: true, 
							idToken: res, 
							name: email.substr(0, email.indexOf('@'))
						});		
				})
				.catch((error) => {
					this.sendToClient(this.users[id], { type: 'login', success: false, errorMsg: error });
				});
		}
	}

	handleGetSpecificDate(id, idToken, date) {
		this.firebaseAuth.authToken(idToken)
			.then((res) => {
				FirebaseHandler.fetchSpecificDate(date)
					.then((res) => {
						this.sendToClient(this.users[id], { type: 'bookings', date: date, bookings: res ? [res] : [] });
					})
					.catch((error) => {
						console.log('error : fetchSpecificDate');
					});
			})
			.catch((error) => {
				/* TODO Hantera expired IDTOKEN */
				console.log('error : authToken');
			});
	}

	handleBookTime(id, idToken, date, time, name) {
		this.firebaseAuth.authToken(idToken)
			.then((res) => {
				FirebaseHandler.bookTime(date, name, time)
					.then((res) => {
						this.sendToClients({ type: 'bookings', date: date, bookings: res ? [res] : [] });	
					})	
					.catch((error) => {
						console.log('error : booking');
					});
			})
			.catch((error) => {
				console.log('error : authToken');
			});
	}

}

module.exports = new SendHandler();
