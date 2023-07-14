import React from 'react';
import cn from 'classnames';
import Image from 'next/image';

import s from './ProjectCard.module.scss';

type ProjectCardProps = {
  title: string;
  image: string;
  shortDescription: string;
  className?: string;
  onClick: () => void;
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  image,
  shortDescription,
  className,
  onClick
}) => {
  return (
    <div role="button" className={cn(s.root, className)} onClick={onClick}>
      <div className={s.front}>
        <div className={s.glass} />
        <div className={s.title}>{title}</div>
        <Image
          src={image}
          width={300}
          height={200}
          alt={title}
          className={s.image}
        />
        <div className={s.frontScreen} />
      </div>

      <div className={s.back}>
        <div className={s.glass} />
        <div className={s.backContent}>{shortDescription}di</div>
        <div className={s.backScreen} />
      </div>
    </div>
  );
};
