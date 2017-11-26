import { TestBed, async, inject } from '@angular/core/testing';
import { destroyPlatform } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { DataService, SessionService } from './_services';

class MockSessionService {

  initUserInfo() {
    return true;
  }
}

describe('Testing AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
      ],
      providers: [
        DataService,
        { provide: SessionService, useClass: MockSessionService }
      ]
    }).compileComponents();
  }));
});


