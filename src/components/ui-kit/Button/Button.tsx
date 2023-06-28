import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import s from './Button.module.scss';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  active,
  className,
  onClick,
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn(s.root, { [s.active]: active }, className)}
      onClick={onClick}
      type="button"
      {...rest}
    >
      <div className={cn(s.rhombus, s.inner, s.left)} />
      <div className={cn(s.rhombus, s.inner, s.right)} />
      <div className={s.glowLine} />
      <div className={cn(s.rhombus, s.outer, s.left)} />
      <div className={cn(s.rhombus, s.outer, s.right)} />
      <div className={s.content}>{children}</div>
    </button>
  );
};

export default Button;
