import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import { ProjectCard } from '@app/components/ProjectCard';
import { PROJECTS } from '@app/components/ProjectsWithPagination/projects';

import s from './ProjectsGrid.module.scss';

type ProjectsGridProps = {
  selectedCardId: string;
  pageNumber: number;
  perPage: number;
  projects: typeof PROJECTS;
  onCardSelect: (cardId: string) => void;
};

export const ProjectsGrid: React.FC<ProjectsGridProps> = ({
  selectedCardId,
  pageNumber,
  perPage,
  onCardSelect
}) => {
  const offset = pageNumber * perPage;

  return (
    <div className={s.root}>
      <AnimatePresence mode="popLayout" initial={false}>
        {PROJECTS.slice(offset, offset + perPage).map((project, i) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: -25 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ type: 'tween', duration: 0.3, delay: i * 0.15 }}
          >
            <ProjectCard
              {...project}
              onClick={onCardSelect}
              isOpened={selectedCardId === project.title}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
