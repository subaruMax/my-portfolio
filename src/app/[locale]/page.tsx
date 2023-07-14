import { AboutMeSection, PortfolioSection, SkillsSection } from '@app/sections';
import { AnimatedBg } from '@app/components/AnimatedBg';
import { ContactsSection } from '@app/sections/ContactsSection/ContactsSection';

import s from './Page.module.scss';

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
