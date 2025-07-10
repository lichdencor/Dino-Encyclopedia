import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalyticsTracking } from '../context/Analytics/AnalyticsProvider';

const ROUTE_NAMES: Record<string, string> = {
  '/': 'Landing Page',
  '/login': 'Login',
  '/register': 'Register',
  '/recovery-password': 'Password Recovery',
  '/games': 'Games Hub',
  '/album': 'Album',
  '/map': 'Era Map',
  '/store': 'Store',
  '/library': 'Library',
  '/wallet': 'Wallet',
  '/tips': 'Tips',
  '/profile': 'Profile',
  '/memodyn': 'MemoDyn Game',
  '/puzzleaurus': 'Puzzleaurus Game',
  '/pet-selection': 'Pet Selection',
  '/cretaceous-inferior': 'Cretaceous Inferior',
  '/cretaceous-medium': 'Cretaceous Medium',
  '/cretaceous-superior': 'Cretaceous Superior',
  '/jurassic-inferior': 'Jurassic Inferior',
  '/jurassic-medium': 'Jurassic Medium',
  '/jurassic-superior': 'Jurassic Superior',
  '/triassic-inferior': 'Triassic Inferior',
  '/triassic-medium': 'Triassic Medium',
  '/triassic-superior': 'Triassic Superior',
};

const getPageName = (pathname: string): string => {
  if (pathname.startsWith('/reading/')) {
    const bookId = pathname.split('/reading/')[1];
    return `Reading - Book ${bookId}`;
  }

  return ROUTE_NAMES[pathname] || pathname;
};

const getRouteProperties = (pathname: string, search: string) => {
  const properties: Record<string, any> = {
    path: pathname,
    full_url: pathname + search,
  };

  if (pathname.startsWith('/reading/')) {
    const bookId = pathname.split('/reading/')[1];
    properties.book_id = bookId;
    properties.section = 'reading';
  } else if (pathname.includes('cretaceous') || pathname.includes('jurassic') || pathname.includes('triassic')) {
    const parts = pathname.split('-');
    if (parts.length >= 2) {
      properties.era = parts[0].replace('/', '');
      properties.period = parts[1];
      properties.section = 'geological_periods';
    }
  } else if (pathname === '/games') {
    properties.section = 'games';
  } else if (pathname === '/library') {
    properties.section = 'content';
  } else if (pathname === '/album') {
    properties.section = 'collection';
  }

  if (search) {
    const params = new URLSearchParams(search);
    params.forEach((value, key) => {
      properties[`param_${key}`] = value;
    });
  }

  return properties;
};

export const usePageTracking = () => {
  const location = useLocation();
  const { trackPageView } = useAnalyticsTracking();
  const previousLocation = useRef<string>('');

  useEffect(() => {
    const currentPath = location.pathname + location.search;

    if (previousLocation.current !== currentPath) {
      const pageName = getPageName(location.pathname);
      const properties = getRouteProperties(location.pathname, location.search);

      if (previousLocation.current) {
        properties.previous_page = getPageName(previousLocation.current.split('?')[0]);
        properties.previous_path = previousLocation.current;
      }

      trackPageView(pageName, properties);

      previousLocation.current = currentPath;
    }
  }, [location, trackPageView]);

  return {
    currentPage: getPageName(location.pathname),
    currentPath: location.pathname,
  };
}; 