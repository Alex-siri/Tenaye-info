// i18n Translation Engine (i18next + HttpBackend)
i18next.use(i18nextHttpBackend);

function initI18n(callback) {
  i18next.init(
    {
      lng: localStorage.getItem('language') || 'en',
      fallbackLng: 'en',
      debug: false,
      backend: {
        loadPath: '/public/locales/{{lng}}/translation.json',
      },
    },
    () => {
      applyTranslations();
      if (callback) callback();
    }
  );
}

function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    const optionsAttr = el.getAttribute('data-i18n-options');
    let options = {};
    if (optionsAttr) {
        try { options = JSON.parse(optionsAttr); } catch (e) {}
    }
    
    // Only update if it's an actual translation, not just the key name (if missing)
    const translated = i18next.t(key, options);
    if (translated && translated !== key) {
        el.innerHTML = translated;
    }
  });
  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = i18next.t(key);
  });
  // Expose the current language globally to CSS for dynamic content toggling
  document.body.setAttribute('data-lang', i18next.language);
}

function changeLanguage(lng) {
  i18next.changeLanguage(lng, () => {
    localStorage.setItem('language', lng);
    applyTranslations();
  });
}

// Automatically initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    if (typeof initI18n === 'function') {
        initI18n();
    }
});
