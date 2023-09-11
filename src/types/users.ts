export interface IUser {
  login: string;
  id: string;
  isAdmin: boolean;

}

export interface IAuthResponse {
  user: IUser;
}
