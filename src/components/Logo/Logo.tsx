import React from 'react';
import cn from 'classnames';
import Image from 'next/image';
import logoDark from 'public/media/logo-dark.svg?url';
import logoLight from 'public/media/logo-light.svg?url';

import s from './Logo.module.scss';
import useThemeContext from '@app/context/themeContext';
import { SupportedThemes } from '@app/types/general';

type LogoProps = {
  className?: string;
};

const Logo: React.FC<LogoProps> = ({ className }) => {
  const { theme } = useThemeContext();

  let logoImage = logoDark;

  if (theme === SupportedThemes.light) {
    logoImage = logoLight;
  }

  return (
    <div className={cn(s.root, className)}>
      <Image src={logoImage} width={85} height={76} alt="Logo Maksym Khaiuk" />
    </div>
  );
};

export default Logo;
