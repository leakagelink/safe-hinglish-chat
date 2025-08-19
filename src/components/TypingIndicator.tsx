
import React from 'react';
import { Bot } from 'lucide-react';

const TypingIndicator = () => {
  return (
    <div className="flex gap-3 mb-4 message-animation">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-safe-green flex items-center justify-center">
        <Bot className="w-4 h-4 text-white" />
      </div>
      
      <div className="chat-bubble-ai px-4 py-3">
        <div className="flex gap-1 items-center">
          <div className="w-2 h-2 bg-muted-foreground rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full typing-dot"></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full typing-dot"></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;
