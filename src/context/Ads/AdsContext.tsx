import { createContext, useContext, useState, ReactNode } from 'react';
import { AdSource, adService } from '../../services/adServices';

export interface Banner {
  id: string;
  adCode: string;
  position: 'position1' | 'position2';
  active: boolean;
  createdAt: Date;
  sourceId: string;
}

interface AdsContextType {
  banners: Banner[];
  addBanner: (sourceId: string, position: Banner['position']) => void;
  removeBanner: (id: string) => void;
  toggleBannerStatus: (id: string) => void;
  availableAdSources: AdSource[];
}

const AdsContext = createContext<AdsContextType | undefined>(undefined);

export const useAds = () => {
  const context = useContext(AdsContext);
  if (!context) {
    throw new Error('useAds must be used within an AdsProvider');
  }
  return context;
};

export const AdsProvider = ({ children }: { children: ReactNode }) => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const availableAdSources = adService.getAdSources();

  const addBanner = (sourceId: string, position: Banner['position']) => {
    const source = adService.getAdSourceById(sourceId);
    if (!source) return;

    const existingBanner = banners.find(banner => banner.position === position);
    if (existingBanner) {
      setBanners(prev => prev.map(banner => 
        banner.position === position
          ? {
              id: crypto.randomUUID(),
              adCode: source.getAdCode(),
              position,
              active: true,
              createdAt: new Date(),
              sourceId
            }
          : banner
      ));
    } else {
      const newBanner: Banner = {
        id: crypto.randomUUID(),
        adCode: source.getAdCode(),
        position,
        active: true,
        createdAt: new Date(),
        sourceId
      };
      setBanners(prev => [...prev, newBanner]);
    }
  };

  const removeBanner = (id: string) => {
    setBanners(prev => prev.filter(banner => banner.id !== id));
  };

  const toggleBannerStatus = (id: string) => {
    setBanners(prev =>
      prev.map(banner =>
        banner.id === id ? { ...banner, active: !banner.active } : banner
      )
    );
  };

  return (
    <AdsContext.Provider
      value={{ banners, addBanner, removeBanner, toggleBannerStatus, availableAdSources }}
    >
      {children}
    </AdsContext.Provider>
  );
}; 