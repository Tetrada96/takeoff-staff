import { Tr } from '../components/Tr/Tr';
import { Td } from '../components/Td/Td';
import styles from './styles.module.scss';
import { FlexBlock } from '../components/FlexBlock/FlexBlock';
import { IContact, IContactWithEdit } from '../types/contacts';
import { IconButton } from '../components/IconButton/IconButton';
import deleteIcon from '../assets/delete.png';
import editIcon from '../assets/edit.png';
import saveIcon from '../assets/save.png';
import { deleteContact, editContact } from '../services/contacts';
import { useReducer } from 'react';
import { ActionKind, initialState, reducer } from './FormAddContact';
import { Input } from '../components/Input/Input';

export const Table = ({
  contacts,
  canDelete,
  onChange,
}: {
  contacts?: IContactWithEdit[];
  canDelete: boolean;
  onChange: React.Dispatch<React.SetStateAction<IContactWithEdit[] | undefined>>
}) => {


  const [state, dispatch] = useReducer(reducer, initialState);
  
  if (!contacts) return null;

  console.log(contacts)

  const onDeleteHandler = (id: string) => {
    deleteContact(id).then(res => onChange(res.data.contacts))
  }

  const onEditHandler = (id: string, data: IContact) => {
    // можно редактировать только одно поле за один раз
    if (contacts.find(item => item.isEdit)) return;
    dispatch({ type: ActionKind.init, payload:data });
    onChange(prev => prev?.map(item => item.id === id ? {...item, isEdit: true} : item));

  }

  const onSaveHandler = (id: string, ) => {
    onChange(prev => prev?.map(item => item.id === id ? {...item, isEdit: false} : item))
    editContact(id, state).then(res => onChange(res.data.contacts));
  }

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionKind.changeName, payload: event.target.value });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionKind.changeEmail, payload: event.target.value });
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: ActionKind.changePhone, payload: event.target.value });
  };

  return (
    <FlexBlock style={{width: '100%', padding: '0 100px'}} showAllHeight>
      <div className={styles.tableWrapper}>
        {contacts.length !== 0 ? (
          <table className={styles.table}>
            <thead className={styles.thead}>
              <Tr isHead>
                <Td>ФИО</Td>
                <Td>Номер телефона</Td>
                <Td>email</Td>
                <Td></Td>
              </Tr>
            </thead>
            <tbody>
              {contacts.map(item => {
                return (
                  <Tr key={item.id}>
                    <Td className={styles.Td}>{item.isEdit ? <Input style={{padding: 0, width: 'auto'}} value={state.name} onChange={handleNameChange} /> : item.name}</Td>
                    <Td className={styles.Td}>{item.isEdit ? <Input style={{padding: 0, width: 'auto'}} value={state.phone} onChange={handlePhoneChange} /> : item.phone}</Td>
                    <Td className={styles.Td}>{item.isEdit ? <Input style={{padding: 0, width: 'auto'}} value={state.email} onChange={handleEmailChange} /> : item.email}</Td>
                    <Td>
                      <>
                        {item.isEdit ?
                        (<IconButton onClick={() => onSaveHandler(item.id)} ><img style={{width: '1rem', height: '1rem'}} src={saveIcon} /></IconButton>) :
                        <IconButton onClick={() => onEditHandler(item.id, item)} ><img style={{width: '1rem', height: '1rem'}} src={editIcon} /></IconButton>
                        }
                        {canDelete ? <IconButton onClick={() => onDeleteHandler(item.id)} ><img style={{width: '1rem', height: '1rem'}} src={deleteIcon} /></IconButton> : null}
                      </>
                    </Td>
                  </Tr>
                );
              })}
            </tbody>
          </table>
        ) : null}
      </div>
    </FlexBlock>
  );
};
