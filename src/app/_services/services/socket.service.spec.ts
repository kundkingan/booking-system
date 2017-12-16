import { TestBed, inject } from '@angular/core/testing';
import { SocketService } from './socket.service';
import { DataService } from './data.service';

describe('Test: SocketService', () => {
	let socketService;
	let dataService;

	beforeEach(() => {
		dataService = new DataService();
		socketService = new SocketService(dataService);
	});

	it('should get open', () => {
		dataService.getOnOpen$.subscribe(data => {
			expect(data.type).toBe('open');
		});
	});

	it('should get userId', () => {
		dataService.getOnMessage$.subscribe(data => {
			expect(data.type).toBe('userId');
		});
	});

	it('should close socket', () => {
		socketService.close();
		expect(socketService.open).toBe(false);
	});

});
