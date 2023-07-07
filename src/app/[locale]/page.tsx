import { AboutMeSection, SkillsSection } from '@app/sections';
import { AnimatedBg } from '@app/components/AnimatedBg';

import s from './Page.module.scss';

const Home = () => {
  return (
    <div className={s.root}>
      <AnimatedBg />
      <AboutMeSection />
      <SkillsSection />
    </div>
  );
};

export default Home;
