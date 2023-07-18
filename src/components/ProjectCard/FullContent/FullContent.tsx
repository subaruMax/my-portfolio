import * as React from 'react';
import cn from 'classnames';

import { Icon } from '@ui-kit';

import s from './FullContent.module.scss';

type FullContentProps = {
  description: string;
  href: string;
  technologies: string[];
};

export const FullContent: React.FC<FullContentProps> = React.memo(
  ({ description, technologies, href }) => {
    return (
      <div className={s.root}>
        <div className={s.section}>
          <div className={s.sectionHead}>
            <Icon name="planet" className={s.icon} />
            <div>Project URL:</div>
          </div>
          <a className={s.url} href={href} target="_blank" rel="no referrer">
            {href}
          </a>
        </div>

        <div className={s.section}>
          <div className={s.sectionHead}>
            <Icon name="description" className={s.icon} />
            <div>Project Description:</div>
          </div>
          {description}
        </div>
        <div className={s.section}>
          <div className={s.sectionHead}>
            <Icon name="gear" className={s.icon} />
            <div>Core Technologies:</div>
          </div>
          <div className={s.chips}>
            {technologies.map(el => (
              <div key={el}>{el}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);
