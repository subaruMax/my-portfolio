import useNavContext from '@app/context/navContext';
import { useInView } from 'framer-motion';
import { RefObject, useEffect } from 'react';

export const useChangeSection = (
  ref: RefObject<Element>,
  id: string,
  amountInView = 0.5
) => {
  const { setCurrentSection } = useNavContext();
  const isInView = useInView(ref, { amount: amountInView });

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isInView) {
      timer = setTimeout(() => {
        setCurrentSection(id);
      }, 400);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [id, isInView, setCurrentSection]);
};
