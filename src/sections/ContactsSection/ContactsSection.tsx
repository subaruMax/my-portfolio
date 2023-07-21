'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { NAVIGATION } from '@app/constants/navigation';
import { useChangeSection } from '@app/hooks';

import s from './ContactsSection.module.scss';
import { VideoBackground } from '@app/components/VideoBackground';

export const ContactsSection = () => {
  const t = useTranslations('Contacts');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['-0.5', '0.5']
  });

  useChangeSection(ref, NAVIGATION[3].id);

  const titleX = useTransform(scrollYProgress, [0, 0.4], ['-30%', '0%']);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [0, 1]);

  return (
    <section className={s.root} ref={ref} id={NAVIGATION[3].id}>
      <VideoBackground
        src="/media/video/contacts.mp4"
        videoClassName={s.video}
        opacity={0.6}
        ref={ref}
      />
      <motion.h3
        className={s.title}
        style={{ x: titleX, opacity: titleOpacity }}
      >
        {t('title')}
      </motion.h3>
    </section>
  );
};
