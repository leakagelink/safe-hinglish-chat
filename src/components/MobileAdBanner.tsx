
import React, { useEffect, useState } from 'react';
import { isPlatform } from '@ionic/react';

// Capacitor AdMob types
interface AdMobBanner {
  show(): Promise<void>;
  hide(): Promise<void>;
  resume(): Promise<void>;
  remove(): Promise<void>;
}

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

  useEffect(() => {
    // Check if we're running in a native environment
    const checkPlatform = () => {
      const native = isPlatform('android') || isPlatform('ios') || isPlatform('capacitor');
      setIsNative(native);
      
      if (native && window.AdMob) {
        initializeAdMob();
      } else {
        // Web fallback
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
            isTesting: __DEV__ || false
          });
          
          setAdLoaded(true);
          console.log('AdMob Banner loaded successfully');
        }
      } catch (error) {
        console.error('AdMob initialization error:', error);
        setAdLoaded(false);
      }
    };

    checkPlatform();

    return () => {
      // Cleanup AdMob banner when component unmounts
      if (isNative && window.AdMob) {
        window.AdMob.hideBanner().catch(console.error);
      }
    };
  }, []);

  // If running on native platform with AdMob, don't render anything
  // AdMob will handle the banner display natively
  if (isNative && window.AdMob && adLoaded) {
    return null;
  }

  // Web fallback or loading state
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
              AdMob Preview Mode
            </div>
            <div className="text-[10px] text-muted-foreground">
              Real ads will display in production build
            </div>
          </div>
        </div>
      )}

      <div className="absolute bottom-0 right-0 text-[8px] text-muted-foreground/50 px-1">
        AdMob: ca-app-pub-2211398170597117/8727448852
      </div>
    </div>
  );
};

export default MobileAdBanner;
