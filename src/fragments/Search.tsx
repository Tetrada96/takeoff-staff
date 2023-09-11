import React from 'react';

import { Button } from '../components/Button/Button';
import { FlexBlock } from '../components/FlexBlock/FlexBlock';
import { Input } from '../components/Input/Input';
import styles from './styles.module.scss';

export const Search = ({
  searchState,
  onCheckColors,
  setSearchState,
}: {
  setSearchState: React.Dispatch<React.SetStateAction<string>>;
  searchState: string;
  onCheckColors: () => void;
}) => {
  const onCheckHandler = () => {
    onCheckColors();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onCheckColors();
    }
  };

  return (
    <FlexBlock className={styles.searchWrapper}>
      <Input value={searchState} onKeyDown={onKeyDown} onChange={(e) => setSearchState(e.target.value)} />
      <Button disabled={!searchState} onClick={onCheckHandler}>
        Проверить
      </Button>
    </FlexBlock>
  );
};
