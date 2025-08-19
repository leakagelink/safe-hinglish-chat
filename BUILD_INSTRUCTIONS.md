
# SafeChat Assistant - Build Instructions / निर्माण निर्देश

## English Instructions

### Prerequisites
- Node.js (version 16 or higher)
- Android Studio (for Android builds)
- Git

### Step-by-Step Build Process

1. **Clone the repository:**
```bash
git clone https://github.com/leakagelink/safe-hinglish-chat
cd safe-hinglish-chat
```

2. **Install dependencies:**
```bash
npm install
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor-community/admob
```

3. **Build the web app:**
```bash
npm run build
```

4. **Sync Capacitor:**
```bash
npx cap sync android
```

5. **Add Android platform (if not already added):**
```bash
npx cap add android
```

6. **Open in Android Studio:**
```bash
npx cap open android
```

### Important AdMob Configuration

Before building for production, ensure:
- Replace `ca-app-pub-2211398170597117~9087654321` in `capacitor.config.ts` with your real AdMob App ID
- Set `initializeForTesting: false` for live ads
- Ensure minimum SDK version is 24 in `android/app/build.gradle`

### Troubleshooting App Crashes

If the app crashes after AdMob integration:

1. **Check AdMob App ID:** Ensure it's correct in `capacitor.config.ts`
2. **Verify AndroidManifest:** Check that AdMob meta-data is properly injected
3. **Clean and Rebuild:**
```bash
npx cap clean android
npm run build
npx cap sync android
```

---

## हिंदी निर्देश

### आवश्यकताएं
- Node.js (संस्करण 16 या उच्चतर)
- Android Studio (Android बिल्ड के लिए)
- Git

### चरणबद्ध निर्माण प्रक्रिया

1. **रिपॉजिटरी क्लोन करें:**
```bash
git clone https://github.com/leakagelink/safe-hinglish-chat
cd safe-hinglish-chat
```

2. **डिपेंडेंसी इंस्टॉल करें:**
```bash
npm install
npm install @capacitor/core @capacitor/cli @capacitor/android @capacitor-community/admob
```

3. **वेब ऐप बिल्ड करें:**
```bash
npm run build
```

4. **Capacitor सिंक करें:**
```bash
npx cap sync android
```

5. **Android प्लेटफॉर्म जोड़ें (यदि पहले से नहीं जोड़ा गया है):**
```bash
npx cap add android
```

6. **Android Studio में खोलें:**
```bash
npx cap open android
```

### महत्वपूर्ण AdMob कॉन्फ़िगरेशन

प्रोडक्शन के लिए बिल्ड करने से पहले सुनिश्चित करें:
- `capacitor.config.ts` में `ca-app-pub-2211398170597117~9087654321` को अपनी वास्तविक AdMob App ID से बदलें
- लाइव विज्ञापनों के लिए `initializeForTesting: false` सेट करें
- `android/app/build.gradle` में minimum SDK संस्करण 24 सुनिश्चित करें

### ऐप क्रैश समस्या निवारण

यदि AdMob integration के बाद ऐप क्रैश हो रहा है:

1. **AdMob App ID जांचें:** सुनिश्चित करें कि यह `capacitor.config.ts` में सही है
2. **AndroidManifest सत्यापित करें:** जांचें कि AdMob meta-data सही तरीके से injected है
3. **साफ करें और फिर से बिल्ड करें:**
```bash
npx cap clean android
npm run build
npx cap sync android
```

### समर्थन

किसी भी समस्या के लिए, कृपया GitHub issues में रिपोर्ट करें।
