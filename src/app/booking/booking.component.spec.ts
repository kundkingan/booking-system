import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingComponent } from './booking.component';
import { SessionService, SocketService, DataService } from '../_services';
import { Bookings } from './booking.interface';

describe('BookingComponent', () => {
	let sessionService, socketService, dataService, router, bookings;
	let bookingComponent;

	beforeEach(() => {
		sessionService = new SessionService();
		dataService = new DataService();
		socketService = new SocketService(dataService);
		bookings = new Bookings();
		bookingComponent = new BookingComponent(sessionService, socketService, dataService, bookings);
	});

	it('getBookings should set dayAlreadyBooked to false', () => {
		const data = {
			date: '2017-12-12',
			bookings: [
				{
					'07:00 - 11:00':  {
						By: '123',
						Time: '07:00 - 11:00'
					}
				},
					{
					'11:00 - 15:00': {
						By: '123',
						Time: '11:00 - 15:00'
					},
				},
				{
					'15:00 - 19:00': {
						By: '123',
						Time: '15:00 - 19:00'
					}
				}
			]
		};
		// bookings.insertData(data);

		// for (const booked of data['bookings']) {
		// }

		bookingComponent.chosenDate = '2017-12-12';
  	dataService.sendBookings(data);
  	expect(bookingComponent.dayAlreadyBooked).toEqual(true);
	});

	it('onChangeDate should set chosenDate and send to socketService', () => {
		const event = {value: new Date()};

		bookingComponent.onChangeDate(event);
		event.value.setSeconds(3600);

  	expect(bookingComponent.chosenDate).toEqual(event.value.toISOString().split('T')[0]);
	});

	it('onBookTime should send to socketService', () => {
		bookingComponent.onBookTime({ Booked: 'No', Time: '123'});
		bookingComponent.dayAlreadyBooked = true;
		bookingComponent.onBookTime({ Booked: 'Yes', Time: '123'});
	});

});
