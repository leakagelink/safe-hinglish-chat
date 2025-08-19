
import React, { useEffect, useRef, useState } from 'react';

const AdBanner = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);

  useEffect(() => {
    // Simulate ad loading
    const loadAd = () => {
      console.log('Loading AdMob Banner: ca-app-pub-2211398170597117/8727448852');
      
      // Simulate ad load delay
      setTimeout(() => {
        setAdLoaded(true);
        console.log('AdMob Banner loaded successfully');
      }, 1000);
    };

    loadAd();
  }, []);

  return (
    <div 
      ref={adRef} 
      className="w-full h-[50px] bg-gradient-to-r from-blue-50 to-purple-50 border border-border rounded-lg flex items-center justify-center text-caption relative overflow-hidden"
    >
      {/* Ad placeholder with animation */}
      {!adLoaded ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
          <span className="text-xs">Loading Ad...</span>
        </div>
      ) : (
        <div className="flex items-center justify-between w-full px-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">SC</span>
            </div>
            <div className="text-xs">
              <div className="font-medium text-foreground">SafeChat Pro</div>
              <div className="text-muted-foreground">Remove ads & get premium features</div>
            </div>
          </div>
          <button className="bg-primary text-primary-foreground px-3 py-1 rounded text-xs font-medium hover:bg-primary/90 transition-colors">
            Upgrade
          </button>
        </div>
      )}

      {/* AdMob integration indicator */}
      <div className="absolute bottom-0 right-0 text-[8px] text-muted-foreground/50 px-1">
        AdMob: ca-app-pub-2211398170597117/8727448852
      </div>
    </div>
  );
};

export default AdBanner;
