import { AboutMeSection, PortfolioSection, SkillsSection } from '@app/sections';
import { AnimatedBg } from '@app/components/AnimatedBg';

import s from './Page.module.scss';
import { ContactsSection } from '@app/sections/ContactsSection/ContactsSection';

const Home = () => {
  return (
    <main className={s.root}>
      <AnimatedBg />
      <AboutMeSection />
      <SkillsSection />
      <PortfolioSection />
      <ContactsSection />
    </main>
  );
};

export default Home;
