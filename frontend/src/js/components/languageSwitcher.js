// Shared Language Switcher Component
function renderLanguageSwitcher() {
  const currentLang = localStorage.getItem('language') || 'en';

  const container = document.createElement('div');
  container.className = 'relative inline-block text-left';

  container.innerHTML = `
    <select id="language-select" 
            class="bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold py-1.5 px-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer transition-all">
      <option value="en" ${currentLang === 'en' ? 'selected' : ''}>🇬🇧 EN</option>
      <option value="am" ${currentLang === 'am' ? 'selected' : ''}>🇪🇹 AM</option>
    </select>
  `;

  setTimeout(() => {
    const select = container.querySelector('#language-select');
    if (select) {
      select.addEventListener('change', (e) => {
        const lang = e.target.value;
        if (typeof changeLanguage === 'function') {
          changeLanguage(lang);
        }
      });
    }
  }, 0);

  return container;
}
