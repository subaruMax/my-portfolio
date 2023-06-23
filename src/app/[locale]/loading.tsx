import s from './Loading.module.scss';

const Loading = () => {
  return (
    <div className={s.root}>
      <div className={s.content}>LOADING...</div>
    </div>
  );
};

export default Loading;
