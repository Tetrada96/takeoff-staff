import { useContext } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { Context } from '../..';
import styles from './Alert.module.scss';

export const Alert = observer(() => {
  const { store } = useContext(Context);

  return (
    <div className={styles.alertWrapper}>
      {store.alert.map((item, index) => (
        <div className={classNames(styles.alert, { [styles.errorAlert]: store.alert })} key={index}>
          {item.message}
        </div>
      ))}
    </div>
  );
});
