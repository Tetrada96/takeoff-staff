import React from 'react';
import classNames from 'classnames';

import styles from './Input.module.scss';

interface IInputProps {
  value: string;
  type?: string;
  placeholder?: string;
  className?: string;
  style?: React.CSSProperties;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, id?: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Input = ({ value, type = 'text', placeholder, className, style, onChange, onKeyDown }: IInputProps) => {
  return (
    <input
      min={type === 'number' ? 0 : undefined}
      type={type}
      placeholder={placeholder}
      className={classNames(styles.input, className)}
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      style={style}
    />
  );
};
