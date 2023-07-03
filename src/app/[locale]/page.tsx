import { LoaderMain } from '@app/components/LoaderMain';
import s from './Page.module.scss';

const Home = () => {
  return (
    <div className={s.root}>
      <div className={s.works}>
        <LoaderMain />
        <h2 data-text="Works in progress..." className={s.glitch}>
          Works in progress...
        </h2>
      </div>
    </div>
  );
};

export default Home;
