import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

const DEBOUNCE_TIME = 50;

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState({
    current: 0,
    total: 0,
    currentPercent: 0
  });

  useEffect(() => {
    const updatePosition = () => {
      const documentHeight = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );

      const scrollPosition = window.scrollY;
      const scrollPercentage = Math.round(
        (scrollPosition / (documentHeight - window.innerHeight)) * 100
      );

      setScrollPosition({
        current: scrollPosition,
        total: documentHeight,
        currentPercent: scrollPercentage
      });
    };

    const debounced = debounce(updatePosition, DEBOUNCE_TIME);

    window.addEventListener('scroll', debounced);
    updatePosition();

    return () => {
      window.removeEventListener('scroll', debounced);
      debounced.cancel();
    };
  }, []);

  return scrollPosition;
};

export default useScrollPosition;
