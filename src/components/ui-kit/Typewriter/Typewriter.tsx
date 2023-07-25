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
    const contentRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<HTMLDivElement>(null);
    const [wasInView, setWasInView] = useState(false);
    const isInView = useInView(viewRef);
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
        const result = contentRef.current?.textContent;

        if (!contentRef.current) {
          return;
        }

        if (result?.length === text.length || (wasInView && !isInView)) {
          contentRef.current.textContent = text;
          setIsCompleted(true);
          onComplete?.();
        } else {
          contentRef.current.textContent =
            contentRef.current?.textContent + chars[currentI];
          currentI = currentI + 1;
        }
      };

      let intervalId: NodeJS.Timer | undefined = undefined;

      if (start && isInView && !isCompleted) {
        intervalId = setInterval(type, interval);
      }

      if (isCompleted) {
        clearInterval(intervalId);
      }

      return () => clearInterval(intervalId);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isCompleted, start, isInView]);

    return (
      <div className={cn(s.root, className)} ref={viewRef}>
        {start && !isCompleted && (
          <span className={cn(s.bracket, s.left)}></span>
        )}
        <div ref={contentRef}>{contentRef.current?.textContent}</div>
        {start && !isCompleted && (
          <span className={cn(s.bracket, s.right)}></span>
        )}
      </div>
    );
  }
);
