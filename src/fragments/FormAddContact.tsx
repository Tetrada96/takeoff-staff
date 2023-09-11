import { useReducer } from 'react';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { FlexBlock } from '../components/FlexBlock/FlexBlock';
import { IAddContact, IContactWithEdit } from '../types/contacts';
import { postAddContact } from '../services/contacts';



interface Action {
    type: ActionKind,
    payload: string | IContactWithEdit;
}

export enum ActionKind {
    changeName = 'CHANGE_NAME',
    changePhone = 'CHANGE_PHONE',
    changeEmail = 'CHANGE_EMAIL',
    reset = 'RESET',
    init = 'INIT'
}

export const reducer = (state:IAddContact, action: Action): IAddContact => {
    switch(action.type) {
        case ActionKind.changeName : {
            return {
                ...state, name: action.payload as string
            }
        }
        case ActionKind.changePhone : {
            return {
                ...state, phone: action.payload as string
            }
        }
        case ActionKind.changeEmail : {
            return {
                ...state, email: action.payload as string
            }
        }
        case ActionKind.reset : {
            return initialState
        }
        case ActionKind.init : {
            return action.payload as IAddContact
        }
        default:
      return state;
    }
} 

export const initialState: IAddContact = {
    email: '',
    phone: '',
    name: ''
}


export const FormAddContact = ({onChange}: {onChange: (data: IContactWithEdit[]) => void }) => {
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

      const addContact = () => {
        postAddContact(state).then(res => {
            onChange(res.data.contacts);
            dispatch({ type: ActionKind.reset, payload: '' });
        }).catch(e => console.error(e));
      }


    return (
        <FlexBlock style={{gap: '10px', alignItems: 'center'}}>
            <Input placeholder='Введите имя' value={state.name} onChange={handleNameChange} />
            <Input placeholder='Введите номер телефона' value={state.phone} onChange={handlePhoneChange} />
            <Input placeholder='Введите email' value={state.email} onChange={handleEmailChange} />
            <Button onClick={addContact}>Добавить пользователя</Button>
        </FlexBlock>
    )
}