'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { NAVIGATION } from '@app/constants/navigation';
import { useChangeSection } from '@app/hooks';
import { ProjectsWithPagination } from '@app/components/ProjectsWithPagination';

import s from './PortfolioSection.module.scss';

export const PortfolioSection = () => {
  const t = useTranslations('Portfolio');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['-0.8', '0.6']
  });

  const titleX = useTransform(scrollYProgress, [0, 0.4], ['30%', '0%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  useChangeSection(ref, NAVIGATION[2].id, 0.3);

  return (
    <section className={s.root} ref={ref} id={NAVIGATION[2].id}>
      <motion.h3
        className={s.title}
        style={{ x: titleX, opacity: titleOpacity }}
      >
        {t('title')}
      </motion.h3>
      <ProjectsWithPagination />
    </section>
  );
};
