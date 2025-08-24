
export const ADMOB_CONFIG = {
  // AdMob App ID
  appId: 'ca-app-pub-2211398170597117~9697749740',
  
  // Ad Unit IDs
  adUnits: {
    banner: 'ca-app-pub-2211398170597117/8727448852',
    interstitial: 'ca-app-pub-2211398170597117/3696298239',
    rewarded: 'ca-app-pub-2211398170597117/1234567890', // Replace with actual rewarded ad unit ID
  },
  
  // Test device IDs
  testDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
  
  // Production settings
  isProduction: !window.location.hostname.includes('localhost') && 
                !window.location.hostname.includes('lovable'),
};

export default ADMOB_CONFIG;
