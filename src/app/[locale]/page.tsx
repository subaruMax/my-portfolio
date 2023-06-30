import s from './Page.module.scss';

const Home = async () => {
  return (
    <div className={s.root}>
      <div className={s.works}>
        <h2 data-text="Works in progress..." className={s.glitch}>
          Works in progress...
        </h2>
      </div>
    </div>
  );
};

export default Home;
