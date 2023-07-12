'use client';

import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';

import { SkillsTable } from '@app/components/SkillsTable';
import {
  FRAMEWORKS,
  PROGRAMMING_LANGUAGES,
  TECHNOLOGIES_LIBRARIES
} from '@app/constants/skills';

import useNavContext from '@app/context/navContext';

import s from './SkillsSection.module.scss';
import { NAVIGATION } from '@app/constants/navigation';

export const SkillsSection = () => {
  const ref = useRef(null);
  const t = useTranslations('Skills');
  const { setCurrentSection } = useNavContext();
  const isInView = useInView(ref, { amount: 0.2 });

  useEffect(() => {
    if (isInView) {
      setCurrentSection(NAVIGATION[1].id);
    }
  }, [isInView, setCurrentSection]);

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
  const titleX = useTransform(scrollYProgress, [0, 0.4], ['-30%', '0%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section className={s.root} ref={ref} id={NAVIGATION[1].id}>
      <motion.h1
        className={s.title}
        style={{ x: titleX, opacity: titleOpacity }}
      >
        / {t('title')} /
      </motion.h1>
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
