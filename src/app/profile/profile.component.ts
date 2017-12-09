import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService, SocketService, DataService } from '../_services';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {

	profile;
	bookings = [];
	user = this.sessionService.getUserInfo();

	constructor(
		private sessionService: SessionService, 
		private socketService: SocketService,
		private dataService: DataService,
		private router: Router) 
	{
		this.dataService.getOnOpen$.subscribe(data => {
			this.socketService.send({
				type: 'user',
				id: this.user.id,
				idToken: this.user.idToken,
				uid: this.user.uid
			});
		});

		this.dataService.getProfile$.subscribe(data => {
			this.profile = data;
			for (let booking in data['bookings']) {
				this.bookings.push(data['bookings'][booking])
			}
		});
	}

	ngOnInit() {
		this.socketService.send({
			type: 'user',
			id: this.user.id,
			idToken: this.user.idToken,
			uid: this.user.uid
		});
	}

	onLogout() {
		this.sessionService.unsetUserInfo();
		this.router.navigate(['/login']);
	}

	onCancel(date, time) {
		this.socketService.send({
			type: 'cancel',
			id: this.user.id,
			idToken: this.user.idToken,
			uid: this.user.uid,
			date: date,
			time: time
		});
	}

}
