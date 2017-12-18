import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService, SessionService, SocketService } from './_services';

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
		private socketService: SocketService,
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
		this.dataService.getOnOpen$.subscribe(data => {
			if (this.userInfo.id) {
				this.socketService.send({ type: 'valid', id: this.userInfo.id, idToken: this.userInfo.idToken });
			}
		});

		this.dataService.getOnMessage$.subscribe(data => {
			console.log(data);

			switch (data['type']) {
				case 'login':
					this.handlelogin(data);
					break;

				case 'valid':
					this.handleValidToken(data['valid']);
					break;

				case 'bookings':
					this.handleSelectedDate(data);
					break;

				case 'user':
					this.handleProfile(data);
					break;

				case 'userId':
					this.handleUserId(data);
					break;

				case 'cancel':
					this.handleCancel(data);
					break;
			}
		});

		this.dataService.getSocketdown$.subscribe(data => {
			this.sessionService.unsetUserInfo();
			this.router.navigate(['/login']);
		});
	}

	handlelogin(login) {
		if (login['success']) {
			this.sessionService.saveUserInfo({
				loggedIn: true,
				id: this.userInfo.id,
				idToken: login['idToken'],
				uid: login['uid'],
				name: login['name']
			});
			this.router.navigate(['']);
		} else {
			this.dataService.sendOnLoginFail(login['errorMsg']);
		}
	}

	handleValidToken(valid) {
		if (!valid) {
			this.sessionService.unsetUserInfo();
			this.router.navigate(['/login']);
		}
	}

	handleSelectedDate(bookings) {
		this.dataService.sendBookings(bookings);
	}

	handleProfile(profile) {
		this.dataService.sendProfile(profile);
	}

	handleUserId(data) {
		this.sessionService.setIdToUserInfo(data['id']);
	}

	handleCancel(data) {
		this.dataService.sendCancel(data);
	}

}
