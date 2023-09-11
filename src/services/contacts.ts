import { AxiosResponse } from 'axios';

import $api from '.';
import { IAddContact, IContactsGetResponse } from '../types/contacts';

export const getContacts = (): Promise<AxiosResponse<IContactsGetResponse>> => {
  return $api.get<IContactsGetResponse>(`/contacts/`);
};

export const postAddContact = (contact: IAddContact): Promise<AxiosResponse<IContactsGetResponse>> => {
    return $api.post<IContactsGetResponse>(`/contacts/`, contact);
};

export const deleteContact = (id: string): Promise<AxiosResponse<IContactsGetResponse>> => {
    return $api.delete<IContactsGetResponse>(`/contacts/${id}`);
};

export const editContact = (id: string, data: IAddContact): Promise<AxiosResponse<IContactsGetResponse>> => {
    return $api.put<IContactsGetResponse>(`/contacts/${id}`, data);
};

export const findContacts = (data: IAddContact): Promise<AxiosResponse<IContactsGetResponse>> => {
    return $api.post<IContactsGetResponse>(`/contacts/search`, data);
};
