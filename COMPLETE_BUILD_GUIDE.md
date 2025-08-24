
# SafeChat Assistant - Complete Build Guide

## Prerequisites
- Node.js (version 16 or higher)
- Android Studio (latest version)
- Git
- Java JDK 11 or higher

## Step-by-Step Build Process

### 1. Clone and Setup Project
```bash
# Clone the repository
git clone https://github.com/leakagelink/safe-hinglish-chat
cd safe-hinglish-chat

# Install dependencies
npm install --legacy-peer-deps

# Install Capacitor and AdMob dependencies
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor-community/admob
```

### 2. Build Web Assets
```bash
# Build the web application
npm run build
```

### 3. Initialize Capacitor (if not already done)
```bash
# Sync Capacitor configuration
npx cap sync

# Add Android platform
npx cap add android
```

### 4. Configure Android for AdMob

**CRITICAL STEP:** Edit `android/app/src/main/AndroidManifest.xml`:

Add these permissions before `<application>` tag:
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="com.google.android.gms.permission.AD_ID" />
```

Add this meta-data inside `<application>` tag:
```xml
<meta-data
    android:name="com.google.android.gms.ads.APPLICATION_ID"
    android:value="ca-app-pub-2211398170597117~9697749740"/>
```

### 5. Verify build.gradle Configuration

Check `android/app/build.gradle`:
```gradle
android {
    compileSdk 34
    
    defaultConfig {
        minSdkVersion 24
        targetSdkVersion 34
    }
}

dependencies {
    implementation 'com.google.android.gms:play-services-ads:22.6.0'
}
```

### 6. Clean and Sync
```bash
# Clean previous builds
npx cap clean android

# Rebuild web assets
npm run build

# Sync everything
npx cap sync android
```

### 7. Open in Android Studio
```bash
# Open project in Android Studio
npx cap open android
```

### 8. Final Steps in Android Studio
1. **Sync Project with Gradle Files** (click the sync button)
2. **Clean Project** (Build > Clean Project)
3. **Rebuild Project** (Build > Rebuild Project)
4. **Uninstall previous app** from device/emulator
5. **Run the app** (green play button)

## Troubleshooting

### If app still crashes:
1. Check logcat for exact error
2. Verify AndroidManifest.xml has correct AdMob App ID
3. Ensure minimum SDK is 24
4. Clean and rebuild everything
5. Uninstall previous app installation

### Commands to run if you make changes:
```bash
npm run build
npx cap sync android
```

## AdMob Verification
- Upload `public/app-ads.txt` to your website root
- Verify your app in AdMob console using App ID: `ca-app-pub-2211398170597117~9697749740`

## Success Indicators
- App launches without crashes
- No AdMob-related errors in logcat
- Ads load and display properly
- App functions normally
