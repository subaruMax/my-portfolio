import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

const DEBOUNCE_TIME = 50;

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.scrollY);
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
