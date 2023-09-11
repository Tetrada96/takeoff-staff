import { useContext, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { observer } from 'mobx-react-lite';

import { LoginPage } from './pages/LoginPage';
import { ContactsPage } from './pages/ContactsPage';
import { Context } from '.';
import { Alert } from './components/Alert/Alert';
import './index.scss';
import { FlexBlock } from './components/FlexBlock/FlexBlock';
import { getUser } from './services/users';

function App() {
  const navigate = useNavigate();

  const { store } = useContext(Context);

  useEffect(() => {
    if (store.user.id) {
      getUser(store.user.id).then((res) => {
        store.setUser(res.data)
      }).catch(() => {
        navigate('/');
      });
    }
    else {
      navigate('/');
    }
  }, []);

  console.log(store)

  return (
    <div className="App">
      <Alert />
      <FlexBlock className="WrapperContent">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
        </Routes>
      </FlexBlock>
    </div>
  );
}

export default observer(App);