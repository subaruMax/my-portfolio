'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';

import { NAVIGATION } from '@app/constants/navigation';
import { useChangeSection } from '@app/hooks';
import { VideoBackground } from '@app/components/VideoBackground';
import { CONTACTS } from '@app/constants/contacts';
import { ContactCard } from '@app/components/ContactCard';

import s from './ContactsSection.module.scss';

export const ContactsSection = () => {
  const t = useTranslations('Contacts');
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['-0.8', '0.1']
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

      <motion.div
        className={s.contacts}
        whileInView="visible"
        initial="hidden"
        transition={{ staggerChildren: 0.3, delayChildren: 0.5 }}
      >
        {CONTACTS.map(contact => (
          <motion.div
            key={contact.title}
            transition={{ type: 'tween' }}
            variants={{
              visible: { y: 0, opacity: 1, skewY: 0 },
              hidden: { y: 100, opacity: 0, skewY: 30 }
            }}
          >
            <ContactCard {...contact} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
