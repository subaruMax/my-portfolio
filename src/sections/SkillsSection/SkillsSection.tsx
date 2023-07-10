'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

import React, { useRef } from 'react';

import s from './SkillsSection.module.scss';
import { SkillsTable } from '@app/components/SkillsTable';
import {
  FRAMEWORKS,
  PROGRAMMING_LANGUAGES,
  TECHNOLOGIES_LIBRARIES
} from '@app/constants/skills';
import { useTranslations } from 'next-intl';

const sectionAppear = {
  visible: { opacity: 1, y: 0, transition: { type: 'tween' } },
  hidden: { opacity: 0, y: 300, transition: { type: 'tween' } }
};

const viewport = { amount: 0.15, once: true };

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
  const titleX = useTransform(scrollYProgress, [0, 0.3], ['-100%', '0%']);

  return (
    <section className={s.root} ref={ref}>
      <motion.h1 className={s.title} style={{ x: titleX }}>
        / {t('title')} /
      </motion.h1>
      <div className={s.divider} />
      {SUB_SECTIONS.map(({ title, items }) => (
        <motion.div
          className={s.subSection}
          variants={sectionAppear}
          whileInView={'visible'}
          initial="hidden"
          viewport={viewport}
          key={title}
        >
          <SkillsTable title={title} items={items} />
        </motion.div>
      ))}
    </section>
  );
};
