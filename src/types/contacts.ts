export interface IContact {
    name: string;
    email: string;
    id: string;
    phone: string;
}

export interface IContactWithEdit extends IContact {
    isEdit?: boolean;
}
  
export interface IContactsGetResponse {
    contacts: IContact[];
}

export interface IAddContact {
    name: string;
    email: string;
    phone: string;
}

