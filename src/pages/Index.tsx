import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Menu, Info, Shield, History, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import TypingIndicator from '@/components/TypingIndicator';
import SafetyBanner from '@/components/SafetyBanner';
import AdBanner from '@/components/AdBanner';
import SessionSidebar from '@/components/SessionSidebar';
import SettingsDialog from '@/components/SettingsDialog';
import { GeminiService, type ChatMessage as ChatMessageType } from '@/services/geminiService';
import { SessionService, type ChatSession } from '@/services/sessionService';
import { toast } from 'sonner';

const Index = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [messageCount, setMessageCount] = useState(0);
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [currentSessionId, setCurrentSessionId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const geminiService = new GeminiService('AIzaSyAMGQW1CKHmdulvw2Gj9NTirg-as5d8Mrc');
  const sessionService = new SessionService();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Load sessions on component mount
  useEffect(() => {
    const loadedSessions = sessionService.getAllSessions();
    setSessions(loadedSessions);
    
    const currentId = sessionService.getCurrentSessionId();
    if (currentId) {
      const currentSession = sessionService.getSession(currentId);
      if (currentSession) {
        loadSession(currentSession);
      }
    }
  }, []);

  // Show interstitial ad every 5-7 messages
  useEffect(() => {
    if (messageCount > 0 && messageCount % 6 === 0) {
      console.log('Showing Interstitial Ad: ca-app-pub-2211398170597117/3696298239');
      toast.info('Ad break - Thank you for using SafeChat! 🙂');
    }
  }, [messageCount]);

  const loadSession = (session: ChatSession) => {
    setMessages(session.messages);
    setCurrentSessionId(session.id);
    setShowWelcome(session.messages.length === 0);
    setMessageCount(session.messages.length);
  };

  const saveCurrentSession = () => {
    if (currentSessionId && messages.length > 0) {
      const session: ChatSession = {
        id: currentSessionId,
        title: sessions.find(s => s.id === currentSessionId)?.title || 'New Chat',
        messages,
        createdAt: sessions.find(s => s.id === currentSessionId)?.createdAt || new Date(),
        updatedAt: new Date()
      };
      
      sessionService.saveSession(session);
      
      // Update title if it's the first message
      if (messages.length === 1 && messages[0].isUser) {
        sessionService.updateSessionTitle(currentSessionId, messages[0].message);
      }
      
      // Refresh sessions list
      setSessions(sessionService.getAllSessions());
    }
  };

  const handleSendMessage = async (userMessage: string) => {
    if (!userMessage.trim()) return;

    // Create new session if none exists
    if (!currentSessionId) {
      const newSession = sessionService.createSession();
      setCurrentSessionId(newSession.id);
      setSessions(sessionService.getAllSessions());
    }

    // Hide welcome screen
    setShowWelcome(false);

    // Add user message
    const newUserMessage: ChatMessageType = {
      id: Date.now().toString(),
      message: userMessage,
      isUser: true,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, newUserMessage];
    setMessages(updatedMessages);
    setIsTyping(true);
    setMessageCount(prev => prev + 1);

    try {
      console.log('Sending message to Gemini API:', userMessage);
      
      // Get AI response
      const aiResponse = await geminiService.sendMessage(userMessage);
      
      console.log('Received response from Gemini API:', aiResponse);
      
      const newAiMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        message: aiResponse,
        isUser: false,
        timestamp: new Date(),
      };

      const finalMessages = [...updatedMessages, newAiMessage];
      setMessages(finalMessages);
      setMessageCount(prev => prev + 1);
      
      // Save session after successful response
      setTimeout(saveCurrentSession, 100);
      
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Sorry, something went wrong. Please try again!');
      
      const errorMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        message: "Sorry, there was a technical issue. Please try again later! 🙂",
        isUser: false,
        timestamp: new Date(),
      };
      
      const finalMessages = [...updatedMessages, errorMessage];
      setMessages(finalMessages);
      
      // Save session even with error
      setTimeout(saveCurrentSession, 100);
      
    } finally {
      setIsTyping(false);
    }
  };

  const handleNewChat = () => {
    // Save current session first
    saveCurrentSession();
    
    // Create new session
    const newSession = sessionService.createSession();
    setCurrentSessionId(newSession.id);
    setMessages([]);
    setShowWelcome(true);
    setMessageCount(0);
    setSessions(sessionService.getAllSessions());
    setSidebarOpen(false);
    
    // Show interstitial ad when starting new chat
    console.log('New Chat - Showing Interstitial Ad: ca-app-pub-2211398170597117/3696298239');
    toast.info('Starting fresh conversation! 🙂');
  };

  const handleSessionSelect = (sessionId: string) => {
    // Save current session first
    saveCurrentSession();
    
    const session = sessionService.getSession(sessionId);
    if (session) {
      loadSession(session);
    }
    setSidebarOpen(false);
  };

  const handleDeleteSession = (sessionId: string) => {
    sessionService.deleteSession(sessionId);
    const updatedSessions = sessionService.getAllSessions();
    setSessions(updatedSessions);
    
    if (sessionId === currentSessionId) {
      // If deleting current session, start a new one
      handleNewChat();
    }
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
    <div className="min-h-screen bg-gradient-chat flex">
      {/* Session Sidebar */}
      <SessionSidebar
        sessions={sessions}
        currentSessionId={currentSessionId}
        onSessionSelect={handleSessionSelect}
        onNewSession={handleNewChat}
        onDeleteSession={handleDeleteSession}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-10">
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setSidebarOpen(true)}
                className="hover:bg-muted"
              >
                <History className="w-4 h-4" />
              </Button>
              
              <div className="bg-gradient-primary w-10 h-10 rounded-full flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-title">SafeChat</h2>
                <p className="text-caption">Family-friendly AI</p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleNewChat}
                className="hover:bg-muted"
              >
                New Chat
              </Button>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setSettingsOpen(true)}
                className="hover:bg-muted"
              >
                <Settings className="w-4 h-4" />
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

      {/* Settings Dialog */}
      <SettingsDialog 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </div>
  );
};

export default Index;
