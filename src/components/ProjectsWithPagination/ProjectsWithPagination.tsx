'use client';

import React, { useMemo, useState } from 'react';
import cn from 'classnames';

import { ProjectCard } from '@app/components/ProjectCard';
import { PROJECTS } from './projects';

import s from './ProjectsWithPagination.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

const PROJECTS_PER_PAGE = 6;

const rootAnimation = {
  visible: {
    opacity: 1,
    x: '0%',
    transition: {
      type: 'tween',
      duration: 0.3,
      delay: 0.3
    }
  },
  hidden: {
    opacity: 0,
    x: '-30%'
  }
};

const rootViewport = { amount: 0.1, once: true };

export const ProjectsWithPagination = () => {
  const [page, setPage] = useState(0);

  const numOfPages = Math.ceil(PROJECTS.length / PROJECTS_PER_PAGE);
  const offset = useMemo(() => page * PROJECTS_PER_PAGE, [page]);

  return (
    <motion.div
      className={s.root}
      whileInView={'visible'}
      initial="hidden"
      variants={rootAnimation}
      viewport={rootViewport}
    >
      <div className={s.pagination}>
        {new Array(numOfPages).fill(null).map((el, i) => (
          <div
            key={i}
            className={cn(s.bullet, { [s.active]: i === page })}
            onClick={() => setPage(i)}
          >
            {i + 1}
          </div>
        ))}
      </div>
      <div className={s.projects}>
        <AnimatePresence mode="popLayout" initial={false}>
          {PROJECTS.slice(offset, offset + PROJECTS_PER_PAGE).map(
            (project, i) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: -25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 80 }}
                transition={{ type: 'tween', duration: 0.3, delay: i * 0.15 }}
              >
                <ProjectCard {...project} onClick={() => {}} />
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};
