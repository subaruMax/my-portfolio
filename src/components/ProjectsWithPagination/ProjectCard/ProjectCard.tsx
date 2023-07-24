import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';

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
  company: string;
  isOpened: boolean;
  className?: string;
  onClick: (id: string) => void;
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
  technologies,
  isOpened,
  className,
  onClick
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const t = useTranslations('Portfolio');

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
          <motion.div layout className={s.title}>
            <div className={s.projectTitle}>{title}</div>
            <div className={s.companyEmployed}>
              {t('employed-at')} {company}
            </div>
          </motion.div>
          <Image
            src={image}
            width={1200}
            height={700}
            unoptimized
            alt={title}
            className={s.image}
          />

          <div className={s.frontScreen} />

          {isOpened && (
            <FullContent
              href={href}
              description={t(description)}
              technologies={technologies}
              jobDone={t(jobDone)}
            />
          )}
        </div>

        <div className={s.back}>
          <div className={s.glass} />
          <div className={s.backContent}>{t(shortDescription)}</div>
          <div className={s.backScreen} />
        </div>
      </motion.div>
    </div>
  );
};
