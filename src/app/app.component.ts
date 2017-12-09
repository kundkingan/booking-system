import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService, SessionService } from './_services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {

	public messages: Array<any>;
	private userInfo;

	constructor(
		private dataService: DataService,
		private sessionService: SessionService,
		private router: Router) {
		this.checklogin();
		this.subscribeToSocket();
	}

	checklogin() {
		this.sessionService.initUserInfo();
		this.userInfo = this.sessionService.getUserInfo();
		if (!this.userInfo['loggedIn']) { this.router.navigate(['/login']); }
	}

	subscribeToSocket() {
		this.dataService.getOnMessage$.subscribe(data => {
			console.log(data);

			switch (data['type']) {
				case 'login':
					this.handlelogin(data);
					break;
				case 'bookings':
					this.handleSelectedDate(data);
					break;
				case 'user':
					this.handleProfile(data);
					break;
				case 'userId':
					this.sessionService.setIdToUserInfo(data['id']);
					break;
			}
		});
	}

	handlelogin(login) {
		if (login['success']) {
			this.sessionService.saveUserInfo({
				loggedIn: true,
				id: login['id'],
				idToken: login['idToken'],
				uid: login['uid'],
				name: login['name']
			});
			this.router.navigate(['']);
		} else {
			this.dataService.sendOnLoginFail(login['errorMsg']);
		}
	}

	handleSelectedDate(bookings) {
		this.dataService.sendBookings(bookings);
	}

	handleProfile(profile) {
		this.dataService.sendProfile(profile);
	}

}
