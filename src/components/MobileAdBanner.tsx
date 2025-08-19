
import React, { useEffect, useState } from 'react';
import { isPlatform } from '@ionic/react';

// Capacitor AdMob types
interface AdMob {
  initialize(): Promise<void>;
  showBanner(options: {
    adId: string;
    adSize: string;
    position: string;
    margin?: number;
    isTesting?: boolean;
  }): Promise<void>;
  hideBanner(): Promise<void>;
  resumeBanner(): Promise<void>;
  removeBanner(): Promise<void>;
  showInterstitial(options: {
    adId: string;
    isTesting?: boolean;
  }): Promise<void>;
}

declare global {
  interface Window {
    AdMob?: AdMob;
  }
}

const MobileAdBanner = () => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    const checkPlatform = () => {
      const native = isPlatform('android') || isPlatform('ios') || isPlatform('capacitor');
      setIsNative(native);
      
      if (native && window.AdMob) {
        initializeAdMob();
      } else if (!native) {
        // Web browser - show preview only
        setAdLoaded(true);
      }
    };

    const initializeAdMob = async () => {
      try {
        console.log('Initializing AdMob for native platform...');
        
        if (window.AdMob) {
          await window.AdMob.initialize();
          
          await window.AdMob.showBanner({
            adId: 'ca-app-pub-2211398170597117/8727448852',
            adSize: 'ADAPTIVE_BANNER',
            position: 'BOTTOM_CENTER',
            margin: 0,
            isTesting: false // Live ads for production
          });
          
          setAdLoaded(true);
          console.log('AdMob Banner loaded successfully with live ads');
        }
      } catch (error) {
        console.error('AdMob initialization error:', error);
        setAdError(true);
      }
    };

    checkPlatform();

    return () => {
      // Cleanup AdMob banner when component unmounts
      if (isNative && window.AdMob && !adError) {
        window.AdMob.hideBanner().catch(console.error);
      }
    };
  }, []);

  // If running on native platform with AdMob successfully loaded, don't render anything
  if (isNative && window.AdMob && adLoaded && !adError) {
    return null;
  }

  // Show error state for native if AdMob failed
  if (isNative && adError) {
    return (
      <div className="w-full h-[50px] bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
        <div className="text-xs text-red-600">AdMob loading failed</div>
      </div>
    );
  }

  // Web browser preview or native loading state
  return (
    <div className="w-full h-[50px] bg-gradient-to-r from-blue-50 to-purple-50 border border-border rounded-lg flex items-center justify-center relative overflow-hidden">
      {!adLoaded ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
          <span className="text-xs">Loading AdMob Banner...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full px-4">
          <div className="text-center">
            <div className="text-xs font-medium text-muted-foreground mb-1">
              {isNative ? 'AdMob Loading...' : 'Web Preview Mode'}
            </div>
            <div className="text-[10px] text-muted-foreground">
              {isNative ? 'Native ads will display' : 'Live ads show in mobile app'}
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 right-0 text-[8px] text-muted-foreground/50 px-1">
        AdMob Banner
      </div>
    </div>
  );
};

export default MobileAdBanner;
