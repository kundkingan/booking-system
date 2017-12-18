import { TestBed, inject } from '@angular/core/testing';

import { SessionService } from './session.service';

describe('Test: SessionService', () => {
  let sessionService;
  beforeEach(() => {
    sessionService = new SessionService();
    localStorage.clear();
  });

  it('should get true', () => {
    expect(sessionService.initUserInfo()).toEqual(true);
  });

  it('should get false', () => {
    sessionService.saveUserInfo({
      loggedIn: true,
      id: 123,
      idToken: '123',
      uid: '123',
      name: '123'
    });
    expect(sessionService.initUserInfo()).toEqual(false);
  });

  it('should get true', () => {
    const id = 0;

    sessionService.saveUserInfo({
      loggedIn: true,
      id: 123,
      idToken: '123',
      uid: '123',
      name: '123'
    });

    sessionService.setIdToUserInfo(id);

    const user = sessionService.getUserInfo();

    expect(user.id).toBe(id);
  });

  it('should get no user', () => {
    const obj = {
      loggedIn: false,
      id: null,
      idToken: null,
      uid: null,
      name: null
    };

    sessionService.saveUserInfo({
      loggedIn: true,
      id: 123,
      idToken: '123',
      uid: '123',
      name: '123'
    });

    sessionService.unsetUserInfo();

    expect(sessionService.getUserInfo()).toEqual(obj);
  });

});
