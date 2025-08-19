
# Android AdMob Setup Verification

## Required AndroidManifest.xml Meta-data

Ensure the following is present in `android/app/src/main/AndroidManifest.xml`:

```xml
<application>
    <!-- AdMob App ID -->
    <meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="ca-app-pub-2211398170597117~9087654321"/>
    
    <!-- Required for Android 13+ -->
    <uses-permission android:name="com.google.android.gms.permission.AD_ID" />
    
    <!-- Network security config for ads -->
    <meta-data
        android:name="android.webkit.WebView.EnableSafeBrowsing"
        android:value="true" />
</application>
```

## Build.gradle Verification

In `android/app/build.gradle`, ensure:

```gradle
android {
    compileSdkVersion 34
    
    defaultConfig {
        minSdkVersion 24
        targetSdkVersion 34
    }
}

dependencies {
    implementation 'com.google.android.gms:play-services-ads:22.6.0'
}
```

## Common Crash Fixes

1. **Invalid App ID:** Replace test ID with real AdMob App ID
2. **Missing Permissions:** Add AD_ID permission for Android 13+
3. **Network Issues:** Ensure proper network security configuration
4. **AGP Compatibility:** Use compatible Android Gradle Plugin version (8.1.2+)

This configuration should prevent most AdMob-related crashes.
