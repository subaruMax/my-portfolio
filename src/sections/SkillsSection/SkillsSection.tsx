'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

import React, { useRef } from 'react';

import s from './SkillsSection.module.scss';

export const SkillsSection = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['-0.9', '0.6']
  });

  const textX = useTransform(
    scrollYProgress,
    [0, 0.3, 0.6, 1],
    ['-60%', '0%', '0%', '60%']
  );

  return (
    <section className={s.root} ref={ref}>
      <motion.div style={{ x: textX }}>
        <h1 className={s.title}>SKILLS</h1>
      </motion.div>
      <div className={s.divider} />
    </section>
  );
};
