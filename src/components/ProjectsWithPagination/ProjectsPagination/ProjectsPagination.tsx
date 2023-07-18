import React from 'react';
import cn from 'classnames';

import s from './ProjectsPagination.module.scss';

type ProjectsPaginationProps = {
  pageNumber: number;
  projectsLength: number;
  perPage: number;
  setPage: (page: number) => void;
};

export const ProjectsPagination: React.FC<ProjectsPaginationProps> = ({
  pageNumber,
  projectsLength,
  perPage,
  setPage
}) => {
  const numOfPages = Math.ceil(projectsLength / perPage);

  return (
    <div className={s.root}>
      {new Array(numOfPages).fill(null).map((el, i) => (
        <div
          key={i}
          className={cn(s.bullet, { [s.active]: i === pageNumber })}
          onClick={() => setPage(i)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};
