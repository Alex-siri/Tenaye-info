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
        el.textContent = i18next.t(key);
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
        const key = el.getAttribute('data-i18n-placeholder');
        el.placeholder = i18next.t(key);
    });
}

function changeLanguage(lng) {
    i18next.changeLanguage(lng, () => {
        localStorage.setItem('language', lng);
        applyTranslations();
    });
}