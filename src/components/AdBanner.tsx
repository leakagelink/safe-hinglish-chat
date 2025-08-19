
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
        <div className="flex items-center justify-center w-full px-4">
          {/* Sample Banner Ad Content */}
          <div className="flex items-center gap-3 text-center">
            <div className="w-8 h-8 bg-gradient-to-br from-orange-400 to-red-500 rounded-md flex items-center justify-center">
              <span className="text-white text-xs font-bold">🎮</span>
            </div>
            <div className="text-xs">
              <div className="font-medium text-foreground">Fun Mobile Game</div>
              <div className="text-muted-foreground">Download now and play for free!</div>
            </div>
            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-[10px] font-medium">
              Install
            </div>
          </div>
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
