
export const ADMOB_CONFIG = {
  // AdMob App ID - CRITICAL for preventing crashes
  appId: 'ca-app-pub-2211398170597117~9697749740',
  
  // Publisher ID
  publisherId: 'pub-2211398170597117',
  
  // Ad Unit IDs - Correct production IDs
  adUnits: {
    banner: 'ca-app-pub-2211398170597117/8727448852',
    interstitial: 'ca-app-pub-2211398170597117/3696298239',
    rewarded: 'ca-app-pub-2211398170597117/1234567890', // Update with actual rewarded ad unit ID if you have one
  },
  
  // Test device IDs for development
  testDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
  
  // Environment detection
  isProduction: process.env.NODE_ENV === 'production',
  
  // FORCE TEST ADS for development - Change this to false when you want live ads
  forceTestAds: true, // Set to true to always show test ads during development
  
  // Development mode - use test ads in development, real ads in production
  isDevelopment: process.env.NODE_ENV === 'development' || 
                 window.location.hostname.includes('localhost') || 
                 window.location.hostname.includes('lovable'),
};

export default ADMOB_CONFIG;
