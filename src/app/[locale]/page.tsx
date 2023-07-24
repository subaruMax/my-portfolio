'use client';

import { AboutMeSection, PortfolioSection, SkillsSection } from '@app/sections';
import cn from 'classnames';
import { AnimatedBg } from '@app/components/AnimatedBg';
import { ContactsSection } from '@app/sections/ContactsSection/ContactsSection';

import s from './Page.module.scss';
import { useLoadingContext } from '@app/context';

const Home = () => {
  const { appLoaded } = useLoadingContext();

  return (
    <main className={cn(s.root, { [s.loaded]: appLoaded })}>
      <AnimatedBg />
      <AboutMeSection />
      <SkillsSection />
      <PortfolioSection />
      <ContactsSection />
    </main>
  );
};

export default Home;
