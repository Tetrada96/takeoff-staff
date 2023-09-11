import { makeAutoObservable, observable } from 'mobx';
import { AxiosError, isAxiosError } from 'axios';

import { IUser } from '../types/users';
import * as UserService from '../services/users';
import { ErrorData } from '../services';


export default class Store {
  user = {} as IUser;
  isAuth = false;
  alert: { error: boolean; message: string | undefined }[] = [];
  isOpenMenu = false;

  constructor() {
    makeAutoObservable(this , {
      user: observable,
      isAuth: observable,
      alert: observable,
      isOpenMenu: observable
    });
  }

  setAuth(bool: boolean) {
    this.isAuth = bool;
  }

  setUser(user: IUser) {
    this.user = user;
  }

  async login(email: string, password: string) {
    try {
      const response = await UserService.login(email, password);
      this.setAuth(true);
      console.log(response)
      this.setUser(response.data.user);
      return true;
    } catch (e) {
      if (isAxiosError<AxiosError<ErrorData>>(e)) {
        this.setAlert(true, e.response?.data.message);
        return false;
      }
    }
  }
  
  async logout() {
    try {
      const response = await UserService.logout();
      console.log(response);
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser);
    } catch (e) {
      console.error(e);
    }
  }

  setAlert(isError: boolean, message: string | undefined) {
    this.alert.push({ error: isError, message });
    setTimeout(() => this.alert.shift(), 3000);
  }

}