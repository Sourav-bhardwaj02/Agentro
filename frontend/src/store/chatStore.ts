import { create } from 'zustand';
import api from '../api/axios';

export interface Message {
  _id?: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string;
}

interface ChatState {
  messages: Message[];
  sessionId: string | null;
  isTyping: boolean;
  error: string | null;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
}

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  sessionId: null,
  isTyping: false,
  error: null,

  sendMessage: async (text: string) => {
    const { sessionId, messages } = get();
    
    // Add user message optimistically, and an empty assistant message
    const userMessage: Message = { role: 'user', content: text };
    const initialAiMessage: Message = { role: 'assistant', content: '' };
    
    set({ 
      messages: [...messages, userMessage, initialAiMessage], 
      isTyping: true, 
      error: null 
    });

    try {
      const token = localStorage.getItem('token');
      const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const endpoint = sessionId ? `/chat/${sessionId}/message` : '/chat';
      
      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ message: text })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();

      if (reader) {
        let done = false;
        let buffer = '';
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          
          if (value) {
            buffer += decoder.decode(value, { stream: true });
            
            const parts = buffer.split('\n\n');
            buffer = parts.pop() || '';
            
            for (const part of parts) {
              if (part.startsWith('data: ')) {
                const dataStr = part.replace('data: ', '').trim();
                if (!dataStr) continue;
                
                try {
                  const data = JSON.parse(dataStr);
                  if (data.error) {
                     set({ error: data.error });
                  } else if (data.text) {
                     set((state) => {
                       const newMessages = [...state.messages];
                       newMessages[newMessages.length - 1].content += data.text;
                       return { messages: newMessages };
                     });
                  } else if (data.done) {
                     if (data.session) {
                       set({ sessionId: data.session._id });
                     }
                  }
                } catch (e) {
                  console.error('Failed to parse SSE JSON', e);
                }
              }
            }
          }
        }
      }
      set({ isTyping: false });
      
    } catch (error: any) {
      set({ 
        error: error.message || 'Failed to send message',
        isTyping: false 
      });
      // Remove the empty assistant message on error
      set((state) => ({ messages: state.messages.slice(0, -1) }));
    }
  },

  clearChat: () => set({ messages: [], sessionId: null, error: null }),
}));

