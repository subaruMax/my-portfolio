import Link from 'next/link';

import { Button, Icon } from '@ui-kit';

import s from './Page.module.scss';

const Home = async () => {
  return (
    <div className={s.root}>
      <div className={s.wrapper}>
        <h2>Buttons</h2>
        <div className={s.componentsContainer}>
          <Button>Button</Button>
          <Button active>Button Active</Button>
          <Button disabled>Button Disabled</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
