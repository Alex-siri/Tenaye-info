// Reusable Shared Footer Component
function renderFooter() {
  const footer = document.createElement('footer');
  footer.className = 'bg-navy-950 text-white py-10 mt-16 border-t border-navy-900 shadow-inner';

  footer.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <!-- Brand Info -->
        <div>
          <div class="flex items-center space-x-2 font-bold text-xl text-white mb-3">
            <span>💊</span>
            <span>Tenaye <span class="text-gold-500">Info</span></span>
          </div>
          <p class="text-base text-white font-medium leading-relaxed" data-i18n="footer.tagline">
            Safe Medicine Knowledge & Healthcare Assistance for Every Ethiopian in Amharic & English.
          </p>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-white font-semibold text-base mb-3" data-i18n="footer.quickLinks">Quick Links</h3>
          <ul class="space-y-3 text-base font-medium">
            <li><a href="/pages/index.html" data-i18n="nav.home" class="hover:text-gold-400 transition-colors">Home</a></li>
            <li><a href="/pages/medicine-search.html" data-i18n="nav.search" class="hover:text-gold-500 transition-colors">Medicine Search</a></li>
            <li><a href="/pages/pharmacy-locator.html" data-i18n="nav.pharmacy" class="hover:text-gold-500 transition-colors">Pharmacy Locator</a></li>
            
          </ul>
        </div>

        <!-- Medical Disclaimer -->
        <div class="bg-black/20 p-5 rounded-xl border border-gold-500/40">
          <div class="flex items-center space-x-2 text-gold-400 font-bold text-base mb-2">
            <span>⚠️</span>
            <span data-i18n="footer.disclaimerTitle">Medical Disclaimer</span>
          </div>
          <p class="text-sm text-white font-medium leading-relaxed tracking-wide" data-i18n="footer.disclaimerText">
            Tenaye Info provides educational medicine information only. It is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider or pharmacist before taking, stopping, or changing any medication.
          </p>
        </div>
      </div>

      <div class="border-t border-navy-900 pt-6 flex flex-col md:flex-row items-center justify-between text-sm text-white font-medium">
        <p>&copy; ${new Date().getFullYear()} Tenaye Info Team. All rights reserved.</p>
        <p class="mt-2 md:mt-0">Built for Ethiopian Healthcare Accessibility</p>
      </div>
    </div>
  `;

  return footer;
}
