
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
  private initializationPromise: Promise<void> | null = null;

  async initialize(): Promise<void> {
    // Prevent multiple initializations
    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this._initializeAdMob();
    return this.initializationPromise;
  }

  private async _initializeAdMob(): Promise<void> {
    try {
      console.log('🚀 Starting AdMob initialization...');
      console.log('Platform check:', {
        hasAdMob: !!window.AdMob,
        hasCapacitor: !!(window as any).Capacitor,
        isNative: this.isAdMobAvailable()
      });

      if (!this.isAdMobAvailable()) {
        console.log('❌ AdMob not available - running in web browser');
        return;
      }

      if (this.isInitialized) {
        console.log('✅ AdMob already initialized');
        return;
      }

      console.log('🔧 Initializing AdMob (no-args, using capacitor.config.ts plugin options)...');

      // IMPORTANT: initialize without arguments for @capacitor-community/admob v7
      await window.AdMob.initialize();

      this.isInitialized = true;
      console.log('✅ AdMob initialized successfully');
      
    } catch (error) {
      console.error('❌ AdMob initialization failed:', error);
      this.isInitialized = false;
      this.initializationPromise = null;
      throw error;
    }
  }

  async showInterstitial(): Promise<void> {
    try {
      console.log('🎯 Attempting to show interstitial ad...');
      
      await this.initialize();

      if (!this.isAdMobAvailable() || !this.isInitialized) {
        console.log('⚠️ AdMob not available for interstitial');
        return;
      }

      const useTestAds = ADMOB_CONFIG.forceTestAds || ADMOB_CONFIG.isDevelopment;
      const adId = useTestAds 
        ? 'ca-app-pub-3940256099942544/1033173712' // Google test interstitial ID
        : ADMOB_CONFIG.adUnits.interstitial;

      console.log('📱 Showing interstitial with:', {
        adId,
        testMode: useTestAds
      });

      await window.AdMob.showInterstitial({
        adId: adId,
        isTesting: useTestAds
      });
      
      console.log('✅ Interstitial ad shown successfully');
      
    } catch (error) {
      console.error('❌ Failed to show interstitial ad:', error);
      throw error;
    }
  }

  async showBanner(): Promise<void> {
    try {
      console.log('🏷️ Attempting to show banner ad...');
      
      await this.initialize();

      if (!this.isAdMobAvailable() || !this.isInitialized) {
        console.log('⚠️ AdMob not available for banner');
        return;
      }

      const useTestAds = ADMOB_CONFIG.forceTestAds || ADMOB_CONFIG.isDevelopment;
      const adId = useTestAds 
        ? 'ca-app-pub-3940256099942544/6300978111' // Google test banner ID
        : ADMOB_CONFIG.adUnits.banner;

      console.log('📱 Showing banner with:', {
        adId,
        testMode: useTestAds
      });

      await window.AdMob.showBanner({
        adId: adId,
        adSize: 'ADAPTIVE_BANNER',
        position: 'BOTTOM_CENTER',
        margin: 0,
        isTesting: useTestAds
      });
      
      console.log('✅ Banner ad shown successfully');
      
    } catch (error) {
      console.error('❌ Failed to show banner ad:', error);
      throw error;
    }
  }

  async hideBanner(): Promise<void> {
    try {
      if (this.isAdMobAvailable() && window.AdMob) {
        await window.AdMob.hideBanner();
        console.log('✅ Banner ad hidden successfully');
      }
    } catch (error) {
      console.error('❌ Failed to hide banner ad:', error);
    }
  }

  isAdMobAvailable(): boolean {
    const available = !!(window.AdMob && (window as any).Capacitor);
    console.log('🔍 AdMob availability check:', available);
    return available;
  }
}

export const adMobService = new AdMobServiceImpl();
