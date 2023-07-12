'use client';

import { NAVIGATION } from '@app/constants/navigation';
import { usePathname } from 'next/navigation';
import React, {
  FC,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState
} from 'react';

interface NavContextProps {
  currentSection: string;
  currentWindowY: number;
  setCurrentSection: (sectionName: string) => void;
  scrollToSection: (sectionName: string) => void;
  setCurrentWindowY: (y: number) => void;
}

const defaultState = {
  currentSection: NAVIGATION[0].id,
  currentWindowY: 0,
  setCurrentSection: () => {},
  scrollToSection: () => {},
  setCurrentWindowY: () => {}
};

const NavContext = createContext<NavContextProps>(defaultState);

export interface NavContextProviderProps {
  children: React.ReactNode;
}

export const NavContextProvider: FC<NavContextProviderProps> = ({
  children
}) => {
  const [currentSection, setCurrentSection] = useState(
    defaultState.currentSection
  );
  const [currentWindowY, setCurrentWindowY] = useState(0);
  const pathname = usePathname();

  const scrollToSection = useCallback(
    (id: string, behavior: ScrollBehavior = 'smooth') => {
      const element = document.getElementById(id);

      element?.scrollIntoView({
        behavior,
        block: 'start',
        inline: 'nearest'
      });
    },
    []
  );

  useEffect(() => {
    window.scrollTo(0, currentWindowY);
  }, [currentWindowY, pathname]);

  return (
    <NavContext.Provider
      value={{
        currentSection,
        currentWindowY,
        scrollToSection,
        setCurrentSection,
        setCurrentWindowY
      }}
    >
      {children}
    </NavContext.Provider>
  );
};

const useNavContext = () => {
  const ctx = useContext(NavContext);

  if (!ctx) {
    throw new Error('useNavContext has to be used within <NavContextProvider>');
  }

  return ctx;
};

export default useNavContext;
