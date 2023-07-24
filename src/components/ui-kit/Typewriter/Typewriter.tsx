import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';

import s from './Typewriter.module.scss';
import { useInView } from 'framer-motion';

type TypewriterProps = {
  text: string;
  start?: boolean;
  interval?: number;
  className?: string;
  onComplete?: () => void;
};

export const Typewriter: React.FC<TypewriterProps> = React.memo(
  ({ text, start = true, interval = 100, className, onComplete }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [wasInView, setWasInView] = useState(false);
    const isInView = useInView(ref);
    const chars = text.split('');
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
      if (isInView) {
        setWasInView(true);
      }
    }, [isInView]);

    useEffect(() => {
      let currentI = 0;
      const type = () => {
        const result = ref.current?.textContent;

        if (!ref.current) {
          return;
        }

        if (result?.length === text.length || (wasInView && !isInView)) {
          ref.current.textContent = text;
          setIsCompleted(true);
          onComplete?.();
        } else {
          ref.current.textContent = ref.current?.textContent + chars[currentI];
          currentI = currentI + 1;
        }
      };

      let intervalId: NodeJS.Timer | undefined = undefined;

      if (start) {
        intervalId = setInterval(type, interval);
      }

      if (isCompleted) {
        clearInterval(intervalId);
      }

      return () => clearInterval(intervalId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCompleted, start]);

    return (
      <div className={cn(s.root, className)}>
        {start && !isCompleted && (
          <span className={cn(s.bracket, s.left)}></span>
        )}
        <div ref={ref}>{ref.current?.textContent}</div>
        {start && !isCompleted && (
          <span className={cn(s.bracket, s.right)}></span>
        )}
      </div>
    );
  }
);
