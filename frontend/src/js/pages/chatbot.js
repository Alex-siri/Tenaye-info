if (!isLoggedIn()) {
    window.location.href = 'register.html';
}

const chatWindow = document.getElementById('chat-window');
const form = document.getElementById('chat-form');
const input = document.getElementById('message-input');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    chatWindow.appendChild(renderChatBubble('user', message));
    chatWindow.scrollTop = chatWindow.scrollHeight;
    input.value = '';

    const typingBubble = renderChatBubble('assistant', '', true);
    chatWindow.appendChild(typingBubble);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    try {
        const data = await sendChatMessage(message);
        typingBubble.remove();
        chatWindow.appendChild(renderChatBubble('assistant', data.reply));
    } catch (error) {
        typingBubble.remove();
        chatWindow.appendChild(renderChatBubble('assistant', `Error: ${error.message}`));
    }

    chatWindow.scrollTop = chatWindow.scrollHeight;
});