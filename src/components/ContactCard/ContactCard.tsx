import React, { useState } from 'react';

import { Icon, Typewriter } from '@ui-kit';

import s from './ContactCard.module.scss';

type ContactCardProps = {
  title: string;
  image: string;
  href: string;
};

export const ContactCard: React.FC<ContactCardProps> = ({
  title,
  image,
  href
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className={s.root}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={href} target="_blank" rel="noreferrer" className={s.mainCircle}>
        <div className={s.inner}>
          <div className={s.box} />
          <Icon name={image} className={s.icon} />
        </div>
      </a>
      {isHovered && <Typewriter text={title} className={s.title} />}
    </div>
  );
};
