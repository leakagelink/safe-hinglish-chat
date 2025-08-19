
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.safechatassistant.com',
  appName: 'SafeChat Assistant',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    },
  },
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-2211398170597117~9087654321', // Replace with your real AdMob App ID before release
      requestTrackingAuthorization: true,
      testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
      initializeForTesting: false, // false for live ads
    },
  },
};

export default config;
