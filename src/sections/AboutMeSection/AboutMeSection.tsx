'use client';

import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';

import useThemeContext from '@app/context/themeContext';
import { Typewriter } from '@app/components/ui-kit';
import { NAVIGATION } from '@app/constants/navigation';
import { useChangeSection } from '@app/hooks';

import s from './AboutMeSection.module.scss';
import { useLoadingContext } from '@app/context';

export const AboutMeSection = () => {
  const { theme } = useThemeContext();
  const t = useTranslations('AboutMe');
  const ref = useRef(null);
  const { appLoaded } = useLoadingContext();

  useChangeSection(ref, NAVIGATION[0].id);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0', '0.9']
  });
  const [typing, setTyping] = useState({
    title: true,
    p1: false,
    p2: false,
    p3: false
  });

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  const textX = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);

  const planetX = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);

  const screenY = useTransform(scrollYProgress, [0, 1], ['0%', '80%']);

  const handleStartTyping = (key: keyof typeof typing) => {
    setTyping(prev => ({ ...prev, [key]: true }));
  };

  return (
    <section className={s.root} ref={ref} id={NAVIGATION[0].id}>
      <motion.div className={s.planet} style={{ x: planetX, opacity }}>
        <Image
          src={`/media/globe-${theme}.svg`}
          width={800}
          height={800}
          priority
          alt="planet"
          className={s.planetImage}
        />
      </motion.div>
      <motion.div className={s.text} style={{ x: textX, opacity }}>
        <Typewriter
          interval={60}
          className={s.title}
          text={t('title')}
          start={appLoaded}
          onComplete={() => handleStartTyping('p1')}
        />
        <div className={s.description}>
          <Typewriter
            interval={15}
            text={t('p1')}
            start={typing.p1}
            onComplete={() => handleStartTyping('p2')}
          />
          <Typewriter
            interval={15}
            text={t('p2')}
            start={typing.p2}
            onComplete={() => handleStartTyping('p3')}
          />
          <Typewriter interval={15} start={typing.p3} text={t('p3')} />
        </div>
      </motion.div>
      <motion.div style={{ y: screenY }} className={s.gradient} />
    </section>
  );
};
