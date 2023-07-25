'use client';

import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';
import Image from 'next/image';

import PRELOAD_MEDIA from 'public/media/media-preload-urls.json';
import { useMobileDetect } from '@app/hooks';

interface LoadingContextProps {
  appLoaded: boolean;
  percentLoaded: number;
  onImageLoaded: (url: string) => void;
  onVideoLoaded: (url: string) => void;
}

const defaultState = {
  appLoaded: false,
  percentLoaded: 0,
  onImageLoaded: () => {},
  onVideoLoaded: () => {}
};

const LoadingContext = createContext<LoadingContextProps>(defaultState);

interface LoadingContextProviderProps {
  children: React.ReactNode;
}

export const LoadingContextProvider: FC<LoadingContextProviderProps> = ({
  children
}) => {
  const [appLoaded, setAppLoaded] = useState(defaultState.appLoaded);
  const [imagesLoaded, setImagesLoaded] = useState<string[]>([]);
  const [videosLoaded, setVideosLoaded] = useState<string[]>([]);
  const imagesToLoad = PRELOAD_MEDIA.images;
  const videosToLoad = PRELOAD_MEDIA.videos;

  const { isMobile } = useMobileDetect();

  const percentLoaded =
    Math.round(
      (imagesLoaded.length + videosLoaded.length) /
        (imagesToLoad.length + videosToLoad.length)
    ) * 100;

  const onImageLoaded = (url: string) => {
    setImagesLoaded(prev => [...prev, url]);
  };

  const onVideoLoaded = (url: string) => {
    setVideosLoaded(prev => [...prev, url]);
  };
  const preloadImages = () => {
    return imagesToLoad.map((url: string) => (
      <Image
        src={url}
        priority
        layout="fill"
        key={url}
        alt="preload"
        style={{ display: 'none' }}
        onLoadingComplete={() => onImageLoaded(url)}
        unoptimized
      />
    ));
  };

  const loadVideo = async (src: string) => {
    const res = await fetch(src);
    const blob = await res.blob();

    return URL.createObjectURL(blob);
  };

  const videoPreload = useCallback(() => {
    if (isMobile) {
      setVideosLoaded(videosToLoad);

      return;
    }

    videosToLoad.forEach(async (videoUrl: string) => {
      const video = document.createElement('video');

      video.src = await loadVideo(videoUrl);
      setVideosLoaded(prev => [...prev, videoUrl]);
    });
  }, [isMobile, videosToLoad]);

  useEffect(() => {
    videoPreload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (
      imagesLoaded.length === imagesToLoad.length &&
      videosLoaded.length === videosToLoad.length
    ) {
      timer = setTimeout(() => setAppLoaded(true), 600);
    }

    return () => clearTimeout(timer);
  }, [
    imagesLoaded,
    imagesToLoad,
    videosLoaded,
    videosLoaded.length,
    videosToLoad.length
  ]);

  return (
    <LoadingContext.Provider
      value={{
        appLoaded,
        percentLoaded,
        onImageLoaded,
        onVideoLoaded
      }}
    >
      {!appLoaded && <>{preloadImages()}</>}
      {children}
    </LoadingContext.Provider>
  );
};

const useLoadingContext = () => {
  const ctx = useContext(LoadingContext);

  if (!ctx) {
    throw new Error(
      'useLoadingContext has to be used within <LoadingContextProvider>'
    );
  }

  return ctx;
};

export default useLoadingContext;
