interface Element {
  Time: string;
  Booked: string;
  By: string;
}



export class Bookings {
	element_data: Element[] = [
	  {Time: '07:00 - 11:00', Booked: 'No' , By: null},
	  {Time: '11:00 - 15:00', Booked: 'No' , By: null},
	  {Time: '15:00 - 19:00', Booked: 'No' , By: null},
	  {Time: '19:00 - 23:00', Booked: 'No' , By: null},
	];

	insertData(bookings) {
		console.log(bookings);
		for (let element of this.element_data) {
			element.By = null;
			element.Booked = 'No';
			for (let booked of bookings) {
				if (booked[element.Time]) {
					element.Booked = 'Yes';
					element.By = booked[element.Time]['by'];
				}
			}
		}
	}
}