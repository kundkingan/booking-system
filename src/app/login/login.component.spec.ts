import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';
import { SessionService, SocketService, DataService } from '../_services';

describe('LoginComponent', () => {
  let sessionService, socketService, dataService, router;
  let loginComponent;

  beforeEach(() => {
  	sessionService = new SessionService();
  	dataService = new DataService();
  	socketService = new SocketService(dataService);
    loginComponent = new LoginComponent(sessionService, socketService, dataService);
  });

  it('getOnLoginFail should set errorMsg', () => {
  	dataService.sendOnLoginFail('123');
  	expect(loginComponent.errorMsg).toEqual('123');
	});

  it('getOnLoginFail should set spinner to false', () => {
  	dataService.sendOnLoginFail('123');
  	expect(loginComponent.spinner).toBe(false);
	});

	it('ngOnInit should not navigate user', () => {
		loginComponent.ngOnInit();
	});

  it('getErrorMessage should return You must enter a value', () => {
  	expect(loginComponent.getErrorMessage()).toEqual('You must enter a value');
	});

	it('bothInputValid should return true', () => {
		loginComponent.email = '123@123.123'
		loginComponent.password = '123456';
		expect(loginComponent.bothInputValid()).toBe(true);
	});

	it('signIn should set spinner to true', () => {
		loginComponent.signIn();
		expect(loginComponent.spinner).toBe(true);
	});



});
