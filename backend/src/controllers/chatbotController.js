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

        await ChatHistory.create({ userId: req.userId, role: 'user', message });

        const reply = await askChatbot(message, isFirstMessage);

        await ChatHistory.create({ userId: req.userId, role: 'assistant', message: reply });

        res.status(200).json({ reply });
    } catch (error) {
        res.status(500).json({ message: 'Chatbot request failed', error: error.message });
    }
};

module.exports = { sendMessage };