
export const ADMOB_CONFIG = {
  // AdMob App ID - CRITICAL for preventing crashes
  appId: 'ca-app-pub-2211398170597117~9697749740',
  
  // Ad Unit IDs - Make sure these are correct
  adUnits: {
    banner: 'ca-app-pub-2211398170597117/8727448852',
    interstitial: 'ca-app-pub-2211398170597117/3696298239',
    rewarded: 'ca-app-pub-2211398170597117/1234567890', // Replace with actual rewarded ad unit ID
  },
  
  // Test device IDs for development
  testDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
  
  // Environment detection
  isProduction: process.env.NODE_ENV === 'production',
  
  // Development mode - use test ads
  isDevelopment: process.env.NODE_ENV === 'development' || 
                 window.location.hostname.includes('localhost') || 
                 window.location.hostname.includes('lovable'),
};

export default ADMOB_CONFIG;
