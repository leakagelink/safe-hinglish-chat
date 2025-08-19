
import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gradient-chat">
      <div className="max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => window.history.back()}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            <h1 className="text-2xl font-bold">Terms of Service</h1>
          </div>
        </div>

        {/* Content */}
        <div className="bg-background rounded-lg p-6 space-y-6">
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleDateString()}
          </div>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">1. Acceptance of Terms</h2>
            <p className="text-sm text-muted-foreground">
              By using SafeChat Assistant ("the app"), you agree to these Terms of Service. If you do not agree, please do not use the app.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">2. Age Requirements</h2>
            <p className="text-sm text-muted-foreground">
              SafeChat is designed for users aged 13 and above. Users under 13 should use the app only with parental supervision and consent.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">3. Acceptable Use</h2>
            <p className="text-sm text-muted-foreground">
              You agree to use SafeChat responsibly and appropriately. The app is designed for family-friendly conversations. Prohibited uses include:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Attempting to generate inappropriate, harmful, or illegal content</li>
              <li>• Using the app for commercial purposes without permission</li>
              <li>• Attempting to reverse engineer or compromise the app's security</li>
              <li>• Sharing or distributing harmful or offensive content</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">4. AI-Generated Content</h2>
            <p className="text-sm text-muted-foreground">
              SafeChat uses AI technology to generate responses. While we strive for accuracy and safety:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• AI responses may not always be completely accurate</li>
              <li>• Users should verify important information independently</li>
              <li>• The app is for educational and entertainment purposes</li>
              <li>• Do not rely on the app for medical, legal, or professional advice</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">5. Advertising</h2>
            <p className="text-sm text-muted-foreground">
              SafeChat is supported by advertisements to keep the app completely free. By using the app, you acknowledge that:
            </p>
            <ul className="text-sm text-muted-foreground space-y-1 ml-4">
              <li>• Ads are provided by Google AdMob and other advertising partners</li>
              <li>• Ads help us maintain and improve the free service</li>
              <li>• All ads are family-safe and appropriate for our user base</li>
              <li>• You may interact with ads at your own discretion</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">6. Service Availability</h2>
            <p className="text-sm text-muted-foreground">
              We strive to provide continuous service, but SafeChat may experience occasional downtime for maintenance, updates, or technical issues. We do not guarantee 100% uptime.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">7. Limitation of Liability</h2>
            <p className="text-sm text-muted-foreground">
              SafeChat is provided "as is" without warranties. We are not liable for any damages arising from the use or inability to use the app, including but not limited to data loss or service interruptions.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">8. Modifications</h2>
            <p className="text-sm text-muted-foreground">
              We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting. Continued use of the app constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">9. Termination</h2>
            <p className="text-sm text-muted-foreground">
              We reserve the right to terminate or restrict access to SafeChat for users who violate these terms or engage in inappropriate behavior.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-semibold">10. Contact Information</h2>
            <p className="text-sm text-muted-foreground">
              For questions about these Terms of Service, please contact us at: <strong>safechat@socilet.com</strong>
            </p>
          </section>

          <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mt-6">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-primary mb-2">Family-Friendly Service</p>
                <p className="text-sm text-muted-foreground">
                  SafeChat is committed to providing a safe, educational, and entertaining AI chat experience for users and families.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
