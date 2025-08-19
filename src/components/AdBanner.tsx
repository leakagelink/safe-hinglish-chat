
import React, { useEffect, useRef, useState } from 'react';

const AdBanner = () => {
  const adRef = useRef<HTMLDivElement>(null);
  const [adLoaded, setAdLoaded] = useState(false);
  const [adError, setAdError] = useState(false);

  useEffect(() => {
    // Initialize real AdMob banner ad
    const loadAdMobBanner = () => {
      console.log('Initializing AdMob Banner Ad');
      console.log('AdMob Publisher ID: ca-app-pub-2211398170597117');
      console.log('Banner Ad Unit ID: ca-app-pub-2211398170597117/8727448852');
      
      try {
        // In a real mobile app, this would be handled by AdMob SDK
        // For web preview, we simulate the ad loading process
        if (window.location.hostname === 'localhost' || window.location.hostname.includes('lovable')) {
          // Development/Preview mode - show placeholder
          setTimeout(() => {
            setAdLoaded(true);
            console.log('AdMob Banner: Preview mode - real ads will show in production');
          }, 1500);
        } else {
          // Production mode - real AdMob integration
          const script = document.createElement('script');
          script.async = true;
          script.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2211398170597117';
          script.crossOrigin = 'anonymous';
          
          script.onload = () => {
            try {
              if (window.adsbygoogle && Array.isArray(window.adsbygoogle) && adRef.current) {
                window.adsbygoogle.push({});
                setAdLoaded(true);
                console.log('AdMob Banner loaded successfully');
              }
            } catch (error) {
              console.error('AdMob Banner error:', error);
              setAdError(true);
            }
          };
          
          script.onerror = () => {
            console.error('Failed to load AdMob script');
            setAdError(true);
          };
          
          document.head.appendChild(script);
        }
      } catch (error) {
        console.error('AdMob initialization error:', error);
        setAdError(true);
      }
    };

    loadAdMobBanner();

    return () => {
      // Cleanup
      const existingScript = document.querySelector('script[src*="adsbygoogle"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  // Production AdMob banner
  if (!adError && !window.location.hostname.includes('localhost') && !window.location.hostname.includes('lovable')) {
    return (
      <div className="w-full h-[50px] bg-background border border-border rounded-lg overflow-hidden">
        <ins 
          className="adsbygoogle w-full h-full block"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-2211398170597117"
          data-ad-slot="8727448852"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Preview mode or fallback
  return (
    <div 
      ref={adRef} 
      className="w-full h-[50px] bg-gradient-to-r from-blue-50 to-purple-50 border border-border rounded-lg flex items-center justify-center relative overflow-hidden"
    >
      {!adLoaded ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-2 h-2 bg-primary/60 rounded-full animate-pulse" />
          <span className="text-xs">Loading AdMob Banner...</span>
        </div>
      ) : (
        <div className="flex items-center justify-center w-full px-4">
          <div className="text-center">
            <div className="text-xs font-medium text-muted-foreground mb-1">
              {window.location.hostname.includes('localhost') || window.location.hostname.includes('lovable') 
                ? 'AdMob Preview Mode' 
                : 'Advertisement'}
            </div>
            <div className="text-[10px] text-muted-foreground">
              Real ads will display in production build
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
