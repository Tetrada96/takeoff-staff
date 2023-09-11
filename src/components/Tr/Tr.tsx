import cn from 'classnames';

import styles from './Tr.module.scss';

export const Tr = ({ children, isHead }: { children: JSX.Element[]; isHead?: boolean }) => {
  return <tr className={cn(styles.Tr, {[styles.TrHead]: isHead })}>{children}</tr>;
};
