
import React from 'react';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-chat">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Privacy Policy</h1>
          </div>
        </div>

        {/* Content */}
        <div className="bg-background rounded-lg p-6 space-y-6">
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">1. Information We Don't Collect</h2>
            <p className="text-sm text-muted-foreground">
              SafeChat Assistant is designed with privacy by default. We do NOT collect, store, or process any personal information including:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• No user registration or login required</li>
              <li>• No personal details (name, email, phone number)</li>
              <li>• No location data or device identifiers</li>
              <li>• No chat history on our servers</li>
              <li>• No profile creation or user accounts</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">2. Local Data Storage</h2>
            <p className="text-sm text-muted-foreground">
              Your chat conversations are stored locally on your device only. This data never leaves your device and is not accessible to us or any third parties. You can clear this data anytime by clearing your browser storage or uninstalling the app.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">3. Third-Party Services</h2>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">
                  <strong>Google Gemini API:</strong> When you send a message, it is processed by Google's Gemini AI service to generate responses. Google's privacy policy applies to this interaction. No personal information is sent with your messages.
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">
                  <strong>Google AdMob:</strong> We use Google AdMob to display advertisements that help keep this app completely free. AdMob may collect certain advertising-related data as per Google's advertising policies. This may include:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 ml-4 mt-2">
                  <li>• Device advertising ID</li>
                  <li>• IP address for general location targeting</li>
                  <li>• Ad interaction data</li>
                  <li>• Device and app usage analytics for ad serving</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">4. Family Safety & Age Requirements</h2>
            <p className="text-sm text-muted-foreground">
              SafeChat is designed to be family-friendly and safe for users aged 13+. Our AI responses are filtered to ensure appropriate content. We strictly prohibit and filter out:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Adult, sexual, or romantic content</li>
              <li>• Violence or harmful activities</li>
              <li>• Illegal activities or advice</li>
              <li>• Inappropriate language or content</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">5. Data Security</h2>
            <p className="text-sm text-muted-foreground">
              Since we don't collect personal data and all chat history is stored locally on your device, your privacy is protected by design. We use industry-standard security measures for our app infrastructure.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">6. Changes to This Policy</h2>
            <p className="text-sm text-muted-foreground">
              We may update this privacy policy from time to time. Any changes will be reflected with an updated "Last updated" date. We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">7. Contact Us</h2>
            <p className="text-sm text-muted-foreground">
              For any privacy concerns or questions about this policy, please contact us at: <strong>safechat@socilet.com</strong>
            </p>
          </section>

          <div className="bg-safe-green/10 border border-safe-green/20 rounded-lg p-4 mt-6">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-safe-green mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-safe-green mb-2">Privacy-First Design</p>
                <p className="text-sm text-muted-foreground">
                  SafeChat is built with privacy as the foundation. We believe in keeping your conversations private and your data secure, which is why we've designed the app to work without collecting any personal information.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
