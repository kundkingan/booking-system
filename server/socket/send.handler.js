let FirebaseHandler = require('../firebase/firebase.handler');

class SendHandler {

	constructor(webSocketServer, webSocket) {
		this.wss = webSocketServer;
		this.webSocket = webSocket;
		this.users = [];
	}

	initSendHandler(webSocketServer, webSocket) {
		this.wss = webSocketServer;
		this.webSocket = webSocket;
		this.users = [];
	}

	onConnection(ws) {
		this.ws = ws;
		this.sendToClients({type: 'open', clients: this.wss.clients.size}, true);
		console.log('Connection received: ' + this.wss.clients.size);
	}
	
	onClose(code, reason) {
    this.sendToClients({type: 'close', clients: this.wss.clients.size}, true)
    console.log(`Closing connection: ${code} ${reason}`);
	}

	onMessage(message) {
		if (message.type === 'login') {
			this.signInUser(message);
		} else if (message.type === 'date') {
			this.handleGetSpecificDate(message.idToken, message.date);
		} else if (message.type === 'book') {
			this.handleBookTime(message.idToken, message.date, message.time, message.name);
		}
	}

	sendToClient(message) {
		this.wss.clients.forEach((client) => {
			if (client.readyState === this.webSocket.OPEN) {
				if (client === this.ws) client.send(JSON.stringify(message));
			}
		});
	}

	sendToClients(message, toAll = false) {
		this.wss.clients.forEach((client) => {
			let send = true;
			if (client.readyState === this.webSocket.OPEN) 
				if (!toAll && client === this.ws) send = false
			
			if (send) client.send(JSON.stringify(message));
		});
	}

	signInUser(message) {
		if (message.email && message.password) {
			FirebaseHandler.signIn(message.email, message.password)
				.then((res) => {
					this.sendToClient( 
						{
							type: 'login', 
							success: true, 
							idToken: res, 
							name: message.email.substr(0, message.email.indexOf('@'))
						});		
				})
				.catch((error) => {
					this.sendToClient({ type: 'login', success: false, errorMsg: error });
				});
		}
	}

	handleGetSpecificDate(idToken, date) {
		FirebaseHandler.authToken(idToken)
			.then((res) => {
				FirebaseHandler.fetchSpecificDate(date)
					.then((res) => {
						this.sendToClient({ type: 'bookings', bookings: res ? [res] : [] });
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

	handleBookTime(idToken, date, time, name) {
		FirebaseHandler.authToken(idToken)
			.then((res) => {
				FirebaseHandler.bookTime(date, name, time)
					.then((res) => {
						this.sendToClients({ type: 'bookings', bookings: res ? [res] : [] }, true);	
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

