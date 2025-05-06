import { useRef } from 'react';

interface AdDisplayProps {
  adCode: string;
}


export const AdDisplay = ({ adCode }: AdDisplayProps) => {
  const adContainerRef = useRef<HTMLDivElement>(null);
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