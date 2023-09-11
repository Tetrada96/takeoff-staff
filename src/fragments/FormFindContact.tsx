import { useReducer } from 'react';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { FlexBlock } from '../components/FlexBlock/FlexBlock';
import { IContactWithEdit } from '../types/contacts';
import { findContacts } from '../services/contacts';
import { ActionKind, initialState, reducer } from './FormAddContact';
import { getAllContacts } from '../pages/ContactsPage';


export const FormFindContact = ({onChange}: {onChange: (data: IContactWithEdit[]) => void }) => {
    const [state, dispatch] = useReducer(reducer, initialState);
    
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ActionKind.changeName, payload: event.target.value });
      };
    
      const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ActionKind.changeEmail, payload: event.target.value });
      };
    
      const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch({ type: ActionKind.changePhone, payload: event.target.value });
      };

      const findContact = () => {
        findContacts(state).then(res => {
            onChange(res.data.contacts);
            dispatch({ type: ActionKind.reset, payload: '' });
        }).catch(e => console.error(e));
      }

      const resetFilter = () => {
        getAllContacts(onChange)
      }


    return (
        <FlexBlock style={{gap: '10px', alignItems: 'center'}}>
            <Input placeholder='Введите имя' value={state.name} onChange={handleNameChange} />
            <Input placeholder='Введите номер телефона' value={state.phone} onChange={handlePhoneChange} />
            <Input placeholder='Введите email' value={state.email} onChange={handleEmailChange} />
            <Button onClick={findContact}>Найти пользователя</Button>
            <Button onClick={resetFilter}>Сбросить фильтрацию</Button>
        </FlexBlock>
    )
}