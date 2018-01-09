'use strict';

const webSocket = require('ws');
let sendHandler = require('./send.handler');

module.exports = (server) => {
	const wss = new webSocket.Server({
		server: server,
		clientTracking: true,
		handleProtocols: (protocol) => { return 'json'; }
	});

	sendHandler.initSendHandler(wss, webSocket);

	wss.on('connection', (ws) => {
		sendHandler.onConnection(ws);

	  ws.on('message', (data) => {
			try {
				data = JSON.parse(data);
				sendHandler.onMessage(data);
			} catch (e) {
				console.log('error in message');
			}
		});

	  ws.on('close', (code, reason) => sendHandler.onClose(ws, code, reason));

	  ws.on('error', (code, reason) => sendHandler.onClose(ws, code, reason));
	});

	return wss;
};
