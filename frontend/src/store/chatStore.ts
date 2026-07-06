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
    
    // Add user message optimistically
    const userMessage: Message = { role: 'user', content: text };
    set({ messages: [...messages, userMessage], isTyping: true, error: null });

    try {
      if (!sessionId) {
        // Create new session
        const { data } = await api.post('/chat', { message: text });
        set({ 
          sessionId: data.session._id,
          messages: data.session.messages, // Contains both user and AI message
          isTyping: false 
        });
      } else {
        // Append to existing session
        const { data } = await api.post(`/chat/${sessionId}/message`, { message: text });
        set((state) => ({
          messages: [...state.messages, data.aiMessage],
          isTyping: false
        }));
      }
    } catch (error: any) {
      set({ 
        error: error.response?.data?.message || 'Failed to send message',
        isTyping: false 
      });
    }
  },

  clearChat: () => set({ messages: [], sessionId: null, error: null }),
}));

