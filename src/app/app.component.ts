import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, SessionService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent{

	public messages: Array<any>;
	private userInfo;

	constructor(
		private dataService: DataService, 
		private sessionService: SessionService,
		private router: Router) 
	{
		this.checklogin();
		this.subscribeToSocket();
	}

	checklogin() {
		this.sessionService.initUserInfo();
		this.userInfo = this.sessionService.getUserInfo();
		this.userInfo['loggedIn'] ? this.router.navigate(['/home']) : this.router.navigate(['/login'])
	}

	subscribeToSocket() {
		this.dataService.getOnOpen$.subscribe(data => {
			this.dataService.sendCurrentUsers(data['clients']);
		});

		this.dataService.getOnMessage$.subscribe(data => {
			console.log(data);
			if (data['type'] === 'open' || data['type'] === 'close') {
				this.dataService.sendCurrentUsers(data['clients']);
			} else if (data['type'] === 'login') {
				this.handlelogin(data);
			} else if (data['type'] === 'bookings') {
				this.handleSelectedDate(data);
			} else if (data['type'] === 'userId') {
				this.sessionService.setIdToUserInfo(data['id']);
			}
		});
	}

	handlelogin(login) {
		if (login['success']) {
			this.sessionService.saveUserInfo({
				loggedIn: true, 
				id: login['id'],
				idToken: login['idToken'], 
				name: login['name']
			});
			this.router.navigate(['/home']);
		} else {
			this.dataService.sendOnLoginFail(login['errorMsg']);
		}
	}

	handleSelectedDate(bookings) {
		this.dataService.sendBookings(bookings);
	}

}
