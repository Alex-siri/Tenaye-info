function renderChatBubble(role, message, isTyping = false) {
    const wrapper = document.createElement('div');
    wrapper.className = role === 'user' ? 'flex justify-end mb-4 opacity-0 transition-opacity duration-300' : 'flex justify-start mb-4 opacity-0 transition-opacity duration-300';

    const bubble = document.createElement('div');

    if (isTyping) {
        bubble.className = 'py-2 px-3 max-w-xs md:max-w-md flex items-center justify-center';
        bubble.innerHTML = `
            <div class="flex space-x-1.5 items-center justify-center h-5">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: -0.3s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: -0.15s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
        `;
    } else {
        if (role === 'user') {
            bubble.className = 'bg-gradient-to-r from-[#172554] to-blue-900 text-white rounded-2xl rounded-tr-sm px-5 py-3 max-w-xs md:max-w-md whitespace-pre-wrap shadow-md text-sm leading-relaxed border border-[#D4AF37]/20';
        } else {
            bubble.className = 'bg-white border border-slate-100 text-slate-800 rounded-2xl rounded-tl-sm px-5 py-3 max-w-xs md:max-w-md whitespace-pre-wrap shadow-sm text-sm leading-relaxed';
        }
        // Just setting text content for safety, can be upgraded to markdown parsing if needed
        bubble.textContent = message;
    }

    wrapper.appendChild(bubble);

    // Trigger fade in animation
    requestAnimationFrame(() => {
        wrapper.classList.remove('opacity-0');
        wrapper.classList.add('opacity-100');
    });

    return wrapper;
}