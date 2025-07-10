import { useRef, useEffect } from 'react';
import { useAnalyticsTracking } from '../context/Analytics/AnalyticsProvider';

interface BookTrackingProps {
  bookId: string;
  bookType: 'kids' | 'adults';
  pageNumber?: number;
}

export const useBookTracking = ({ bookId, bookType, pageNumber }: BookTrackingProps) => {
  const { analytics } = useAnalyticsTracking();
  const pageStartTime = useRef<number>(0);
  const currentPageRef = useRef<number>(pageNumber || 1);
  const hasTrackedOpen = useRef<boolean>(false);

  useEffect(() => {
    if (analytics && !hasTrackedOpen.current) {
      analytics.trackBookOpen(bookId, bookType);
      hasTrackedOpen.current = true;
    }
  }, [analytics, bookId, bookType]);

  useEffect(() => {
    if (pageNumber !== undefined && currentPageRef.current !== pageNumber) {
      if (analytics && pageStartTime.current > 0) {
        const timeOnPage = Date.now() - pageStartTime.current;
        analytics.trackBookPageTurn(bookId, currentPageRef.current, Math.floor(timeOnPage / 1000));
      }
      
      currentPageRef.current = pageNumber;
      pageStartTime.current = Date.now();
    }
  }, [analytics, bookId, pageNumber]);

  useEffect(() => {
    pageStartTime.current = Date.now();
    
    return () => {
      if (analytics && pageStartTime.current > 0) {
        const timeOnPage = Date.now() - pageStartTime.current;
        analytics.trackBookPageTurn(bookId, currentPageRef.current, Math.floor(timeOnPage / 1000));

        analytics.trackCustomEvent('Book Closed', {
          book_id: bookId,
          book_type: bookType,
          last_page: currentPageRef.current,
          session_duration: Math.floor(timeOnPage / 1000),
        });
      }
    };
  }, [analytics, bookId, bookType]);

  const trackPageInteraction = (interactionType: string, data?: Record<string, any>) => {
    if (analytics) {
      analytics.trackCustomEvent(`Book ${interactionType}`, {
        book_id: bookId,
        book_type: bookType,
        page_number: currentPageRef.current,
        ...data,
      });
    }
  };

  return {
    trackPageInteraction,
    currentPage: currentPageRef.current,
  };
}; 