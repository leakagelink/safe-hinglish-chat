
interface AdMobService {
  showInterstitial(): Promise<void>;
  isAdMobAvailable(): boolean;
}

class AdMobServiceImpl implements AdMobService {
  private interstitialAdId = 'ca-app-pub-2211398170597117/3696298239';

  async showInterstitial(): Promise<void> {
    try {
      if (this.isAdMobAvailable() && window.AdMob) {
        console.log('Showing AdMob Interstitial Ad...');
        await window.AdMob.showInterstitial({
          adId: this.interstitialAdId,
          isTesting: __DEV__ || false
        });
        console.log('AdMob Interstitial Ad shown successfully');
      } else {
        console.log('AdMob not available - showing fallback message');
      }
    } catch (error) {
      console.error('Failed to show interstitial ad:', error);
    }
  }

  isAdMobAvailable(): boolean {
    return !!(window.AdMob && (window as any).Capacitor);
  }
}

export const adMobService = new AdMobServiceImpl();
