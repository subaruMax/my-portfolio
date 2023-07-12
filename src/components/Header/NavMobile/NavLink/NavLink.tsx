import React, { ReactNode } from 'react';
import cn from 'classnames';

import useNavContext from '@app/context/navContext';

import s from './NavLink.module.scss';

type NavLinkProps = {
  children: ReactNode;
  id: string;
  className?: string;
  onClick: () => void;
};

export const NavLink: React.FC<NavLinkProps> = ({
  children,
  id,
  className,
  onClick
}) => {
  const { currentSection, scrollToSection } = useNavContext();
  const handleClick = () => {
    onClick();
    scrollToSection(id);
  };

  return (
    <button
      className={cn(
        s.root,
        { [s.active]: currentSection.includes(id) },
        className
      )}
      onClick={handleClick}
    >
      {children}
      <div className={s.rhombus} />
    </button>
  );
};
