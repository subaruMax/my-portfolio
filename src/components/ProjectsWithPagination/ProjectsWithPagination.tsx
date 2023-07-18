import React, { useState } from 'react';

import { PROJECTS } from './projects';
import { ProjectsOverlay } from './ProjectsOverlay/ProjectsOverlay';
import { ProjectsPagination } from './ProjectsPagination';
import { ProjectsGrid } from './ProjectsGrid';

import s from './ProjectsWithPagination.module.scss';

const PROJECTS_PER_PAGE = 6;

export const ProjectsWithPagination = () => {
  const [page, setPage] = useState(0);
  const [selectedCardId, setSelectedCardId] = useState('');

  return (
    <div className={s.root}>
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
    </div>
  );
};