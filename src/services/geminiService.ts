export interface ChatMessage {
  id: string;
  message: string;
  isUser: boolean;
  timestamp: Date;
}

export class GeminiService {
  private apiKey: string;
  private apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
  
  // Safety instructions for family-friendly responses
  private safetyInstructions = `
    You are SafeChat Assistant, a family-friendly AI that:
    1. NEVER discusses adult, sexual, romantic, dating or explicit content
    2. NEVER provides illegal, violent or harmful information  
    3. Always responds in a helpful, simple and friendly tone
    4. Supports both English and Hindi (Hinglish) conversations
    5. Keeps responses short and mobile-friendly
    6. If asked unsafe questions, politely say: "Sorry, I cannot help with that. Please ask something else 🙂"
    
    Always maintain a safe, educational and positive conversation environment.
  `;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async sendMessage(userMessage: string): Promise<string> {
    try {
      // Check for unsafe content patterns
      if (this.containsUnsafeContent(userMessage)) {
        return "Sorry, I cannot help with that. Please ask something else 🙂";
      }

      const response = await fetch(`${this.apiUrl}?key=${this.apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${this.safetyInstructions}\n\nUser message: ${userMessage}`
            }]
          }],
          safetySettings: [
            {
              category: "HARM_CATEGORY_HARASSMENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_HATE_SPEECH", 
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
              threshold: "BLOCK_LOW_AND_ABOVE"
            },
            {
              category: "HARM_CATEGORY_DANGEROUS_CONTENT",
              threshold: "BLOCK_MEDIUM_AND_ABOVE"
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 200,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts?.[0]?.text) {
        const aiResponse = data.candidates[0].content.parts[0].text;
        
        // Double-check AI response for safety
        if (this.containsUnsafeContent(aiResponse)) {
          return "Sorry, I cannot help with that. Please ask something else 🙂";
        }
        
        return aiResponse;
      } else {
        return "Sorry, I cannot help with that. Please ask something else 🙂";
      }

    } catch (error) {
      console.error('Gemini API error:', error);
      return "Sorry, there was a technical issue. Please try again later! 🙂";
    }
  }

  private containsUnsafeContent(text: string): boolean {
    const unsafePatterns = [
      // Adult/Sexual content
      /\b(sex|adult|porn|nude|xxx|erotic|sexual|dating|romance|love|girlfriend|boyfriend)\b/i,
      // Violence/Illegal 
      /\b(kill|murder|weapon|drug|illegal|hack|steal|bomb|violence)\b/i,
      // Other inappropriate
      /\b(suicide|self-harm|hate|discrimination)\b/i
    ];

    return unsafePatterns.some(pattern => pattern.test(text));
  }
}
