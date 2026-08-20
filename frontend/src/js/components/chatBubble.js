function renderChatBubble(role, message, isTyping = false) {
    const wrapper = document.createElement('div');
    wrapper.className = role === 'user' ? 'flex justify-end mb-2 opacity-0 transition-opacity duration-300' : 'flex justify-start mb-2 opacity-0 transition-opacity duration-300';

    const contentContainer = document.createElement('div');
    contentContainer.className = 'flex flex-col max-w-[85%] md:max-w-[75%]';

    if (role === 'assistant') {
        const label = document.createElement('div');
        label.className = 'flex items-center gap-1.5 mb-1 ml-1';
        label.innerHTML = `
            <div class="w-5 h-5 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-sm">
                <svg class="w-3 h-3 text-navy-950" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
            </div>
        `;
        contentContainer.appendChild(label);
    }

    const bubble = document.createElement('div');

    if (isTyping) {
        bubble.className = 'py-3 px-4 flex items-center justify-center bg-slate-100 rounded-2xl rounded-tl-sm shadow-sm self-start';
        bubble.innerHTML = `
            <div class="flex space-x-1 items-center justify-center h-4 px-1">
                <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" style="animation-duration: 1s;"></div>
                <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" style="animation-duration: 1s; animation-delay: 0.2s;"></div>
                <div class="w-1.5 h-1.5 bg-slate-400 rounded-full animate-pulse" style="animation-duration: 1s; animation-delay: 0.4s;"></div>
            </div>
        `;
    } else {
        if (role === 'user') {
            bubble.className = 'bg-gradient-to-br from-navy-900 to-navy-800 text-white rounded-2xl rounded-tr-sm px-4 py-2.5 whitespace-pre-wrap shadow-md text-[13px] leading-relaxed border border-navy-700 self-end';
        } else {
            bubble.className = 'bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm px-4 py-2.5 whitespace-pre-wrap shadow-sm text-[13px] leading-relaxed self-start prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1';
            
            if (message.startsWith('Error:')) {
                bubble.className += ' !border-red-200 !bg-red-50 !text-red-700';
            }
        }
        // Basic Markdown parsing for bold text
        const formattedMessage = message.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        bubble.innerHTML = formattedMessage;
    }

    contentContainer.appendChild(bubble);
    wrapper.appendChild(contentContainer);

    // Trigger fade in animation
    requestAnimationFrame(() => {
        wrapper.classList.remove('opacity-0');
        wrapper.classList.add('opacity-100');
    });

    return wrapper;
}