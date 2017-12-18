import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';

describe('Test: DataService', () => {
  let dataService;
  beforeEach(() => {
    dataService = new DataService();
  });


  it('should get 1', () => {
    dataService.getOnOpen$.subscribe(data => {
    	expect(data).toEqual('1');
    });
    dataService.sendOnOpen('1');
  });

  it('should get 2', () => {
    dataService.getOnMessage$.subscribe(data => {
    	expect(data).toEqual('2');
    });
    dataService.sendOnMessage('2');
  });

  it('should get 3', () => {
    dataService.getOnLoginFail$.subscribe(data => {
    	expect(data).toEqual('3');
    });
    dataService.sendOnLoginFail('3');
  });

  it('should get 4', () => {
    dataService.getBookings$.subscribe(data => {
    	expect(data).toEqual('4');
    });
    dataService.sendBookings('4');
  });

  it('should get 5', () => {
    dataService.getProfile$.subscribe(data => {
    	expect(data).toEqual('5');
    });
    dataService.sendProfile('5');
  });

  it('should get 6', () => {
    dataService.getCancel$.subscribe(data => {
    	expect(data).toEqual('6');
    });
    dataService.sendCancel('6');
  });

  it('should get 7', () => {
    dataService.getSocketDown$.subscribe(data => {
      expect(data).toEqual('7');
    });
    dataService.sendSocketDown('7');
  });

});
