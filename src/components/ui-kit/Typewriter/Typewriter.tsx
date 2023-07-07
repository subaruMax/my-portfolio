import React, { useEffect, useState } from 'react';
import cn from 'classnames';

import s from './Typewriter.module.scss';

type TypewriterProps = {
  text: string;
  start?: boolean;
  interval?: number;
  className?: string;
  onComplete?: () => void;
};

export const Typewriter: React.FC<TypewriterProps> = ({
  text,
  start = true,
  interval = 100,
  className,
  onComplete
}) => {
  const [result, setResult] = useState('');
  const [isCompleted, setIsCompleted] = useState(false);
  const [currentI, setCurrentI] = useState(0);
  const chars = text.split('');

  useEffect(() => {
    const type = () => {
      if (result.length !== text.length) {
        setResult(result + chars[currentI]);
        setCurrentI(currentI + 1);
      } else {
        setIsCompleted(true);
        onComplete?.();
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
  }, [
    chars,
    currentI,
    interval,
    isCompleted,
    onComplete,
    result,
    start,
    text.length
  ]);

  return (
    <div className={className}>
      {result.length < text.length && (
        <span className={cn(s.bracket, s.left, { [s.hidden]: !start })}>
          &#91;
        </span>
      )}
      {result}
      {result.length < text.length && (
        <span className={cn(s.bracket, s.right, { [s.hidden]: !start })}>
          &#93;
        </span>
      )}
    </div>
  );
};
