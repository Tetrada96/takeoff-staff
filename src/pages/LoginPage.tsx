import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { Context } from '..';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';
import { FlexBlock } from '../components/FlexBlock/FlexBlock';
import styles from './styles.module.scss';

export const LoginPage = observer(() => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { store } = useContext(Context);
  const navigate = useNavigate();

  const onLoginHandler = () => {
    store.login(email, password).then((res) => res && navigate('/contacts'));
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onLoginHandler();
    }
  };

  const disabledButton = !email || !password;

  return (
    <FlexBlock className={styles.loginPageWrapper}>
      <FlexBlock className={styles.loginPage}>
        <Input type="text" placeholder="Email" onChange={(e) => setEmail(e.target.value)} value={email} />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          onKeyDown={disabledButton ? undefined : onKeyDown}
        />
        <Button className={styles.button} disabled={disabledButton} onClick={onLoginHandler}>
          Логин
        </Button>
      </FlexBlock>
    </FlexBlock>
  );
});
