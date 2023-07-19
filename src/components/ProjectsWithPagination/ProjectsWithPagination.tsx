import React, { useEffect, useState } from 'react';

import { PROJECTS } from '@app/constants/portfolio';
import { ProjectsOverlay } from './ProjectsOverlay/ProjectsOverlay';
import { ProjectsPagination } from './ProjectsPagination';
import { ProjectsGrid } from './ProjectsGrid';
import { LoaderMain } from '@app/components/LoaderMain';

import s from './ProjectsWithPagination.module.scss';

const PROJECTS_PER_PAGE = 6;

export const ProjectsWithPagination = () => {
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState<null | false>(null);
  const [selectedCardId, setSelectedCardId] = useState('');
  const [loadedProjectsMedia, setLoadedProjectsMedia] = useState<string[]>([]);

  useEffect(() => {
    if (PROJECTS.length === loadedProjectsMedia.length) {
      setIsLoading(false);
    }
  }, [loadedProjectsMedia]);

  return (
    <div className={s.root}>
      <ProjectsOverlay
        isActive={Boolean(selectedCardId)}
        onClose={() => setSelectedCardId('')}
      />
      <div style={{ opacity: isLoading ? 0 : 1 }} className={s.content}>
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
          onCardImageLoad={id => setLoadedProjectsMedia(prev => [...prev, id])}
        />
      </div>
      {isLoading && <LoaderMain className={s.loader} />}
    </div>
  );
};
