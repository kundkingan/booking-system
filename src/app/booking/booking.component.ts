import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { DataService, SocketService, SessionService } from '../_services';
import { Bookings } from './booking.interface';

@Component({
	selector: 'app-booking',
	templateUrl: './booking.component.html',
	styleUrls: ['./booking.component.less'],
	providers: [Bookings]
})
export class BookingComponent {
	
	chosenDate;
	displayedColumns = ['Time', 'Booked', 'By'];
	dataSource = new MatTableDataSource(this.bookings.element_data);
	dayAlreadyBooked = false;

	private userInfo = this.sessionService.getUserInfo();
	
	constructor(
		private sessionService: SessionService,
		private socketService: SocketService,
		private dataService: DataService,
		private bookings: Bookings,
		private router?: Router) 
	{
		this.dataService.getBookings$.subscribe(bookings => {
			if (this.chosenDate === bookings['date']) { 
				this.bookings.insertData(bookings['bookings']);
				this.dayAlreadyBooked = false;
				for (let booking of this.bookings.element_data) {
					if (booking['By'] === this.userInfo.name) {
						this.dayAlreadyBooked = true;
						break;
					}
				}
			}
		});
	}

	onChangeDate(event) {
		event.value.setSeconds(3600);
		this.chosenDate = event.value.toISOString().split('T')[0];
		this.socketService.send({
			id:  this.userInfo.id,
			type: 'date',
			idToken:  this.userInfo.idToken,
			date: this.chosenDate
		});
	}

	onBookTime(selectedTime) {
		if (selectedTime.Booked === 'No' && !this.dayAlreadyBooked) {
			this.socketService.send({
				type: 'book',
				id:  this.userInfo.id,
				idToken: this.userInfo.idToken,
				uid: this.userInfo.uid,
				date: this.chosenDate,
				name: this.userInfo.name,
				time: selectedTime.Time
			});
		}
	}

	onUserProfile() {
		this.router.navigate(['/profile']);
	}

	onLogout() {
		this.sessionService.unsetUserInfo();
		this.router.navigate(['/login']);
	}

}
