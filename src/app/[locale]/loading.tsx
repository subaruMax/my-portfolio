import { LoaderMain } from '@app/components/LoaderMain';
import s from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={s.root}>
      <LoaderMain className={s.loader} />
    </div>
  );
};

export default Loading;
