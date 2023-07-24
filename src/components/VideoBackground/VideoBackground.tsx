import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import React, { forwardRef, useEffect, useRef } from 'react';
import cn from 'classnames';

import s from './VideoBackground.module.scss';

type VideoBackgroundProps = {
  src: string;
  opacity?: number;
  transformOffset?: number[];
  blur?: number;
  className?: string;
  videoClassName?: string;
};

type Ref = HTMLDivElement;

export const VideoBackground = forwardRef<Ref, VideoBackgroundProps>(
  (
    {
      src,
      opacity = 0.8,
      transformOffset = [0.25, 1],
      blur = 0,
      className,
      videoClassName
    },
    ref
  ) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const isInView = useInView(videoRef);
    const { scrollYProgress } = useScroll({
      target: ref as React.RefObject<HTMLElement>,
      offset: ['-0.5', '0.5']
    });
    const overlayOpacity = useTransform(scrollYProgress, transformOffset, [
      1,
      opacity
    ]);

    useEffect(() => {
      if (isInView) {
        videoRef.current?.play();
      } else {
        videoRef.current?.pause();
      }
    }, [isInView]);

    return (
      <div className={cn(s.root, className)}>
        <video
          src={src}
          autoPlay
          loop
          muted
          controls={false}
          className={cn(s.video, videoClassName)}
          style={{ filter: `blur(${blur}px)` }}
          ref={videoRef}
        />
        <motion.div className={s.overlay} style={{ opacity: overlayOpacity }} />
      </div>
    );
  }
);
