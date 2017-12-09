import { Injectable } from '@angular/core';

interface UserInfo {
  loggedIn: boolean;
  id: Number;
  idToken: string;
  uid: string;
  name: string;
}

@Injectable()
export class SessionService {

  private userInfo: UserInfo = {
    loggedIn: false,
    id: null,
    idToken: null,
    uid: null,
    name: null
  };

  initUserInfo() {
  	if (!localStorage.getItem('userInfo')) {
  		localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
      return true;
    }
    return false;
  }

  saveUserInfo(userInfo: UserInfo) {
  	localStorage.setItem('userInfo', JSON.stringify(userInfo));
  }

  setIdToUserInfo(id) {
    const userInfo = this.getUserInfo();
    this.userInfo.id = userInfo.id = id;
    this.saveUserInfo(userInfo);
  }

  getUserInfo() {
  	return JSON.parse(localStorage.getItem('userInfo'));
  }

  unsetUserInfo() {
    localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
  }

}
