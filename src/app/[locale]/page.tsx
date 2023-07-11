import { AboutMeSection, SkillsSection } from '@app/sections';
import { AnimatedBg } from '@app/components/AnimatedBg';

import s from './Page.module.scss';

const Home = () => {
  return (
    <main className={s.root}>
      <AnimatedBg />
      <AboutMeSection />
      <SkillsSection />
    </main>
  );
};

export default Home;
