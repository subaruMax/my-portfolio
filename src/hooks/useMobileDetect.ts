import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export const useMobileDetect = (resolution = 1200) => {
  const [isMobile, setIsMobile] = useState<Boolean | null>(null);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      setIsMobile(width < resolution);
    };

    const debouncedResizeHandler = debounce(handleResize, 1000);

    window.addEventListener('resize', debouncedResizeHandler);
    handleResize();

    return () => {
      window.removeEventListener('resize', debouncedResizeHandler);
      debouncedResizeHandler.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    isMobile
  };
};

export default useMobileDetect;
