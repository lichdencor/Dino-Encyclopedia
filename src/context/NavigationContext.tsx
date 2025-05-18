import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

interface NavigationContextType {
  previousRoute: string;
}

const NavigationContext = createContext<NavigationContextType>({ previousRoute: '' });

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const [previousRoute, setPreviousRoute] = useState<string>('');
  const currentRouteRef = useRef<string>(location.pathname);

  useEffect(() => {
    if (currentRouteRef.current !== location.pathname) {
      setPreviousRoute(currentRouteRef.current);
      currentRouteRef.current = location.pathname;
    }
  }, [location.pathname]);

  return (
    <NavigationContext.Provider value={{ previousRoute }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const usePreviousRoute = () => {
  const { previousRoute } = useContext(NavigationContext);
  return previousRoute;
}; 