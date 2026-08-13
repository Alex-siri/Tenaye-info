function renderLanguageSwitcher() {
    const container = document.createElement('div');
    container.innerHTML = `
    <select id="language-select" class="border rounded px-2 py-1 text-sm">
      <option value="en">English</option>
      <option value="am">አማርኛ</option>
    </select>
  `;

    const select = container.querySelector('#language-select');
    select.value = localStorage.getItem('language') || 'en';

    select.addEventListener('change', (e) => {
        changeLanguage(e.target.value);
    });

    return container;
}