'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import React, { useRef } from 'react';
import { useTranslations } from 'next-intl';

import { SkillsTable } from '@app/components/SkillsTable';
import {
  FRAMEWORKS,
  PROGRAMMING_LANGUAGES,
  TECHNOLOGIES_LIBRARIES
} from '@app/constants/skills';

import s from './SkillsSection.module.scss';

export const SkillsSection = () => {
  const ref = useRef(null);
  const t = useTranslations('Skills');

  const SUB_SECTIONS = [
    {
      title: t('languages'),
      items: PROGRAMMING_LANGUAGES
    },
    {
      title: t('frameworks'),
      items: FRAMEWORKS
    },
    {
      title: t('technologies'),
      items: TECHNOLOGIES_LIBRARIES
    }
  ];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['-0.3', '0.3']
  });
  const titleX = useTransform(scrollYProgress, [0, 0.3], ['-30%', '0%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);
  const dashesHeight = useTransform(
    scrollYProgress,
    [0.2, 0.95],
    ['0%', '100%']
  );

  return (
    <section className={s.root} ref={ref}>
      <motion.h1
        className={s.title}
        style={{ x: titleX, opacity: titleOpacity }}
      >
        / {t('title')} /
      </motion.h1>
      <div className={s.divider} />
      {SUB_SECTIONS.map(({ title, items }) => (
        <SkillsTable
          title={title}
          items={items}
          className={s.subSection}
          key={title}
        />
      ))}
    </section>
  );
};
