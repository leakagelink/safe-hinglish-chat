
import React, { useEffect, useState } from 'react';
import { isPlatform } from '@ionic/react';
import { adMobService } from '@/services/adMobService';

const MobileAdBanner = () => {
  const [adLoaded, setAdLoaded] = useState(false);
  const [isNative, setIsNative] = useState(false);
  const [adError, setAdError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkPlatformAndLoadAds = async () => {
      try {
        const native = isPlatform('android') || isPlatform('ios') || isPlatform('capacitor');
        setIsNative(native);
        
        console.log('🔍 Platform Detection:', {
          native,
          android: isPlatform('android'),
          ios: isPlatform('ios'),
          capacitor: isPlatform('capacitor'),
          userAgent: navigator.userAgent
        });
        
        if (native) {
          console.log('📱 Native platform detected - initializing AdMob...');
          await initializeNativeAds();
        } else {
          console.log('🌐 Web platform detected - showing preview');
          setAdLoaded(true);
          setIsLoading(false);
        }
      } catch (error) {
        console.error('❌ Platform check error:', error);
        setAdError(`Platform error: ${error}`);
        setIsLoading(false);
      }
    };

    const initializeNativeAds = async () => {
      try {
        setIsLoading(true);
        
        // Wait for AdMob plugin to be ready
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        console.log('🚀 Starting AdMob initialization...');
        
        if (!adMobService.isAdMobAvailable()) {
          throw new Error('AdMob plugin not available');
        }

        await adMobService.initialize();
        console.log('✅ AdMob initialized, showing banner...');
        
        await adMobService.showBanner();
        console.log('✅ Banner ad loaded successfully');
        
        setAdLoaded(true);
        setAdError(null);
        
      } catch (error) {
        console.error('❌ AdMob native initialization failed:', error);
        setAdError(`AdMob Error: ${error}`);
      } finally {
        setIsLoading(false);
      }
    };

    checkPlatformAndLoadAds();

    return () => {
      // Cleanup
      if (isNative && adMobService.isAdMobAvailable() && adLoaded && !adError) {
        adMobService.hideBanner().catch(console.error);
      }
    };
  }, []);

  // Native platform with successful ad load - let AdMob handle display
  if (isNative && adLoaded && !adError) {
    return (
      <div className="w-full h-[60px] flex items-center justify-center bg-muted/20 rounded-lg border border-border">
        <div className="text-xs text-muted-foreground">
          ✅ AdMob Banner Active
        </div>
      </div>
    );
  }

  // Error state
  if (adError) {
    return (
      <div className="w-full min-h-[60px] bg-red-50 border border-red-200 rounded-lg p-3">
        <div className="text-center">
          <div className="text-xs font-medium text-red-600 mb-1">
            AdMob Loading Failed
          </div>
          <div className="text-[10px] text-red-500 mb-2">
            {adError}
          </div>
          <div className="text-[9px] text-red-400">
            Check console for detailed logs
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="w-full h-[60px] bg-gradient-to-r from-blue-50 to-purple-50 border border-border rounded-lg flex items-center justify-center">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
          <div className="w-2 h-2 bg-primary/40 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
          <div className="w-2 h-2 bg-primary/20 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
          <span className="text-xs ml-2">Initializing AdMob...</span>
        </div>
      </div>
    );
  }

  // Web preview mode
  return (
    <div className="w-full h-[60px] bg-gradient-to-r from-blue-50 to-purple-50 border border-border rounded-lg flex items-center justify-center relative overflow-hidden">
      <div className="flex items-center justify-center w-full px-4">
        <div className="text-center">
          <div className="text-xs font-medium text-muted-foreground mb-1">
            🌐 Web Preview Mode
          </div>
          <div className="text-[10px] text-muted-foreground">
            AdMob ads will show in mobile app
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 right-0 text-[8px] text-muted-foreground/50 px-1">
        Test Mode Enabled
      </div>
    </div>
  );
};

export default MobileAdBanner;
