
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'app.lovable.0dfa59f189f34e2c99eb39a77df9255e',
  appName: 'SafeChat Assistant',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    }
  },
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-2211398170597117~9087654321', // Real AdMob App ID (replace with actual)
      requestTrackingAuthorization: true,
      testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
      initializeForTesting: false // Set to false for live ads
    }
  }
};

export default config;
