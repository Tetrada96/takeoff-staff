import classNames from 'classnames';

import styles from './Button.module.scss';

interface IButtonProps {
  children: string | JSX.Element;
  disabled?: boolean;
  className?: string;
  onClick: () => void;
}

export const Button = ({ children, disabled, className, onClick }: IButtonProps) => {
  return (
    <button className={classNames(styles.button, className)} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};
