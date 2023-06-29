import React from 'react';
import cn from 'classnames';

import icons from 'public/icons';

import s from './Icon.module.scss';

export type IconName = keyof typeof icons;

export interface IconProps extends React.HTMLAttributes<SVGElement> {
  className?: string;
  name: IconName;
  onClick?: () => void;
}

const Icon = ({ className, name, onClick, ...rest }: IconProps) => {
  const SVG: React.ComponentClass<any> = icons[name];

  return <SVG className={cn(s.root, className)} onClick={onClick} {...rest} />;
};

export default Icon;
