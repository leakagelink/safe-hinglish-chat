
export class AdMobDebugger {
  static logPlatformInfo() {
    console.log('🔍 === AdMob Platform Debug Info ===');
    console.log('User Agent:', navigator.userAgent);
    console.log('Platform:', navigator.platform);
    console.log('Has Capacitor:', !!(window as any).Capacitor);
    console.log('Has AdMob:', !!window.AdMob);
    console.log('Capacitor platform:', (window as any).Capacitor?.platform);
    console.log('Is native platform:', (window as any).Capacitor?.isNativePlatform?.());
    
    if (window.AdMob) {
      console.log('✅ AdMob plugin is available');
      console.log('AdMob methods:', Object.keys(window.AdMob));
    } else {
      console.log('❌ AdMob plugin is NOT available');
    }
    
    console.log('=== End Debug Info ===');
  }

  static async testAdMobMethods() {
    console.log('🧪 Testing AdMob methods...');
    
    if (!window.AdMob) {
      console.error('❌ AdMob not available for testing');
      return;
    }

    try {
      console.log('Testing initialize...');
      await window.AdMob.initialize({
        requestTrackingAuthorization: true,
        testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
        initializeForTesting: true
      });
      console.log('✅ Initialize test passed');
    } catch (error) {
      console.error('❌ Initialize test failed:', error);
    }

    try {
      console.log('Testing banner ad...');
      await window.AdMob.showBanner({
        adId: 'ca-app-pub-3940256099942544/6300978111',
        adSize: 'ADAPTIVE_BANNER',
        position: 'BOTTOM_CENTER',
        isTesting: true
      });
      console.log('✅ Banner test passed');
    } catch (error) {
      console.error('❌ Banner test failed:', error);
    }
  }
}

// Auto-run debug info on load
if (typeof window !== 'undefined') {
  setTimeout(() => {
    AdMobDebugger.logPlatformInfo();
  }, 1000);
}
