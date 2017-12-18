import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { DataService } from './data.service';

const URL = 'ws://localhost:3000/';

@Injectable()
export class SocketService {
	open = false;
	private socket: WebSocket;

	constructor(private dataService: DataService) {
		this.socket = new WebSocket(URL, 'json');

		this.socket.onopen = event => {
			this.open = true;
			this.dataService.sendOnOpen(event);
		};

		this.socket.onmessage = event => {
			this.dataService.sendOnMessage(JSON.parse(event.data));
		};

		this.socket.onclose = event => {
			this.dataService.sendSocketDown(true);
			this.open = false;
		};
	}

	send(data) {
		if (this.socket.readyState === 1) { this.socket.send(JSON.stringify(data)); }
	}

	close() {
		this.socket.close();
	}

}
