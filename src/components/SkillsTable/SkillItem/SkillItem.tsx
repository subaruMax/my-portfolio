import React from 'react';
import Image from 'next/image';
import cn from 'classnames';

import s from './SkillItem.module.scss';

export type SkillItemProps = {
  name: string;
  image: string;
  url: string;
  className?: string;
};

export const SkillItem: React.FC<SkillItemProps> = ({
  name,
  image,
  url,
  className
}) => {
  return (
    <a
      className={cn(s.root, className)}
      href={url}
      target="_blank"
      rel="noreferrer"
    >
      <Image
        src={image}
        width={78}
        height={78}
        alt={name}
        className={s.image}
      />
      <div className={s.text} data-text={name}>
        {name}
      </div>
    </a>
  );
};
