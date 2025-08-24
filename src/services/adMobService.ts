
import ADMOB_CONFIG from '../config/admobConfig';

interface AdMobService {
  showInterstitial(): Promise<void>;
  showBanner(): Promise<void>;
  hideBanner(): Promise<void>;
  isAdMobAvailable(): boolean;
}

class AdMobServiceImpl implements AdMobService {
  async showInterstitial(): Promise<void> {
    try {
      if (this.isAdMobAvailable() && window.AdMob) {
        console.log('Showing AdMob Interstitial Ad...');
        await window.AdMob.showInterstitial({
          adId: ADMOB_CONFIG.adUnits.interstitial,
          isTesting: !ADMOB_CONFIG.isProduction
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
      if (this.isAdMobAvailable() && window.AdMob) {
        console.log('Showing AdMob Banner Ad...');
        await window.AdMob.showBanner({
          adId: ADMOB_CONFIG.adUnits.banner,
          adSize: 'ADAPTIVE_BANNER',
          position: 'BOTTOM_CENTER',
          margin: 0,
          isTesting: !ADMOB_CONFIG.isProduction
        });
        console.log('AdMob Banner shown successfully');
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
