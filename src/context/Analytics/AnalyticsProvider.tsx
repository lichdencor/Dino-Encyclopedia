import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { analyticsService } from '../../services/AnalyticsService';
import { analyticsConfig } from '../../config/analytics.config';
import { useAuth } from '../../hooks/useAuth';

interface AnalyticsContextType {
  analytics: typeof analyticsService;
  isEnabled: boolean;
}

const AnalyticsContext = createContext<AnalyticsContextType | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
}

export const AnalyticsProvider: React.FC<AnalyticsProviderProps> = ({ children }) => {
  const { user, isAuthenticated, isGuest } = useAuth();
  const isEnabled = analyticsConfig.ENABLE_ANALYTICS;

  useEffect(() => {
    if (isEnabled && analyticsConfig.AMPLITUDE_API_KEY !== 'your-amplitude-api-key-here') {

      analyticsService.initialize(analyticsConfig.AMPLITUDE_API_KEY);


      analyticsService.trackSessionStart();


      return () => {
        analyticsService.flush();
      };
    }
  }, [isEnabled]);


  useEffect(() => {
    if (isEnabled && isAuthenticated && user && !isGuest && user.id && user.email) {

      analyticsService.identify(user.id, {
        userId: user.id,
        email: user.email,
        preferred_language: 'es',
      });
    }
  }, [isEnabled, isAuthenticated, user, isGuest]);



  const contextValue: AnalyticsContextType = {
    analytics: analyticsService,
    isEnabled,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = (): AnalyticsContextType => {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};

export const useAnalyticsTracking = () => {
  const { analytics, isEnabled } = useAnalytics();

  const trackEvent = (eventName: string, properties?: Record<string, any>) => {
    if (isEnabled) {
      analytics.trackCustomEvent(eventName, properties);
    }
  };

  const trackPageView = (pageName: string, properties?: Record<string, any>) => {
    if (isEnabled) {
      analytics.trackPageView(pageName, properties);
    }
  };

  const trackNavigation = (destination: string, source: string) => {
    if (isEnabled) {
      analytics.trackNavigationClick(destination, source);
    }
  };

  return {
    trackEvent,
    trackPageView,
    trackNavigation,
    analytics: isEnabled ? analytics : null,
  };
}; 