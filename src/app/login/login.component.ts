import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';
import { SessionService, SocketService, DataService } from '../_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
	public emailControl = new FormControl('', [Validators.required, Validators.email]);
	public email = '123@123.123';
	public password = '123456';
  public spinner = false;
  public errorMsg = '';

  constructor(
    private sessionService: SessionService, 
    private socketService: SocketService,
    private dataService: DataService, 
    private router: Router) 
  {
    this.dataService.getOnLoginFail$.subscribe(errorMsg => {
      this.errorMsg = errorMsg;
      this.spinner = false;
    });
  }

  ngOnInit() {
    if (this.sessionService.getUserInfo['loggedIn']) this.router.navigate(['']);
  }

	getErrorMessage() {
    return this.emailControl.hasError('required') ? 'You must enter a value' :
           this.emailControl.hasError('email') ? 'Not a valid email' : '';
  }

  bothInputValid() {
  	return this.getErrorMessage() === '' && this.password !== '' ? false : true;
  }

  signIn() {
  	this.socketService.send({
      id: this.sessionService.getUserInfo().id,
      type: 'login', 
      email: this.email, 
      password: this.password
    });
    this.spinner = true;
  }

}
