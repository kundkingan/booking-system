import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import { SessionService, SocketService, DataService } from '../_services';

describe('ProfileComponent', () => {
	let sessionService, socketService, dataService, router;
  let profileComponent;
  beforeEach(() => {
  	sessionService = new SessionService();
  	dataService = new DataService();
  	socketService = new SocketService(dataService);
    profileComponent = new ProfileComponent(sessionService, socketService, dataService);
  });

  it('should assign cancledDate', () => {
  	profileComponent.onCancel('123', '123');

		expect(profileComponent.canceledDate).toBe('123');
	});

	it('should fetch profile from socketService', () => {
  	profileComponent.fetchProfile();
	});

	it('should test getOnOpen', () => {
  	dataService.sendOnOpen('123');
	});

	it('should test if bookings is added', () => {
		const data = {
			bookings: {
				'2017-12-16': {
	  			active: true,
					date: '2017-12-10',
					time: '07:00 - 11:00',
	  		},
	  		'2030-12-12': {
	  			active: true,
					date: '2030-12-12',
					time: '07:00 - 11:00',
	  		}
			}
		};
  	dataService.sendProfile(data);
  	expect(profileComponent.bookings[0]).toEqual(data['bookings']['2017-12-16']);
	});

	it('should remove a date from bookings if canceled', () => {
		profileComponent.bookings = [
			{
				date: '123'
			}
		];
		profileComponent.canceledDate = '123';

  	dataService.sendCancel('123');
	});

});
