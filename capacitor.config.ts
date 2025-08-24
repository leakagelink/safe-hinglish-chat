
import { CapacitorConfig } from '@capacitor/core';

const config: CapacitorConfig = {
  appId: 'com.safechatassistant.com',
  appName: 'SafeChat Assistant',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    cleartext: true,
    url: 'https://0dfa59f1-89f3-4e2c-99eb-39a77df9255e.lovableproject.com?forceHideBadge=true'
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
    },
    allowMixedContent: true
  },
  plugins: {
    AdMob: {
      appId: 'ca-app-pub-2211398170597117~9697749740',
      requestTrackingAuthorization: true,
      testingDevices: ['2077ef9a63d2b398840261c8221a0c9b'],
      initializeForTesting: true
    },
    SplashScreen: {
      launchShowDuration: 2000,
      launchAutoHide: true,
      backgroundColor: '#ffffff',
      androidSplashResourceName: 'splash',
      androidScaleType: 'CENTER_CROP'
    }
  },
};

export default config;
