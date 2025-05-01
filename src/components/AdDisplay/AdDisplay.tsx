import { useEffect, useRef } from 'react';
import styles from './AdDisplay.module.css';

interface AdDisplayProps {
  adCode: string;
  sourceId: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

export const AdDisplay = ({ adCode, sourceId }: AdDisplayProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
  const isInitialized = useRef(false);

  useEffect(() => {
    if (sourceId === 'google' && !isInitialized.current) {
      if (isDevelopment) {
        return;
      }

      const loadGoogleAds = () => {
        if (!document.querySelector('script[src*="pagead2.googlesyndication.com"]')) {
          const script = document.createElement('script');
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3940256099942544';
          script.async = true;
          script.crossOrigin = 'anonymous';
          
          script.onload = () => {
            initializeAd();
          };
          
          document.head.appendChild(script);
        } else {
          initializeAd();
        }
      };

      const initializeAd = () => {
        try {
          if (!window.adsbygoogle) {
            window.adsbygoogle = [];
          }
          
          if (adContainerRef.current && !isInitialized.current) {
            window.adsbygoogle.push({});
            isInitialized.current = true;
          }
        } catch (error) {
          console.error('Error al inicializar el anuncio de Google:', error);
        }
      };

      const timeoutId = setTimeout(loadGoogleAds, 100);

      return () => {
        clearTimeout(timeoutId);
        isInitialized.current = false;
      };
    }
  }, [sourceId]);

  if (isDevelopment && sourceId === 'google') {
    return (
      <div className={styles.adContainer} style={{ 
        border: '2px dashed #ccc',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5'
      }}>
        <div style={{ 
          padding: '20px',
          textAlign: 'center',
          color: '#666'
        }}>
          <p style={{ margin: 0 }}>Ad Placeholder (Development Mode)</p>
          <p style={{ margin: '5px 0 0 0', fontSize: '12px' }}>728 x 90</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.adContainer}>
      <div
        ref={adContainerRef}
        dangerouslySetInnerHTML={{ __html: adCode }}
      />
    </div>
  );
}; 