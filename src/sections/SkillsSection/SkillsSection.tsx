'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

import React, { useRef } from 'react';

import s from './SkillsSection.module.scss';

export const SkillsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['end end', 'start start']
  });

  const textX = useTransform(
    scrollYProgress,
    [0, 0.5, 0.8, 1],
    ['-100%', '0%', '0%', '100%']
  );

  return (
    <motion.section className={s.root}>
      <div className={s.wrapper} ref={ref} />
      <motion.div style={{ x: textX }}>
        <h1 className={s.title}>SKILLS</h1>
      </motion.div>
      <div className={s.divider} />
    </motion.section>
  );
};
