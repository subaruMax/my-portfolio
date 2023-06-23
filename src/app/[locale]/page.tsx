import Link from 'next/link';

import s from './Page.module.scss';

const Home = async () => {
  return (
    <div className={s.root}>
      <Link href={'/page1'}>Page1</Link>
    </div>
  );
};

export default Home;
