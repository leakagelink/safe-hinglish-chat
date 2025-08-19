
import React from 'react';
import { X, Shield, Info, ExternalLink, FileText, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsDialog: React.FC<SettingsDialogProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrivacyPolicy = () => {
    // Navigate to privacy page within the app
    window.location.href = '/privacy';
  };

  const handleTermsOfService = () => {
    // For now, redirect to privacy (you can create separate terms page later)
    window.location.href = '/privacy';
  };

  const handleSupport = () => {
    window.open('mailto:safechat@socilet.com?subject=SafeChat Support', '_blank');
  };

  const handleRateApp = () => {
    // Play Store link for rating
    window.open('https://play.google.com/store/apps/details?id=com.safechat.app', '_blank');
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Settings</h2>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Content */}
          <div className="p-4 space-y-4">
            {/* App Info */}
            <div className="space-y-2">
              <h3 className="font-medium text-sm text-muted-foreground">APP INFO</h3>
              
              <div className="space-y-1">
                <p className="text-sm font-medium">SafeChat Assistant</p>
                <p className="text-xs text-muted-foreground">Version 1.0.0</p>
                <p className="text-xs text-muted-foreground">100% Free Family-friendly AI Chat</p>
              </div>
            </div>

            {/* Safety & Privacy */}
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-muted-foreground">SAFETY & PRIVACY</h3>
              
              <div className="bg-muted/30 p-3 rounded-lg">
                <div className="flex items-start gap-3">
                  <Shield className="w-4 h-4 text-safe-green mt-0.5" />
                  <div className="text-xs text-muted-foreground">
                    <p className="font-medium mb-1">🔒 Your Privacy is Protected</p>
                    <p>• No personal data is collected or stored</p>
                    <p>• Chat history stays on your device only</p>
                    <p>• No login or registration required</p>
                    <p>• Family-safe AI responses guaranteed</p>
                    <p>• Completely free - no premium features</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal Links */}
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-muted-foreground">LEGAL</h3>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start h-auto p-3"
                onClick={handlePrivacyPolicy}
              >
                <FileText className="w-4 h-4 mr-3" />
                <div className="text-left">
                  <div className="text-sm font-medium">Privacy Policy</div>
                  <div className="text-xs text-muted-foreground">How we protect your privacy</div>
                </div>
              </Button>

              <Button 
                variant="ghost" 
                className="w-full justify-start h-auto p-3"
                onClick={handleTermsOfService}
              >
                <Info className="w-4 h-4 mr-3" />
                <div className="text-left">
                  <div className="text-sm font-medium">Terms of Service</div>
                  <div className="text-xs text-muted-foreground">App usage guidelines</div>
                </div>
              </Button>
            </div>

            {/* Support */}
            <div className="space-y-3">
              <h3 className="font-medium text-sm text-muted-foreground">SUPPORT</h3>
              
              <Button 
                variant="ghost" 
                className="w-full justify-start h-auto p-3"
                onClick={handleSupport}
              >
                <HelpCircle className="w-4 h-4 mr-3" />
                <div className="text-left">
                  <div className="text-sm font-medium">Contact Support</div>
                  <div className="text-xs text-muted-foreground">safechat@socilet.com</div>
                </div>
                <ExternalLink className="w-3 h-3 ml-auto" />
              </Button>

              <Button 
                variant="outline" 
                className="w-full"
                onClick={handleRateApp}
              >
                ⭐ Rate SafeChat on Play Store
              </Button>
            </div>

            {/* AdMob Notice */}
            <div className="bg-muted/20 p-3 rounded-lg">
              <div className="text-xs text-muted-foreground">
                <p className="font-medium mb-1">📱 About Ads</p>
                <p>This free app is supported by ads. Ads help keep SafeChat completely free for everyone while maintaining our high safety standards.</p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Made with ❤️ for safe family conversations
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsDialog;
