import { AxiosResponse } from 'axios';

import $api from '.';
import { IAuthResponse, IUser } from '../types/users';

export const login = (login: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
  return $api.post<IAuthResponse>(`/login/`, { login, password });
};


export const logout = (): Promise<void> => {
  return $api.post('/logout');
};

export const getUser = (id: string): Promise<AxiosResponse<IUser>> => {
  return $api.get<IUser>(`/users/${id}`);
};
