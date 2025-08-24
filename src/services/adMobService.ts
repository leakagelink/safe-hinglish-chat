
import ADMOB_CONFIG from '../config/admobConfig';

interface AdMobService {
  initialize(): Promise<void>;
  showInterstitial(): Promise<void>;
  showBanner(): Promise<void>;
  hideBanner(): Promise<void>;
  isAdMobAvailable(): boolean;
}

class AdMobServiceImpl implements AdMobService {
  private isInitialized = false;

  async initialize(): Promise<void> {
    try {
      if (this.isAdMobAvailable() && window.AdMob && !this.isInitialized) {
        console.log('Initializing AdMob with App ID:', ADMOB_CONFIG.appId);
        
        await window.AdMob.initialize({
          requestTrackingAuthorization: true,
          testingDevices: ADMOB_CONFIG.testDevices,
          initializeForTesting: ADMOB_CONFIG.isDevelopment
        });
        
        this.isInitialized = true;
        console.log('AdMob initialized successfully');
      }
    } catch (error) {
      console.error('AdMob initialization failed:', error);
    }
  }

  async showInterstitial(): Promise<void> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (this.isAdMobAvailable() && window.AdMob) {
        console.log('Showing AdMob Interstitial Ad...');
        
        // Use test ad unit for development, real for production
        const adId = ADMOB_CONFIG.isDevelopment 
          ? 'ca-app-pub-3940256099942544/1033173712' // Test interstitial
          : ADMOB_CONFIG.adUnits.interstitial;

        await window.AdMob.showInterstitial({
          adId: adId,
          isTesting: ADMOB_CONFIG.isDevelopment
        });
        
        console.log('AdMob Interstitial Ad shown successfully');
      } else {
        console.log('AdMob not available - running in web browser');
      }
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
    }
  }

  async showBanner(): Promise<void> {
    try {
      if (!this.isInitialized) {
        await this.initialize();
      }

      if (this.isAdMobAvailable() && window.AdMob) {
        console.log('Showing AdMob Banner Ad...');
        
        // Use test ad unit for development, real for production
        const adId = ADMOB_CONFIG.isDevelopment 
          ? 'ca-app-pub-3940256099942544/6300978111' // Test banner
          : ADMOB_CONFIG.adUnits.banner;

        await window.AdMob.showBanner({
          adId: adId,
          adSize: 'ADAPTIVE_BANNER',
          position: 'BOTTOM_CENTER',
          margin: 0,
          isTesting: ADMOB_CONFIG.isDevelopment
        });
        
        console.log('AdMob Banner shown successfully');
      } else {
        console.log('AdMob not available - running in web browser');
      }
    } catch (error) {
      console.error('Failed to show banner ad:', error);
    }
  }

  async hideBanner(): Promise<void> {
    try {
      if (this.isAdMobAvailable() && window.AdMob) {
        await window.AdMob.hideBanner();
        console.log('AdMob Banner hidden successfully');
      }
    } catch (error) {
      console.error('Failed to hide banner ad:', error);
    }
  }

  isAdMobAvailable(): boolean {
    return !!(window.AdMob && (window as any).Capacitor);
  }
}

export const adMobService = new AdMobServiceImpl();
