import { TestBed, inject } from '@angular/core/testing';

import { SessionService } from './session.service';

class MockSessionService {
  initUserInfo() {
    return true;
  }
}

describe('Test: SessionService', () => {
	let mockSessionService;
  beforeEach(() => {
  	mockSessionService = new MockSessionService();
    // TestBed.configureTestingModule({
    //   providers: [{provide: SessionService, useValue: SessionServiceStub }]
    // });
  });


  it('should get true', () => {
    expect(mockSessionService.initUserInfo()).toEqual(true);
  });
});
