import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  public initUserInfo() {
  	if (!localStorage.getItem('userInfo')) {
  		localStorage.setItem('userInfo', 
        JSON.stringify(
        {
          loggedIn: false, 
          idToken: null, 
          name: null
        })
      );
      return true;
  	}
    return false;
  }

  public saveUserInfo(userInfo) {
  	localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  public getUserInfo() {
  	return JSON.parse(localStorage.getItem('userInfo'));
  }

}
