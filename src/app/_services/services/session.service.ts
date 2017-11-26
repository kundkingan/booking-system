import { Injectable } from '@angular/core';

interface UserInfo {
  loggedIn: boolean,
  id: Number,
  idToken: string,
  name: string
}

@Injectable()
export class SessionService {

  private userInfo: UserInfo = {
    loggedIn: false, 
    id: null,
    idToken: null, 
    name: null
  }

  public initUserInfo() {
  	if (!localStorage.getItem('userInfo')) {
  		localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      return true;
  	}
    return false;
  }

  public saveUserInfo(userInfo: UserInfo) {
  	localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  public setIdToUserInfo(id) {
    let userInfo = this.getUserInfo();
    userInfo.id = id;
    this.saveUserInfo(userInfo);
  }

  public getUserInfo() {
  	return JSON.parse(localStorage.getItem('userInfo'));
  }

}
