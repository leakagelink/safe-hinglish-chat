
# AdMob Debug और Troubleshooting Steps

## Immediate Check करें:

### 1. AndroidManifest.xml Verification
File: `android/app/src/main/AndroidManifest.xml`

**CRITICAL:** यह सही होना चाहिए:
```xml
<uses-permission android:name="com.google.android.gms.permission.AD_ID" />

<application>
    <meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="ca-app-pub-2211398170597117~9697749740"/>
</application>
```

### 2. Console Logs Check करें
Android Studio में Logcat में यह messages देखें:
- "AdMob initialized successfully"
- "AdMob Banner shown successfully"
- "Showing AdMob Interstitial Ad..."

### 3. Test Commands
```bash
# Clean everything
npx cap clean android
npm run build
npx cap sync android

# Open in Android Studio
npx cap open android
```

### 4. AdMob Console Setup
1. https://apps.admob.com/ पर जाएं
2. अपना app add करें: `com.safechatassistant.com`
3. App ID verify करें: `ca-app-pub-2211398170597117~9697749740`
4. Ad Units create करें अगर नहीं हैं

### 5. Common Issues:
- **App crashes:** AndroidManifest.xml में App ID missing है
- **Ads not showing:** Test device ID add करें
- **Banner not loading:** Internet permission missing
- **Interstitial not working:** Initialize नहीं हुआ है

### 6. Debug Mode Enable करें:
```javascript
// Console में run करें (Chrome DevTools में)
window.AdMob = { 
  initialize: () => console.log('AdMob Mock Initialize'),
  showBanner: () => console.log('AdMob Mock Banner'),
  showInterstitial: () => console.log('AdMob Mock Interstitial')
};
```

### 7. Real Device पर Test करें:
- Emulator में ads properly load नहीं होते
- Real Android device use करें
- Internet connection check करें

यदि अभी भी ads नहीं दिख रहे तो logcat का output भेजें।
