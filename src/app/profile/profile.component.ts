import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService, SocketService, DataService } from '../_services';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.less']
})
export class ProfileComponent {

	bookings = [];
	user = this.sessionService.getUserInfo();

	private currentDate = new Date();
	private canceledDate;

	constructor(
		private sessionService: SessionService,
		private socketService: SocketService,
		private dataService: DataService,
		private router?: Router) {
		this.currentDate.setHours(1);
		this.currentDate.toISOString().split('T')[0];

		if (!this.socketService.open) {
			this.dataService.getOnOpen$.subscribe(data => {
				this.fetchProfile();
			});
		} else {
			this.fetchProfile();
		}

		this.dataService.getProfile$.subscribe(data => {
			for (const date in data['bookings']) {
				data['bookings'][date]['passedDate'] = new Date(date) >= this.currentDate ? true : false;
				this.bookings.push(data['bookings'][date]);
			}
		});

		this.dataService.getCancel$.subscribe(data => {
			for (let i = 0; i < this.bookings.length; i++) {
				if (this.bookings[i].date === this.canceledDate) {
					this.bookings.splice(i, 1);
					break;
				}
			}
		});
	}

	onBack() {
		this.router.navigate(['/booking']);
	}

	onLogout() {
		this.sessionService.unsetUserInfo();
		this.router.navigate(['/login']);
	}

	onCancel(date, time) {
		this.canceledDate = date;
		this.socketService.send({
			type: 'cancel',
			id: this.user.id,
			idToken: this.user.idToken,
			uid: this.user.uid,
			date: date,
			time: time
		});
	}

	private fetchProfile() {
		this.socketService.send({
			type: 'user',
			id: this.user.id,
			idToken: this.user.idToken,
			uid: this.user.uid
		});
	}

}
