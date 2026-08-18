async function sendChatMessage(message) {
    return apiRequest('/chatbot/message', {
        method: 'POST',
        body: JSON.stringify({ message }),
    });
}