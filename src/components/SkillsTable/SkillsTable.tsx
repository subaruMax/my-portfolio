import React, { useState } from 'react';
import cn from 'classnames';
import { motion } from 'framer-motion';

import { SkillItem, SkillItemProps } from './SkillItem';

import s from './SkillsTable.module.scss';
import { Typewriter } from '../ui-kit';

type SkillsTableProps = {
  title: string;
  items: SkillItemProps[];
  className?: string;
};

const tableAppear = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'tween',
      delayChildren: 0.4,
      staggerChildren: 0.05
    }
  },
  hidden: { opacity: 0, y: 300, transition: { type: 'tween' } }
};

const item = {
  hidden: { x: 80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1
  }
};

const viewport = { amount: 0.1, once: true };

export const SkillsTable: React.FC<SkillsTableProps> = ({
  title,
  items,
  className
}) => {
  const [start, setStart] = useState(false);

  return (
    <motion.div
      className={cn(s.root, className)}
      variants={tableAppear}
      whileInView={'visible'}
      initial="hidden"
      viewport={viewport}
      onViewportEnter={() => setStart(true)}
    >
      {/* <h5 className={s.title}>{title}:</h5> */}
      <Typewriter text={title} start={start} />
      <div className={s.table}>
        {items.map(el => (
          <motion.div key={el.name} variants={item}>
            <SkillItem {...el} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
