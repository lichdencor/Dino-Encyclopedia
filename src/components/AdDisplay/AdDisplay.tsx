import { useEffect, useRef } from 'react';

interface AdDisplayProps {
  adCode: string;
  sourceId: string;
}

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

interface ImportMetaEnv {
  DEV: boolean;
}

const isDevelopment = import.meta.env?.DEV ?? false;
const ADSENSE_TEST_ID = 'ca-pub-3940256099942544';
const ADSENSE_PROD_ID = 'ca-pub-7349615633982189';

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
          script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${isDevelopment ? ADSENSE_TEST_ID : ADSENSE_PROD_ID}`;
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
      <div style={{ 
        width: '728px',
        height: '90px',
        margin: '0 auto',
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
          <p style={{ margin: '5px 0 0 0', fontSize: '10px', color: '#999' }}>
            {isDevelopment ? 'Using Test ID' : 'Using Production ID'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      width: '728px',
      height: '90px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'transparent'
    }}>
      <div
        ref={adContainerRef}
        dangerouslySetInnerHTML={{ __html: adCode }}
      />
    </div>
  );
}; 