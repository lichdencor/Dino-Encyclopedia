import { useRef, useEffect, useCallback } from 'react';
import { useAnalyticsTracking } from '../context/Analytics/AnalyticsProvider';

interface XRayTrackingProps {
  dinosaurId: string;
  dinosaurName: string;
  era: string;
  period: string;
  isSessionActive: boolean;
}

export const useXRayTracking = ({ 
  dinosaurId, 
  dinosaurName, 
  era, 
  period, 
  isSessionActive 
}: XRayTrackingProps) => {
  const { analytics } = useAnalyticsTracking();
  const sessionStartTime = useRef<number>(0);
  const initialProgress = useRef<number>(0);
  const lastMilestone = useRef<number>(0);
  const milestoneTimestamps = useRef<Record<number, number>>({});
  const hasTrackedSessionStart = useRef<boolean>(false);
  const trackedInfo = useRef<Set<string>>(new Set());
  const hasPuzzlePieceBeenTracked = useRef<boolean>(false);
  const lastTrackedProgress = useRef<number>(-1);

  useEffect(() => {
    if (isSessionActive && analytics && !hasTrackedSessionStart.current) {
      sessionStartTime.current = Date.now();
      hasTrackedSessionStart.current = true;
      
      analytics.trackXRaySessionStart(dinosaurId, era, period, initialProgress.current);
    }
  }, [isSessionActive, analytics, dinosaurId, era, period]);

  useEffect(() => {
    return () => {
      if (hasTrackedSessionStart.current && analytics && sessionStartTime.current > 0) {
        const sessionDuration = Math.floor((Date.now() - sessionStartTime.current) / 1000);
        analytics.trackXRaySessionEnd(
          dinosaurId, 
          era, 
          period, 
          lastMilestone.current, 
          sessionDuration, 
          false // Will be updated if puzzle piece was found
        );
      }
    };
  }, [analytics, dinosaurId, era, period]);

  useEffect(() => {
    if (!isSessionActive && hasTrackedSessionStart.current && analytics && sessionStartTime.current > 0) {
      const sessionDuration = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      analytics.trackXRaySessionEnd(
        dinosaurId, 
        era, 
        period, 
        lastMilestone.current, 
        sessionDuration, 
        hasPuzzlePieceBeenTracked.current
      );

      hasTrackedSessionStart.current = false;
      sessionStartTime.current = 0;
      lastMilestone.current = 0;
      milestoneTimestamps.current = {};
      trackedInfo.current.clear();
      hasPuzzlePieceBeenTracked.current = false;
      lastTrackedProgress.current = -1;
    }
  }, [isSessionActive, analytics, dinosaurId, era, period]);

  const trackProgressUpdate = useCallback((currentProgress: number) => {
    if (!analytics || !hasTrackedSessionStart.current) return;

    const progressDiff = Math.abs(currentProgress - lastTrackedProgress.current);
    if (progressDiff < 1 && lastTrackedProgress.current !== -1) {
      return;
    }
    
    lastMilestone.current = currentProgress;
    lastTrackedProgress.current = currentProgress;

    const milestones = [25, 50, 75, 100];
    
    for (const milestone of milestones) {
      if (currentProgress >= milestone && !milestoneTimestamps.current[milestone]) {
        const timeToReach = Math.floor((Date.now() - sessionStartTime.current) / 1000);
        milestoneTimestamps.current[milestone] = Date.now();
        
        analytics.trackXRayProgressMilestone(dinosaurId, era, period, milestone, timeToReach);

        if (milestone === 100) {
          analytics.trackXRayDinosaurDiscovery(
            dinosaurId, 
            dinosaurName, 
            era, 
            period, 
            timeToReach, 
            timeToReach
          );
        }
      }
    }
  }, [analytics, dinosaurId, dinosaurName, era, period]);

  const trackPuzzlePieceFound = useCallback((scanProgress: number) => {
    if (!analytics || !hasTrackedSessionStart.current || hasPuzzlePieceBeenTracked.current) return;
    
    hasPuzzlePieceBeenTracked.current = true;
    const timeToFind = Math.floor((Date.now() - sessionStartTime.current) / 1000);
    
    analytics.trackXRayPuzzlePieceFound(dinosaurId, era, period, scanProgress, timeToFind);
  }, [analytics, dinosaurId, era, period]);

  const trackInfoUnlocked = useCallback((infoType: string, totalInfoUnlocked: number) => {
    if (!analytics || !hasTrackedSessionStart.current) return;

    const infoKey = `${infoType}_${totalInfoUnlocked}`;

    if (!trackedInfo.current.has(infoKey)) {
      trackedInfo.current.add(infoKey);
      analytics.trackXRayInfoUnlocked(dinosaurId, era, period, infoType, totalInfoUnlocked);
    }
  }, [analytics, dinosaurId, era, period]);

  const setInitialProgress = useCallback((progress: number) => {
    initialProgress.current = progress;
  }, []);

  return {
    trackProgressUpdate,
    trackPuzzlePieceFound,
    trackInfoUnlocked,
    setInitialProgress,
    sessionDuration: sessionStartTime.current > 0 ? Math.floor((Date.now() - sessionStartTime.current) / 1000) : 0,
  };
}; 