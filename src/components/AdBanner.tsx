
import React, { useEffect, useRef } from 'react';

const AdBanner = () => {
  const adRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // AdMob integration would be implemented here for React Native
    // For web demo, showing placeholder
    console.log('AdMob Banner loaded: ca-app-pub-2211398170597117/8727448852');
  }, []);

  return (
    <div 
      ref={adRef} 
      className="w-full h-[50px] bg-muted/30 border border-border rounded-lg flex items-center justify-center text-caption"
    >
      <span className="text-muted-foreground">AdMob Banner (ca-app-pub-2211398170597117/8727448852)</span>
    </div>
  );
};

export default AdBanner;
