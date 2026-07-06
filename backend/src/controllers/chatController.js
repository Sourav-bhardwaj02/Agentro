const ChatSession = require('../models/ChatSession');
const axios = require('axios');

// Build the system prompt for IBM Granite
const SYSTEM_PROMPT = `You are Agentro, an expert college admissions advisor. 
You help students with college applications, scholarship searches, personal statement feedback, 
interview preparation, and understanding admission requirements. 
Be concise, helpful, and encouraging. Always provide actionable advice.`;

// Call IBM Granite (or fallback to a simple mock response)
const callAI = async (messages) => {
  // If IBM_GRANITE_API_KEY is set and not a placeholder, use the real API
  const apiKey = process.env.IBM_GRANITE_API_KEY;

  if (!apiKey || apiKey === 'your_ibm_granite_api_key') {
    // Fallback: return a smart mock response for development
    return "I'm Agentro! I'm here to help with your college applications. (Note: Connect your IBM Granite API key in the backend .env file to enable full AI responses.)";
  }

  try {
    // Format messages for IBM Granite chat API
    const formattedPrompt = messages
      .map((m) => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`)
      .join('\n');

    const response = await axios.post(
      process.env.IBM_GRANITE_API_URL,
      {
        model_id: 'ibm/granite-13b-chat-v2',
        input: `${SYSTEM_PROMPT}\n\n${formattedPrompt}\nAssistant:`,
        parameters: {
          decoding_method: 'greedy',
          max_new_tokens: 512,
          stop_sequences: ['User:'],
        },
        project_id: process.env.IBM_PROJECT_ID || '',
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data?.results?.[0]?.generated_text?.trim() || "I couldn't generate a response. Please try again.";
  } catch (error) {
    console.error('AI API Error:', error.response?.data || error.message);
    return "I'm having trouble connecting to my AI engine. Please try again in a moment.";
  }
};

// @desc  Get all chat sessions for user
// @route GET /api/chat
// @access Private
const getSessions = async (req, res, next) => {
  try {
    const sessions = await ChatSession.find({ user: req.user._id })
      .select('title createdAt updatedAt')
      .sort({ updatedAt: -1 });
    res.json({ success: true, sessions });
  } catch (err) {
    next(err);
  }
};

// @desc  Get a single session with messages
// @route GET /api/chat/:id
// @access Private
const getSession = async (req, res, next) => {
  try {
    const session = await ChatSession.findOne({ _id: req.params.id, user: req.user._id });
    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found' });
    }
    res.json({ success: true, session });
  } catch (err) {
    next(err);
  }
};

// @desc  Create a new chat session and send first message
// @route POST /api/chat
// @access Private
const createSession = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const userMessage = { role: 'user', content: message };
    const aiText = await callAI([userMessage]);
    const aiMessage = { role: 'assistant', content: aiText };

    // Generate a title from the first message
    const title = message.length > 50 ? `${message.substring(0, 47)}...` : message;

    const session = await ChatSession.create({
      user: req.user._id,
      title,
      messages: [userMessage, aiMessage],
    });

    res.status(201).json({ success: true, session });
  } catch (err) {
    next(err);
  }
};

// @desc  Send a message to an existing session
// @route POST /api/chat/:id/message
// @access Private
const sendMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ success: false, message: 'Message is required' });
    }

    const session = await ChatSession.findOne({ _id: req.params.id, user: req.user._id });
    if (!session) {
      return res.status(404).json({ success: false, message: 'Session not found' });
    }

    // Add user message
    const userMessage = { role: 'user', content: message };
    session.messages.push(userMessage);

    // Get AI response (pass last 10 messages for context)
    const recentMessages = session.messages.slice(-10);
    const aiText = await callAI(recentMessages);
    const aiMessage = { role: 'assistant', content: aiText };
    session.messages.push(aiMessage);

    await session.save();

    res.json({ success: true, userMessage, aiMessage });
  } catch (err) {
    next(err);
  }
};

// @desc  Delete a session
// @route DELETE /api/chat/:id
// @access Private
const deleteSession = async (req, res, next) => {
  try {
    await ChatSession.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    res.json({ success: true, message: 'Session deleted' });
  } catch (err) {
    next(err);
  }
};

module.exports = { getSessions, getSession, createSession, sendMessage, deleteSession };
