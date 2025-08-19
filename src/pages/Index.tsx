
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Menu, Info, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import TypingIndicator from '@/components/TypingIndicator';
import SafetyBanner from '@/components/SafetyBanner';
import AdBanner from '@/components/AdBanner';
import { GeminiService, type ChatMessage as ChatMessageType } from '@/services/geminiService';
import { toast } from 'sonner';

const Index = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const geminiService = new GeminiService('AIzaSyAMGQW1CKHmdulvw2Gj9NTirg-as5d8Mrc');

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Show interstitial ad every 5-7 messages
  useEffect(() => {
    if (messageCount > 0 && messageCount % 6 === 0) {
      console.log('Showing Interstitial Ad: ca-app-pub-2211398170597117/3696298239');
      toast.info('Ad break - Thank you for using SafeChat! 🙂');
    }
  }, [messageCount]);

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    // Hide welcome screen
    setShowWelcome(false);

    // Add user message
    const newUserMessage: ChatMessageType = {
      id: Date.now().toString(),
      message: userMessage,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newUserMessage]);
    setIsTyping(true);
    setMessageCount(prev => prev + 1);

    try {
      // Get AI response
      const aiResponse = await geminiService.sendMessage(userMessage);
      
      const newAiMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        message: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, newAiMessage]);
      setMessageCount(prev => prev + 1);
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Sorry, something went wrong. Please try again!');
      
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        message: "Sorry, there was a technical issue. Please try again later! 🙂",
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    setMessages([]);
    setShowWelcome(true);
    setMessageCount(0);
    
    // Show interstitial ad when starting new chat
    console.log('New Chat - Showing Interstitial Ad: ca-app-pub-2211398170597117/3696298239');
    toast.info('Starting fresh conversation! 🙂');
  };

  const WelcomeScreen = () => (
    <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <div className="bg-gradient-primary w-20 h-20 rounded-full flex items-center justify-center mb-6">
        <MessageSquare className="w-10 h-10 text-white" />
      </div>
      
      <h1 className="text-display mb-4 bg-gradient-primary bg-clip-text text-transparent">
        SafeChat Assistant
      </h1>
      
      <p className="text-body text-muted-foreground mb-6 max-w-md leading-relaxed">
        Your safe and friendly AI companion. Ask questions in Hindi or English - I'm here to help! 🙂
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
        <Button 
          variant="outline" 
          className="text-left justify-start h-auto p-4"
          onClick={() => handleSendMessage("Hello! How are you?")}
        >
          <div>
            <div className="font-medium text-sm">Say Hello</div>
            <div className="text-xs text-muted-foreground">Start a conversation</div>
          </div>
        </Button>
        
        <Button 
          variant="outline" 
          className="text-left justify-start h-auto p-4"
          onClick={() => handleSendMessage("Aap kaise help kar sakte hain?")}
        >
          <div>
            <div className="font-medium text-sm">हिंदी में पूछें</div>
            <div className="text-xs text-muted-foreground">Ask in Hindi</div>
          </div>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-chat flex flex-col">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-10">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-primary w-10 h-10 rounded-full flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-title">SafeChat</h2>
              <p className="text-caption">Family-friendly AI</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="sm" onClick={handleNewChat}>
              New Chat
            </Button>
            <Button variant="ghost" size="sm">
              <Menu className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Safety Banner */}
      {showWelcome && <SafetyBanner />}

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 pb-0">
          {showWelcome ? (
            <WelcomeScreen />
          ) : (
            <>
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message.message}
                  isUser={message.isUser}
                  timestamp={message.timestamp}
                />
              ))}
              
              {isTyping && <TypingIndicator />}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>
      </div>

      {/* Ad Banner */}
      <div className="p-4 pt-2">
        <AdBanner />
      </div>

      {/* Chat Input */}
      <ChatInput 
        onSendMessage={handleSendMessage}
        disabled={isTyping}
      />

      {/* Safety Footer */}
      <div className="bg-muted/30 border-t border-border p-2">
        <div className="flex items-center justify-center gap-2 text-caption text-muted-foreground">
          <Shield className="w-3 h-3" />
          <span>Safe AI • Family-Friendly • Privacy Protected</span>
        </div>
      </div>
    </div>
  );
};

export default Index;
