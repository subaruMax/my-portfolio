import * as React from 'react';

import { Icon } from '@ui-kit';

import s from './FullContent.module.scss';

type FullContentProps = {
  href: string;
  description: string;
  jobDone: string;
  technologies: string[];
  teamSize: number;
};

export const FullContent: React.FC<FullContentProps> = React.memo(
  ({ description, teamSize, jobDone, technologies, href }) => {
    const SECTIONS = [
      {
        title: 'Project Url:',
        icon: 'planet',
        content: href ? (
          <a className={s.url} href={href} target="_blank" rel="no referrer">
            {href}
          </a>
        ) : (
          'Not Available'
        )
      },
      {
        title: 'Project Description:',
        icon: 'description',
        content: description
      },
      { title: 'Team Size:', icon: 'team', content: teamSize },
      { title: 'Job Description:', icon: 'code', content: jobDone },
      {
        title: 'Core Technologies:',
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
