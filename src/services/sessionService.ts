import { ChatMessage } from './geminiService';

export interface ChatSession {
  id: string;
  title: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export class SessionService {
  private readonly STORAGE_KEY = 'safechat_sessions';
  private readonly CURRENT_SESSION_KEY = 'safechat_current_session';

  // Get all saved sessions
  getAllSessions(): ChatSession[] {
    try {
      const stored = localStorage.getItem(this.STORAGE_KEY);
      if (!stored) return [];
      
      const sessions = JSON.parse(stored);
      return sessions.map((session: any) => ({
        ...session,
        createdAt: new Date(session.createdAt),
        updatedAt: new Date(session.updatedAt),
        messages: session.messages.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }))
      }));
    } catch (error) {
      console.error('Error loading sessions:', error);
      return [];
    }
  }

  // Get current session ID
  getCurrentSessionId(): string | null {
    return localStorage.getItem(this.CURRENT_SESSION_KEY);
  }

  // Set current session ID
  setCurrentSessionId(sessionId: string): void {
    localStorage.setItem(this.CURRENT_SESSION_KEY, sessionId);
  }

  // Get session by ID
  getSession(sessionId: string): ChatSession | null {
    const sessions = this.getAllSessions();
    return sessions.find(s => s.id === sessionId) || null;
  }

  // Create new session
  createSession(): ChatSession {
    const newSession: ChatSession = {
      id: Date.now().toString(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.saveSession(newSession);
    this.setCurrentSessionId(newSession.id);
    return newSession;
  }

  // Save session
  saveSession(session: ChatSession): void {
    try {
      const sessions = this.getAllSessions();
      const existingIndex = sessions.findIndex(s => s.id === session.id);
      
      session.updatedAt = new Date();
      
      if (existingIndex >= 0) {
        sessions[existingIndex] = session;
      } else {
        sessions.unshift(session); // Add to beginning
      }

      // Keep only last 50 sessions
      const limitedSessions = sessions.slice(0, 50);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(limitedSessions));
    } catch (error) {
      console.error('Error saving session:', error);
    }
  }

  // Delete session
  deleteSession(sessionId: string): void {
    try {
      const sessions = this.getAllSessions();
      const filtered = sessions.filter(s => s.id !== sessionId);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(filtered));
      
      if (this.getCurrentSessionId() === sessionId) {
        localStorage.removeItem(this.CURRENT_SESSION_KEY);
      }
    } catch (error) {
      console.error('Error deleting session:', error);
    }
  }

  // Generate session title from first message
  updateSessionTitle(sessionId: string, firstMessage: string): void {
    const session = this.getSession(sessionId);
    if (session && session.title === 'New Chat') {
      session.title = firstMessage.slice(0, 30) + (firstMessage.length > 30 ? '...' : '');
      this.saveSession(session);
    }
  }
}
