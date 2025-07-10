import * as amplitude from '@amplitude/analytics-browser';

interface UserProperties {
  userId?: string;
  email?: string;
  age?: number;
  preferred_language?: string;
}

interface EventProperties {
  [key: string]: any;
}

class AnalyticsService {
  private initialized = false;
  private eventThrottle = new Map<string, number>();
  private readonly THROTTLE_DURATION = 1000;

  initialize(apiKey: string, userId?: string) {
    if (this.initialized) return;
    
    amplitude.init(apiKey, {
      defaultTracking: {
        sessions: true,
        pageViews: true,
        formInteractions: true,
        fileDownloads: true,
      },
    });

    if (userId) {
      amplitude.setUserId(userId);
    }

    this.initialized = true;
  }

  identify(userId: string, userProperties?: UserProperties) {
    if (!this.initialized) {
      console.warn('Analytics service not initialized');
      return;
    }

    if (!userId || userId === 'guest') {
      console.warn('Invalid or guest userId, skipping identification');
      return;
    }

          try {
        amplitude.setUserId(userId);
        if (userProperties) {
          const identifyEvent = new amplitude.Identify();
          Object.entries(userProperties).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              identifyEvent.set(key, value);
            }
          });
          amplitude.identify(identifyEvent);
        }
      } catch (error) {
        console.error('Error identifying user:', error);
      }
  }

  private trackEvent(eventName: string, properties: EventProperties = {}) {
    if (!this.initialized) {
      console.warn('Analytics service not initialized');
      return;
    }

    const eventKey = this.createEventKey(eventName, properties);
    const now = Date.now();
    const lastEventTime = this.eventThrottle.get(eventKey);

    if (lastEventTime && (now - lastEventTime) < this.THROTTLE_DURATION) {
      console.log(`Event throttled: ${eventName}`);
      return;
    }

    this.eventThrottle.set(eventKey, now);

    try {
      amplitude.track(eventName, {
        ...properties,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      console.error(`Error tracking event ${eventName}:`, error);
    }
  }

  private createEventKey(eventName: string, properties: EventProperties): string {
    if (eventName.startsWith('XRay')) {
      const { dinosaur_id, era, period, info_type, milestone_percentage } = properties;
      return `${eventName}_${dinosaur_id}_${era}_${period}_${info_type || ''}_${milestone_percentage || ''}`;
    }

    return eventName;
  }

  trackLogin(method: 'email' | 'google' | 'facebook' = 'email') {
    this.trackEvent('User Login', { method });
  }

  trackRegister(method: 'email' | 'google' | 'facebook' = 'email') {
    this.trackEvent('User Register', { method });
  }

  trackLogout() {
    this.trackEvent('User Logout');
  }

  trackPageView(pageName: string, properties?: EventProperties) {
    this.trackEvent('Page View', {
      page_name: pageName,
      ...properties,
    });
  }

  trackNavigationClick(destination: string, source: string) {
    this.trackEvent('Navigation Click', {
      destination,
      source,
    });
  }

  trackGameStart(gameType: 'puzzleaurus' | 'memodyn', difficulty?: string) {
    amplitude.track('Game Start', {
      game_type: gameType,
      difficulty,
      timestamp: new Date().toISOString(),
    });
  }

  trackGameEnd(gameType: 'puzzleaurus' | 'memodyn', result: 'win' | 'lose' | 'quit', score?: number, duration?: number) {
    amplitude.track('Game End', {
      game_type: gameType,
      result,
      score,
      duration_seconds: duration,
      timestamp: new Date().toISOString(),
    });
  }

  trackPuzzleComplete(puzzleId: string, timeToComplete: number, attempts: number) {
    amplitude.track('Puzzle Complete', {
      puzzle_id: puzzleId,
      time_to_complete: timeToComplete,
      attempts,
      timestamp: new Date().toISOString(),
    });
  }

  trackBookOpen(bookId: string, bookType: 'kids' | 'adults') {
    amplitude.track('Book Open', {
      book_id: bookId,
      book_type: bookType,
      timestamp: new Date().toISOString(),
    });
  }

  trackBookPageTurn(bookId: string, pageNumber: number, timeOnPage: number) {
    amplitude.track('Book Page Turn', {
      book_id: bookId,
      page_number: pageNumber,
      time_on_page: timeOnPage,
      timestamp: new Date().toISOString(),
    });
  }

  trackAlbumView(albumType: string) {
    amplitude.track('Album View', {
      album_type: albumType,
      timestamp: new Date().toISOString(),
    });
  }

  trackDinosaurView(dinosaurName: string, era: string) {
    amplitude.track('Dinosaur View', {
      dinosaur_name: dinosaurName,
      era,
      timestamp: new Date().toISOString(),
    });
  }

  trackAchievementUnlocked(achievementId: string, achievementType: 'bronze' | 'silver' | 'gold') {
    amplitude.track('Achievement Unlocked', {
      achievement_id: achievementId,
      achievement_type: achievementType,
      timestamp: new Date().toISOString(),
    });
  }

  trackProgressUpdate(progressType: string, currentValue: number, maxValue: number) {
    amplitude.track('Progress Update', {
      progress_type: progressType,
      current_value: currentValue,
      max_value: maxValue,
      completion_percentage: (currentValue / maxValue) * 100,
      timestamp: new Date().toISOString(),
    });
  }

  trackStoreView() {
    amplitude.track('Store View', {
      timestamp: new Date().toISOString(),
    });
  }

  trackItemPurchase(itemName: string, itemType: string, price: number, currency: string) {
    amplitude.track('Item Purchase', {
      item_name: itemName,
      item_type: itemType,
      price,
      currency,
      timestamp: new Date().toISOString(),
    });
  }

  trackTutorialStart(tutorialType: string) {
    amplitude.track('Tutorial Start', {
      tutorial_type: tutorialType,
      timestamp: new Date().toISOString(),
    });
  }

  trackTutorialComplete(tutorialType: string, duration: number) {
    amplitude.track('Tutorial Complete', {
      tutorial_type: tutorialType,
      duration_seconds: duration,
      timestamp: new Date().toISOString(),
    });
  }

  trackTutorialSkip(tutorialType: string, stepSkipped: number) {
    amplitude.track('Tutorial Skip', {
      tutorial_type: tutorialType,
      step_skipped: stepSkipped,
      timestamp: new Date().toISOString(),
    });
  }

  trackXRaySessionStart(dinosaurId: string, era: string, period: string, initialProgress: number) {
    this.trackEvent('XRay Session Start', {
      dinosaur_id: dinosaurId,
      era: era,
      period: period,
      initial_scan_progress: initialProgress,
      session_type: 'xray_scan',
    });
  }

  trackXRaySessionEnd(dinosaurId: string, era: string, period: string, finalProgress: number, sessionDuration: number, puzzlePieceFound: boolean) {
    this.trackEvent('XRay Session End', {
      dinosaur_id: dinosaurId,
      era: era,
      period: period,
      initial_scan_progress: 0,
      final_scan_progress: finalProgress,
      session_duration_seconds: sessionDuration,
      puzzle_piece_found: puzzlePieceFound,
      session_type: 'xray_scan',
    });
  }

  trackXRayPuzzlePieceFound(dinosaurId: string, era: string, period: string, scanProgress: number, timeToFind: number) {
    this.trackEvent('XRay Puzzle Piece Found', {
      dinosaur_id: dinosaurId,
      era: era,
      period: period,
      scan_progress_when_found: scanProgress,
      time_to_find_seconds: timeToFind,
      achievement_type: 'puzzle_piece_discovery',
    });
  }

  trackXRayProgressMilestone(dinosaurId: string, era: string, period: string, milestone: number, timeToReach: number) {
    this.trackEvent('XRay Progress Milestone', {
      dinosaur_id: dinosaurId,
      era: era,
      period: period,
      milestone_percentage: milestone,
      time_to_reach_seconds: timeToReach,
      milestone_type: 'scan_progress',
    });
  }

  trackXRayDinosaurDiscovery(dinosaurId: string, dinosaurName: string, era: string, period: string, totalScanTime: number, elapsedTime: number) {
    this.trackEvent('XRay Dinosaur Discovery', {
      dinosaur_id: dinosaurId,
      dinosaur_name: dinosaurName,
      era: era,
      period: period,
      total_scan_time_seconds: totalScanTime,
      elapsed_time_seconds: elapsedTime,
      achievement_type: 'dinosaur_discovery',
    });
  }

  trackXRayInfoUnlocked(dinosaurId: string, era: string, period: string, infoType: string, totalInfoUnlocked: number) {
    this.trackEvent('XRay Info Unlocked', {
      dinosaur_id: dinosaurId,
      era: era,
      period: period,
      info_type: infoType,
      total_info_unlocked: totalInfoUnlocked,
      unlock_type: 'dinosaur_info',
    });
  }

  trackError(errorType: string, errorMessage: string, errorContext?: string) {
    amplitude.track('Error Occurred', {
      error_type: errorType,
      error_message: errorMessage,
      error_context: errorContext,
      timestamp: new Date().toISOString(),
    });
  }

  trackSessionStart() {
    amplitude.track('Session Start', {
      timestamp: new Date().toISOString(),
    });
  }

  trackSessionEnd(duration: number) {
    amplitude.track('Session End', {
      duration_seconds: duration,
      timestamp: new Date().toISOString(),
    });
  }

  trackCustomEvent(eventName: string, properties?: EventProperties) {
    this.trackEvent(eventName, properties);
  }

  flush() {
    amplitude.flush();
  }
}

export const analyticsService = new AnalyticsService();
export default analyticsService; 