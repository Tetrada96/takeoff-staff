import React from 'react';
import cn from 'classnames';

import styles from './FlexBlock.module.scss';

export const FlexBlock = ({
  style,
  className,
  children,
  showAllHeight,
}: {
  style?: React.CSSProperties;
  className?: string;
  children: JSX.Element[] | JSX.Element | null;
  showAllHeight?: boolean;
}) => {
  return (
    <div className={cn(styles.flexblock, className, { [styles.flexblockAllHeight]: showAllHeight })} style={style}>
      {children}
    </div>
  );
};
