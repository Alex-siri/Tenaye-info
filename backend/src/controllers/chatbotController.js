const { askChatbot } = require('../services/chatbotService');
const ChatHistory = require('../models/ChatHistory');

const sendMessage = async (req, res) => {
    try {
        const { message } = req.body;

        if (!message) {
            return res.status(400).json({ message: 'A message is required' });
        }

        // Check if the AI has ever successfully replied to this user
        const assistantMessageCount = await ChatHistory.countDocuments({ userId: req.userId, role: 'assistant' });
        const isFirstMessage = assistantMessageCount === 0;

        const userMsg = new ChatHistory({ userId: req.userId, role: 'user', message });
        await userMsg.save();

        const reply = await askChatbot(message, isFirstMessage);

        const aiMsg = new ChatHistory({ userId: req.userId, role: 'assistant', message: reply });
        await aiMsg.save();

        res.status(200).json({ reply });
    } catch (error) {
        console.error("Chatbot Error:", error);
        let errorMsg = 'Chatbot request failed';
        
        if (error.message.includes('404')) {
             errorMsg = 'API Key or Model Error: The Gemini API key may be invalid or the requested model is not available for this key. Please double check your key in Google AI Studio.';
        } else {
             errorMsg = error.message;
        }

        res.status(500).json({ message: 'Chatbot request failed', error: errorMsg });
    }
};

module.exports = { sendMessage };