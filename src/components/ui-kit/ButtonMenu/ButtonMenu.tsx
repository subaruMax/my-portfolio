import React from 'react';
import cn from 'classnames';

import s from './ButtonMenu.module.scss';

export interface ButtonProps {
  active?: boolean;
  className?: string;
  onClick?: () => void;
}

const ButtonMenu = ({ active, className, onClick }: ButtonProps) => {
  return (
    <button
      className={cn(s.root, { [s.active]: active }, className)}
      onClick={onClick}
      type="button"
    >
      <div></div>
      <div className={cn(s.rhombus, s.top)} />
      <div className={cn(s.rhombus, s.right)} />
      <div className={cn(s.rhombus, s.bottom)} />
      <div className={cn(s.rhombus, s.left)} />
      <div className={s.outer} />
      <div className={s.inner} />
    </button>
  );
};

export default ButtonMenu;
