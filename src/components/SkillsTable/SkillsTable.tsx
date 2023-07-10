import React from 'react';
import cn from 'classnames';

import { SkillItem, SkillItemProps } from './SkillItem';

import s from './SkillsTable.module.scss';

type SkillsTableProps = {
  title: string;
  items: SkillItemProps[];
  className?: string;
};

export const SkillsTable: React.FC<SkillsTableProps> = ({
  title,
  items,
  className
}) => {
  return (
    <div className={cn(s.root, className)}>
      <h5 className={s.title}>{title}:</h5>
      <div className={s.table}>
        {items.map(el => (
          <SkillItem {...el} key={el.name} />
        ))}
      </div>
    </div>
  );
};
