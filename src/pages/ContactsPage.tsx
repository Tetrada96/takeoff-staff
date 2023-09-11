import { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { getContacts } from '../services/contacts';
import { Context } from '..';
import { FlexBlock } from '../components/FlexBlock/FlexBlock';
import { IContactWithEdit } from '../types/contacts';
import { Table } from '../fragments/Table';
import { FormAddContact } from '../fragments/FormAddContact';
import { FormFindContact } from '../fragments/FormFindContact';

export const getAllContacts = (setContacts: (data: IContactWithEdit[]) => void) => {
    getContacts().then((data) => {
        setContacts(data.data.contacts.map(item => {return {...item, isEdit: false}} ));
      });
}

export const ContactsPage = observer(() => {
  const [contacts, setContacts] = useState<IContactWithEdit[] | undefined>(undefined);
  const { store } = useContext(Context);

  const showAllContacts = () => {
    getContacts().then((data) => {
      setContacts(data.data.contacts.map(item => {return {...item, isEdit: false}} ));
    });
  };

  useEffect(() => {
    if (!store.user.id) {
      return;
    }
    showAllContacts();
  }, [store.user.id]);

  return (
    <FlexBlock
      style={{
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        gap: '20px',
        paddingTop: '20px',
      }}
    >
        <div>Список контактов</div>
        <FormAddContact onChange={setContacts} />
        <FormFindContact onChange={setContacts}/>
        <Table canDelete={store.user.isAdmin} contacts={contacts} onChange={setContacts}  />
    </FlexBlock>
  );
});