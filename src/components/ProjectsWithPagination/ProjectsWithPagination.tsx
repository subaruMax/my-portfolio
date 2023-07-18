import { motion } from 'framer-motion';
import React, { useState } from 'react';

import { PROJECTS } from './projects';
import { ProjectsOverlay } from './ProjectsOverlay/ProjectsOverlay';
import { ProjectsPagination } from './ProjectsPagination';
import { ProjectsGrid } from './ProjectsGrid';

import s from './ProjectsWithPagination.module.scss';

const PROJECTS_PER_PAGE = 6;

const animation = {
  visible: {
    x: '0%',
    opacity: 1,
    transition: {
      type: 'tween'
    }
  },
  hidden: {
    x: '-30%',
    opacity: 0,
    transition: {
      type: 'tween'
    }
  }
};

const viewport = {
  amount: 0.1,
  once: false
};

export const ProjectsWithPagination = () => {
  const [page, setPage] = useState(0);
  const [selectedCardId, setSelectedCardId] = useState('');

  return (
    <motion.div
      className={s.root}
      variants={animation}
      whileInView="visible"
      initial="hidden"
      viewport={viewport}
      layout
    >
      <ProjectsOverlay
        isActive={Boolean(selectedCardId)}
        onClose={() => setSelectedCardId('')}
      />
      <ProjectsPagination
        pageNumber={page}
        projectsLength={PROJECTS.length}
        perPage={PROJECTS_PER_PAGE}
        setPage={setPage}
      />
      <ProjectsGrid
        selectedCardId={selectedCardId}
        pageNumber={page}
        perPage={PROJECTS_PER_PAGE}
        projects={PROJECTS}
        onCardSelect={setSelectedCardId}
      />
    </motion.div>
  );
};
