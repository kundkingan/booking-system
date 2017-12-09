import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../_services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent {

  constructor(private sessionService: SessionService, private router: Router) { }

  onLogout() {
  	this.sessionService.unsetUserInfo();
  	this.router.navigate(['/login']);
  }

}
