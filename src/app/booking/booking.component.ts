import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material';
import { DataService, SocketService, SessionService } from '../_services'
import { Bookings } from './booking.interface';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.less'],
  providers: [Bookings]
})
export class BookingComponent {

  public currentUsers: Number = 0;
	public chosenDate;
	public displayedColumns = ['Time', 'Booked', 'By'];
  public dataSource = new MatTableDataSource(this.bookings.element_data);

	constructor(
		private dataService: DataService, 
		private socketService: SocketService, 
		private sessionService: SessionService,
		private bookings: Bookings,
		private router: Router) 
	{
		this.currentUsers = this.dataService.currentUsers;
		this.dataService.getCurrentUsers$.subscribe(clients => {
			this.currentUsers = clients;
		});

		this.dataService.getBookings$.subscribe(bookings => {
			if (this.chosenDate === bookings['date']) this.bookings.insertData(bookings['bookings']);
		});
	}

	onChangeDate(event) {
		event.value.setSeconds(3600);
		this.chosenDate = event.value.toISOString().split('T')[0];
		this.socketService.send({
			id: this.sessionService.getUserInfo().id,
			type: 'date', 
			idToken: this.sessionService.getUserInfo().idToken, 
			date: this.chosenDate
		});
	}

	onBookTime(selectedTime) {
		if (selectedTime.Booked === 'No') {
			let userInfo = this.sessionService.getUserInfo();
			this.socketService.send({
				type: 'book', 
				idToken: userInfo.idToken,
				date: this.chosenDate,
				name: userInfo.name, 
				time: selectedTime.Time
			});
		} 
	}

	onUserProfile() {
		this.router.navigate(['/profile']);
	}

}
