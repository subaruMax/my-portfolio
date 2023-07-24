import * as React from 'react';

import { Icon } from '@ui-kit';

import s from './FullContent.module.scss';
import { useTranslations } from 'next-intl';

type FullContentProps = {
  href: string | null;
  description: string;
  jobDone: string;
  technologies: string[];
};

export const FullContent: React.FC<FullContentProps> = React.memo(
  ({ description, jobDone, technologies, href }) => {
    const t = useTranslations('Portfolio');

    const SECTIONS = [
      {
        title: t('project-url'),
        icon: 'planet',
        content: href ? (
          <a className={s.url} href={href} target="_blank" rel="no referrer">
            {href.replace(/(https:\/\/)(www.)?/, '')}
          </a>
        ) : (
          t('not-available')
        )
      },
      {
        title: t('project-description'),
        icon: 'description',
        content: description
      },
      { title: t('job-description'), icon: 'code', content: jobDone },
      {
        title: t('core-technologies'),
        icon: 'gear',
        content: (
          <div className={s.chips}>
            {technologies.map(el => (
              <div key={el}>{el}</div>
            ))}
          </div>
        )
      }
    ];

    return (
      <div className={s.root}>
        {SECTIONS.map(({ title, icon, content }) => (
          <div className={s.section} key={title}>
            <div className={s.sectionHead}>
              <Icon name={icon} className={s.icon} />
              <div>{title}</div>
            </div>
            {content}
          </div>
        ))}
      </div>
    );
  }
);
