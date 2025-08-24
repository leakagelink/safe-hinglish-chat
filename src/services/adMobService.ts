
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
        console.log('Initializing AdMob...');
        
        // Initialize AdMob without arguments as per the API
        await window.AdMob.initialize();
        
        this.isInitialized = true;
        console.log('AdMob initialized successfully');
        console.log('Test mode enabled:', ADMOB_CONFIG.forceTestAds || ADMOB_CONFIG.isDevelopment);
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
        console.log('Showing Interstitial Ad...');
        
        // Always use test ads if forceTestAds is true, otherwise check environment
        const useTestAds = ADMOB_CONFIG.forceTestAds || ADMOB_CONFIG.isDevelopment;
        const adId = useTestAds 
          ? 'ca-app-pub-3940256099942544/1033173712' // Google test interstitial ID
          : ADMOB_CONFIG.adUnits.interstitial;

        console.log('Using ad ID:', adId, 'Test mode:', useTestAds);

        await window.AdMob.showInterstitial({
          adId: adId
        });
        
        console.log('Interstitial Ad shown successfully');
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
        console.log('Showing Banner Ad...');
        
        // Always use test ads if forceTestAds is true, otherwise check environment
        const useTestAds = ADMOB_CONFIG.forceTestAds || ADMOB_CONFIG.isDevelopment;
        const adId = useTestAds 
          ? 'ca-app-pub-3940256099942544/6300978111' // Google test banner ID
          : ADMOB_CONFIG.adUnits.banner;

        console.log('Using banner ad ID:', adId, 'Test mode:', useTestAds);

        await window.AdMob.showBanner({
          adId: adId,
          adSize: 'ADAPTIVE_BANNER',
          position: 'BOTTOM_CENTER',
          margin: 0
        });
        
        console.log('Banner Ad shown successfully');
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
