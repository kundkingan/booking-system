import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';

describe('Test: DataService', () => {
  let dataService;
  beforeEach(() => {
    dataService = new DataService();
  });


  it('should get true', () => {
    dataService.getOnOpen$.subscribe(data => {
    	expect(data).toEqual('1');
    });
    dataService.sendOnOpen('1');
  });

  it('should get true', () => {
    dataService.getOnMessage$.subscribe(data => {
    	expect(data).toEqual('2');
    });
    dataService.sendOnMessage('2');
  });

  it('should get true', () => {
    dataService.getOnLoginFail$.subscribe(data => {
    	expect(data).toEqual('3');
    });
    dataService.sendOnLoginFail('3');
  });

  it('should get true', () => {
    dataService.getBookings$.subscribe(data => {
    	expect(data).toEqual('4');
    });
    dataService.sendBookings('4');
  });

  it('should get true', () => {
    dataService.getProfile$.subscribe(data => {
    	expect(data).toEqual('5');
    });
    dataService.sendProfile('5');
  });

  it('should get true', () => {
    dataService.getCancel$.subscribe(data => {
    	expect(data).toEqual('6');
    });
    dataService.sendCancel('6');
  });

  it('should get true', () => {
    dataService.getSocketDown$.subscribe(data => {
      expect(data).toEqual('7');
    });
    dataService.sendCancel('7');
  });

});
