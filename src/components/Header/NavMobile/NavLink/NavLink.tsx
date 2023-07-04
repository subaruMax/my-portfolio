import React, { ReactNode } from 'react';
import cn from 'classnames';

import s from './NavLink.module.scss';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type NavLinkProps = {
  children: ReactNode;
  href: string;
  className?: string;
  onClick: () => void;
};

export const NavLink: React.FC<NavLinkProps> = ({
  children,
  href,
  className,
  onClick
}) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const activePage = searchParams.get('section');

  const handleClick = () => {
    onClick();
    push(href);
  };

  return (
    <button
      className={cn(
        s.root,
        { [s.active]: Boolean(activePage && href.includes(activePage)) },
        className
      )}
      onClick={handleClick}
    >
      {children}
      <div className={s.rhombus} />
    </button>
  );
};
