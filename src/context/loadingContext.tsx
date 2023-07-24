'use client';

import React, {
  FC,
  createContext,
  useContext,
  useEffect,
  useState
} from 'react';
import Image from 'next/image';

import { LoaderMain } from '@app/components/LoaderMain';
import { PROJECTS } from '@app/constants/portfolio';
import {
  FRAMEWORKS,
  PROGRAMMING_LANGUAGES,
  TECHNOLOGIES_LIBRARIES
} from '@app/constants/skills';
import { uniq } from 'lodash';
import { LoadingScreen } from '@app/components/LoadingScreen';

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

const OTHER_ASSETS = [
  { image: '/media/globe-dark.svg' },
  { image: '/media/globe-light.svg' },
  { image: '/media/logo-dark.svg' },
  { image: '/media/logo-light.svg' }
];

export const LoadingContextProvider: FC<LoadingContextProviderProps> = ({
  children
}) => {
  const [appLoaded, setAppLoaded] = useState(defaultState.appLoaded);
  const [imagesLoaded, setImagesLoaded] = useState<string[]>([]);
  const [videosLoaded, setVideosLoaded] = useState<string[]>([]);
  const imagesToLoad = [
    ...PROGRAMMING_LANGUAGES,
    ...FRAMEWORKS,
    ...TECHNOLOGIES_LIBRARIES,
    ...PROJECTS,
    ...OTHER_ASSETS
  ].map(el => el.image);
  const percentLoaded = (imagesLoaded.length / imagesToLoad.length) * 100;

  const onImageLoaded = (url: string) => {
    setImagesLoaded(prev => uniq([...prev, url]));
  };

  const onVideoLoaded = (url: string) => {
    setVideosLoaded(prev => [...prev, url]);
  };
  const preloadImages = () => {
    return imagesToLoad.map(el => (
      <Image
        src={el}
        priority
        layout="fill"
        key={el}
        alt="preload"
        style={{ display: 'none' }}
        onLoadingComplete={() => onImageLoaded(el)}
        unoptimized
      />
    ));
  };

  useEffect(() => {
    let timer: NodeJS.Timer;

    if (imagesLoaded.length === imagesToLoad.length) {
      timer = setTimeout(() => setAppLoaded(true), 600);
    }

    return () => clearTimeout(timer);
  }, [imagesLoaded, imagesToLoad]);

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
