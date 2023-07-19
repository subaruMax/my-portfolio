import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { FullContent } from './FullContent/FullContent';
import { useLockBodyScroll } from '@app/hooks';

import s from './ProjectCard.module.scss';

type ProjectCardProps = {
  title: string;
  image: string;
  shortDescription: string;
  href: string | null;
  description: string;
  technologies: string[];
  jobDone: string;
  teamSize: number;
  company: string;
  isOpened: boolean;
  className?: string;
  onClick: (id: string) => void;
  onImageLoad: (id: string) => void;
};

export const openSpring = { type: 'spring', stiffness: 200, damping: 30 };
export const closeSpring = { type: 'spring', stiffness: 300, damping: 35 };

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  company,
  image,
  shortDescription,
  href,
  description,
  jobDone,
  teamSize,
  technologies,
  isOpened,
  className,
  onClick,
  onImageLoad
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useLockBodyScroll(isOpened);

  useEffect(() => {
    if (isOpened) {
      ref.current?.scrollTo(0, 0);
      ref.current?.focus();
    }
  }, [isOpened]);

  return (
    <div className={cn(s.root, className)} onClick={() => onClick(title)}>
      <motion.div
        layout
        className={cn(s.card, { [s.opened]: isOpened })}
        transition={{ type: 'tween', duration: 0.3 }}
      >
        <div className={s.front} ref={ref}>
          <div className={s.glass} />
          <div className={s.title}>
            <div className={s.projectTitle}>{title}</div>
            <div className={s.companyEmployed}>at - {company}</div>
          </div>
          <Image
            src={image}
            width={1200}
            height={700}
            quality={100}
            alt={title}
            onLoadingComplete={() => onImageLoad(title)}
            className={s.image}
          />

          <div className={s.frontScreen} />

          {isOpened && (
            <FullContent
              href={href}
              description={description}
              technologies={technologies}
              jobDone={jobDone}
              teamSize={teamSize}
            />
          )}
        </div>

        <div className={s.back}>
          <div className={s.glass} />
          <div className={s.backContent}>{shortDescription}</div>
          <div className={s.backScreen} />
        </div>
      </motion.div>
    </div>
  );
};
