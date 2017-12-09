import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class DataService {

  private getCurrentUsersSource = new Subject<Number>();
  private getOnOpenSource = new Subject<string>();
  private getOnMessageSource = new Subject<string>();
  private getOnLoginFailSource = new Subject<string>();
  private getBookingsSource = new Subject<string>();
  private getProfileSource = new Subject<object>();

  getCurrentUsers$ = this.getCurrentUsersSource.asObservable();
  getOnOpen$ = this.getOnOpenSource.asObservable();
  getOnMessage$ = this.getOnMessageSource.asObservable();
  getOnLoginFail$ = this.getOnLoginFailSource.asObservable();
  getBookings$ = this.getBookingsSource.asObservable();
  getProfile$ = this.getProfileSource.asObservable();

  sendOnOpen(data) {
    this.getOnOpenSource.next(data);
  }

	sendOnMessage(data) {
		this.getOnMessageSource.next(data);
	}

  sendOnLoginFail(data) {
    this.getOnLoginFailSource.next(data);
  }

  sendBookings(data) {
    this.getBookingsSource.next(data);
  }

  sendProfile(data) {
    this.getProfileSource.next(data);
  }

}
