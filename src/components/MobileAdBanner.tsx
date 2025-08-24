
import React, { useEffect, useState } from 'react';
import { isPlatform } from '@ionic/react';
import { adMobService } from '@/services/adMobService';

const MobileAdBanner = () => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    const checkPlatform = () => {
      const native = isPlatform('android') || isPlatform('ios') || isPlatform('capacitor');
      setIsNative(native);
      console.log('Platform check - Native:', native);
      
      if (native) {
        initializeAds();
      } else {
        // Web browser - show preview only
        setAdLoaded(true);
        console.log('Running in web browser - showing preview');
      }
    };

    const initializeAds = async () => {
      try {
        console.log('Initializing AdMob for native platform...');
        
        // Wait a bit for AdMob to be ready
        setTimeout(async () => {
          if (adMobService.isAdMobAvailable()) {
            await adMobService.initialize();
            await adMobService.showBanner();
            setAdLoaded(true);
            console.log('AdMob Banner initialized and shown');
          } else {
            console.log('AdMob not available on this platform');
            setAdError(true);
          }
        }, 1000);
        
      } catch (error) {
        console.error('AdMob initialization error:', error);
        setAdError(true);
      }
    };

    checkPlatform();

    return () => {
      // Cleanup AdMob banner when component unmounts
      if (isNative && adMobService.isAdMobAvailable() && !adError) {
        adMobService.hideBanner().catch(console.error);
      }
    };
  }, []);

  // If running on native platform with AdMob successfully loaded, don't render anything
  // (AdMob will handle the banner display)
  if (isNative && adLoaded && !adError) {
    return null;
  }

  // Show error state for native if AdMob failed
  if (isNative && adError) {
    return (
      <div className="w-full h-[50px] bg-red-50 border border-red-200 rounded-lg flex items-center justify-center">
        <div className="text-xs text-red-600">AdMob loading failed - Check console for details</div>
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
