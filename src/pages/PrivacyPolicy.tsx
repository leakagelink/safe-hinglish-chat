
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
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">2. Local Data Storage</h2>
            <p className="text-sm text-muted-foreground">
              Your chat conversations are stored locally on your device only. This data never leaves your device and is not accessible to us or any third parties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">3. Third-Party Services</h2>
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">
                <strong>Google Gemini API:</strong> Messages are sent to Google's Gemini API for AI responses. Google's privacy policy applies to this interaction.
              </p>
              <p className="text-sm text-muted-foreground">
                <strong>AdMob:</strong> We use Google AdMob for advertising. AdMob may collect certain data as per Google's advertising policies.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">4. Family Safety</h2>
            <p className="text-sm text-muted-foreground">
              SafeChat is designed to be family-friendly and safe for users aged 13+. Our AI responses are filtered to ensure appropriate content.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">5. Contact</h2>
            <p className="text-sm text-muted-foreground">
              For any privacy concerns, contact us at: support@safechat.app
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
