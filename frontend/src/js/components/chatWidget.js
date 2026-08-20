function renderChatWidget() {
  const container = document.createElement('div');
  container.id = 'chat-widget-container';

  container.innerHTML = `
    <!-- Floating Button with Pulse Effect -->
    <div class="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      
      <!-- Welcome Tooltip Bubble -->
      <div id="chat-tooltip" class="relative flex items-center gap-2 bg-white px-4 py-2.5 rounded-2xl shadow-xl border border-slate-100 animate-bounce cursor-pointer transition-opacity duration-300 mr-2" onclick="document.getElementById('chat-toggle-btn').click()">
        <svg class="w-6 h-6 text-gold-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        <div class="flex flex-col">
          <span class="text-xs font-extrabold text-navy-900 leading-none mb-1">Tenaye AI Chatbot</span>
          <span class="text-[11px] font-medium text-slate-500 leading-none">Tap to ask a medical question!</span>
        </div>
        <!-- Triangle pointing down -->
        <div class="absolute -bottom-1.5 right-6 w-3 h-3 bg-white border-b border-r border-slate-100 rotate-45"></div>
      </div>

      <div class="relative flex items-center justify-center">
        <div class="absolute w-16 h-16 bg-gold-400 rounded-full animate-ping opacity-20"></div>
        <button id="chat-toggle-btn" class="relative bg-gold-500 hover:bg-gold-400 text-navy-950 rounded-full w-14 h-14 shadow-2xl flex items-center justify-center z-50 transition-transform transform hover:scale-105 border-2 border-white/20">
          <svg class="w-7 h-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
        </button>
      </div>
    </div>

    <!-- Chat Panel -->
    <div id="chat-panel" class="fixed bottom-24 right-6 w-[calc(100vw-3rem)] sm:w-[400px] h-[600px] max-h-[calc(100vh-8rem)] bg-slate-50 shadow-2xl rounded-2xl transform scale-0 opacity-0 origin-bottom-right z-[60] flex flex-col border border-slate-200 overflow-hidden">
      
      <!-- Header -->
      <div class="flex items-center justify-between p-5 bg-navy-900 text-white shadow-md relative overflow-hidden shrink-0">
        <div class="absolute -right-10 -top-10 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div class="flex items-center gap-3 relative z-10">
          <div class="w-10 h-10 bg-gradient-to-br from-gold-400 to-gold-600 rounded-xl flex items-center justify-center shadow-lg border border-gold-300/30">
            <svg class="w-6 h-6 text-navy-950" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8V4H8"/><rect width="16" height="12" x="4" y="8" rx="2"/><path d="M2 14h2"/><path d="M20 14h2"/><path d="M15 13v2"/><path d="M9 13v2"/></svg>
          </div>
          <div>
            <h2 class="font-bold text-lg tracking-tight leading-tight">Tenaye AI</h2>
          </div>
        </div>
        <button id="chat-close-btn" class="relative z-10 text-slate-400 hover:text-white transition-colors bg-white/10 hover:bg-white/20 rounded-full p-1.5">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>

      <!-- Chat Window -->
      <div id="widget-chat-window" class="flex-1 overflow-y-auto p-5 bg-[#F8FAFC] scroll-smooth flex flex-col gap-2" style="scrollbar-width: thin;"></div>

      <!-- Footer / Input -->
      <div class="p-4 bg-white border-t border-slate-200 shrink-0">
        
        <!-- Suggestion Chips -->
        <div id="widget-suggestion-chips" class="flex gap-2 overflow-x-auto pb-3 mb-1 no-scrollbar" style="scrollbar-width: none;">
          <button class="widget-chip shrink-0 px-3 py-1.5 bg-slate-100 hover:bg-gold-50 text-slate-600 hover:text-gold-700 text-xs font-semibold rounded-full border border-slate-200 hover:border-gold-300 transition-colors">What is paracetamol?</button>
          <button class="widget-chip shrink-0 px-3 py-1.5 bg-slate-100 hover:bg-gold-50 text-slate-600 hover:text-gold-700 text-xs font-semibold rounded-full border border-slate-200 hover:border-gold-300 transition-colors">Find a pharmacy</button>
          <button class="widget-chip shrink-0 px-3 py-1.5 bg-slate-100 hover:bg-gold-50 text-slate-600 hover:text-gold-700 text-xs font-semibold rounded-full border border-slate-200 hover:border-gold-300 transition-colors">Pregnancy safe meds</button>
        </div>

        <form id="widget-chat-form" class="flex gap-2 bg-slate-50 rounded-3xl p-1.5 border border-slate-200 shadow-sm focus-within:ring-2 focus-within:ring-gold-500/30 focus-within:border-gold-400 transition-all items-center pl-4">
          <input type="text" id="widget-message-input" placeholder="Type your medical question..." class="flex-1 border-0 bg-transparent py-2 text-sm text-slate-800 focus:ring-0 outline-none placeholder-slate-400 font-medium" autocomplete="off" />
          
          <button type="button" id="widget-voice-btn" class="text-slate-400 hover:text-navy-900 p-2 rounded-full transition-colors shrink-0" title="Voice Input">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
            </svg>
          </button>

          <button type="submit" class="bg-navy-900 hover:bg-navy-800 text-white w-9 h-9 rounded-full shadow-sm transition-transform transform hover:scale-105 active:scale-95 flex items-center justify-center shrink-0">
             <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-4 h-4 font-bold">
               <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" />
             </svg>
          </button>
        </form>
      </div>
    </div>
  `;

  return container;
}

function initChatWidget() {
  const toggleBtn = document.getElementById('chat-toggle-btn');
  const panel = document.getElementById('chat-panel');
  const closeBtn = document.getElementById('chat-close-btn');
  const chatWindow = document.getElementById('widget-chat-window');
  const form = document.getElementById('widget-chat-form');
  const input = document.getElementById('widget-message-input');

  // Add transition classes after initial load to prevent flash/animation on page navigation
  setTimeout(() => {
    if (panel) panel.classList.add('transition-all', 'duration-300');
  }, 100);

  const open = () => {
    panel.classList.remove('scale-0', 'opacity-0');
    panel.classList.add('scale-100', 'opacity-100');
    const tooltip = document.getElementById('chat-tooltip');
    if (tooltip) tooltip.classList.add('opacity-0', 'pointer-events-none');
  };
  const close = () => {
    panel.classList.remove('scale-100', 'opacity-100');
    panel.classList.add('scale-0', 'opacity-0');
    const tooltip = document.getElementById('chat-tooltip');
    if (tooltip) tooltip.classList.remove('opacity-0', 'pointer-events-none');
  };

  toggleBtn.addEventListener('click', () => {
    if (typeof isLoggedIn === 'function' && !isLoggedIn()) {
      window.location.href = 'register.html';
      return;
    }
    open();
  });
  closeBtn.addEventListener('click', close);

  // Restore saved conversation for this session
  let saved = JSON.parse(sessionStorage.getItem('chatWidgetHistory') || '[]');
  
  // Proactive Introduction
  if (saved.length === 0) {
    const introMsg = "Hello! 👋 I am Tenaye AI, your medical information assistant. How can I help you today?";
    saved = [{ role: 'assistant', message: introMsg }];
    sessionStorage.setItem('chatWidgetHistory', JSON.stringify(saved));
  }

  saved.forEach(({ role, message }) => {
    chatWindow.appendChild(renderChatBubble(role, message));
  });
  chatWindow.scrollTop = chatWindow.scrollHeight;

  const saveToSession = (role, message) => {
    try {
      const history = JSON.parse(sessionStorage.getItem('chatWidgetHistory') || '[]');
      history.push({ role, message });
      sessionStorage.setItem('chatWidgetHistory', JSON.stringify(history));
    } catch (e) {
      console.error("Session storage error:", e);
      sessionStorage.removeItem('chatWidgetHistory');
    }
  };

  const chipsContainer = document.getElementById('widget-suggestion-chips');
  const chips = document.querySelectorAll('.widget-chip');
  if (saved.length > 1 && chipsContainer) {
      chipsContainer.style.display = 'none'; // Hide chips if there's already history
  }

  chips.forEach(chip => {
      chip.addEventListener('click', () => {
          input.value = chip.textContent;
          if (chipsContainer) chipsContainer.style.display = 'none';
          form.dispatchEvent(new Event('submit', { cancelable: true }));
      });
  });

  // Voice Recognition Logic
  const voiceBtn = document.getElementById('widget-voice-btn');
  if (voiceBtn) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onstart = function() {
        voiceBtn.classList.add('text-red-500', 'animate-pulse');
        voiceBtn.classList.remove('text-slate-400', 'hover:text-navy-900');
        input.placeholder = "Listening...";
      };

      recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        input.value = transcript;
        setTimeout(() => form.dispatchEvent(new Event('submit', { cancelable: true })), 300);
      };

      recognition.onerror = function(event) {
        console.error("Speech recognition error", event.error);
        input.placeholder = "Type your medical question...";
      };

      recognition.onend = function() {
        voiceBtn.classList.remove('text-red-500', 'animate-pulse');
        voiceBtn.classList.add('text-slate-400', 'hover:text-navy-900');
        input.placeholder = "Type your medical question...";
      };

      voiceBtn.addEventListener('click', () => {
        try {
          recognition.start();
        } catch (e) {
          recognition.stop();
        }
      });
    } else {
      voiceBtn.addEventListener('click', () => {
        alert("Voice recognition is not supported in this browser.");
      });
    }
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (!message) return;

    if (chipsContainer) chipsContainer.style.display = 'none';

    chatWindow.appendChild(renderChatBubble('user', message));
    saveToSession('user', message);
    chatWindow.scrollTop = chatWindow.scrollHeight;
    input.value = '';

    let typingBubble;
    try {
      typingBubble = renderChatBubble('assistant', '', true);
      chatWindow.appendChild(typingBubble);
      chatWindow.scrollTop = chatWindow.scrollHeight;

      const data = await sendChatMessage(message);
      typingBubble.remove();
      chatWindow.appendChild(renderChatBubble('assistant', data.reply));
      saveToSession('assistant', data.reply);
    } catch (error) {
      if (typingBubble) typingBubble.remove();
      chatWindow.appendChild(renderChatBubble('assistant', `Error: ${error.message || 'An unexpected error occurred'}`));
    }
    chatWindow.scrollTop = chatWindow.scrollHeight;
  });
}
