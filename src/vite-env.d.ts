
/// <reference types="vite/client" />

// AdMob और Capacitor types with proper method signatures
declare global {
  interface Window {
    adsbygoogle?: any[];
    AdMob?: {
      initialize(config?: {
        requestTrackingAuthorization?: boolean;
        testingDevices?: string[];
        initializeForTesting?: boolean;
      }): Promise<void>;
      showBanner(options: {
        adId: string;
        adSize?: string;
        position?: string;
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
      showRewardedVideo?(options: {
        adId: string;
        isTesting?: boolean;
      }): Promise<void>;
    };
    Capacitor?: {
      platform: string;
      isNativePlatform(): boolean;
    };
  }
  
  // Development mode flag
  const __DEV__: boolean;
}

// Ionic React platform detection
declare module '@ionic/react' {
  export function isPlatform(platformName: string): boolean;
}

export {};
