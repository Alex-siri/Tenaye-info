// Reusable Shared Footer Component
function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'bg-slate-900 text-slate-300 py-10 mt-16 border-t border-slate-800';

  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Brand Info -->
        <div>
          <div class="flex items-center space-x-2 font-bold text-xl text-white mb-3">
            <span>💊</span>
            <span>Tenaye <span class="text-emerald-400">Info</span></span>
          </div>
          <p class="text-sm text-slate-400 leading-relaxed" data-i18n="footer.tagline">
            Safe Medicine Knowledge & Healthcare Assistance for Every Ethiopian in Amharic & English.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold text-base mb-3" data-i18n="footer.quickLinks">Quick Links</h3>
          <ul class="space-y-2 text-sm">
            <li><a href="/pages/index.html" data-i18n="nav.home" class="hover:text-emerald-400 transition-colors">Home</a></li>
            <li><a href="/pages/medicine-search.html" data-i18n="nav.search" class="hover:text-emerald-400 transition-colors">Medicine Search</a></li>
            <li><a href="/pages/pharmacy-locator.html" data-i18n="nav.pharmacy" class="hover:text-emerald-400 transition-colors">Pharmacy Locator</a></li>
            <li><a href="/pages/chatbot.html" data-i18n="nav.chatbot" class="hover:text-emerald-400 transition-colors">Tenaye AI Chatbot</a></li>
          </ul>
        </div>

        <!-- Medical Disclaimer -->
        <div class="bg-slate-800/80 p-4 rounded-xl border border-amber-500/30">
          <div class="flex items-center space-x-2 text-amber-400 font-semibold text-sm mb-2">
            <span>⚠️</span>
            <span data-i18n="footer.disclaimerTitle">Medical Disclaimer</span>
          </div>
          <p class="text-xs text-slate-300 leading-relaxed" data-i18n="footer.disclaimerText">
            Tenaye Info provides educational medicine information only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider or pharmacist before taking, stopping, or changing any medication.
          </p>
        </div>
      </div>

      <div class="border-t border-slate-800 pt-6 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500">
        <p>&copy; ${new Date().getFullYear()} Tenaye Info Team. All rights reserved.</p>
        <p class="mt-2 md:mt-0">Built for Ethiopian Healthcare Accessibility</p>
      </div>
    </div>
  `;

  return footer;
}
