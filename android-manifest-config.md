
# Android Manifest Configuration for AdMob

## Required AndroidManifest.xml Configuration

Add these configurations to `android/app/src/main/AndroidManifest.xml`:

### 1. Add permissions at the top (before <application> tag):
```xml
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="com.google.android.gms.permission.AD_ID" />
```

### 2. Add AdMob App ID inside <application> tag:
```xml
<application>
    <!-- AdMob App ID - CRITICAL for preventing crashes -->
    <meta-data
        android:name="com.google.android.gms.ads.APPLICATION_ID"
        android:value="ca-app-pub-2211398170597117~9697749740"/>
    
    <!-- Network security config -->
    <meta-data
        android:name="android.webkit.WebView.EnableSafeBrowsing"
        android:value="true" />
        
    <!-- Other existing configurations... -->
</application>
```

## Complete AndroidManifest.xml Structure:
```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android">
    
    <uses-permission android:name="android.permission.INTERNET" />
    <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
    <uses-permission android:name="com.google.android.gms.permission.AD_ID" />

    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/AppTheme"
        android:usesCleartextTraffic="true">

        <!-- AdMob App ID - CORRECT PRODUCTION ID -->
        <meta-data
            android:name="com.google.android.gms.ads.APPLICATION_ID"
            android:value="ca-app-pub-2211398170597117~9697749740"/>
        
        <meta-data
            android:name="android.webkit.WebView.EnableSafeBrowsing"
            android:value="true" />

        <activity
            android:exported="true"
            android:launchMode="singleTask"
            android:name="com.safechatassistant.com.MainActivity"
            android:theme="@style/AppTheme.NoActionBarLaunch">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>

        <provider
            android:name="androidx.startup.InitializationProvider"
            android:authorities="${applicationId}.androidx-startup"
            android:exported="false"
            tools:node="merge">
            <meta-data
                android:name="androidx.lifecycle.ProcessLifecycleInitializer"
                android:value="androidx.startup" />
        </provider>
    </application>
</manifest>
```

**IMPORTANT:** Make sure to update this file manually in Android Studio after syncing!
