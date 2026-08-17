// Reusable Shared Navbar Component
function renderNavbar() {
  const header = document.createElement('header');
  header.className = 'bg-emerald-700 text-white shadow-md sticky top-0 z-50';

  const loggedIn = typeof isLoggedIn === 'function' ? isLoggedIn() : false;

  header.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-16">
        <!-- Brand Logo -->
        <div class="flex items-center space-x-3">
          <a href="/pages/index.html" class="flex items-center space-x-2 font-bold text-xl tracking-tight text-white hover:text-emerald-100 transition-colors">
            <span class="text-2xl">💊</span>
            <span class="font-extrabold text-white">Tenaye <span class="text-emerald-300">Info</span></span>
          </a>
        </div>

        <!-- Desktop Navigation Links -->
        <nav class="hidden md:flex items-center space-x-6 text-sm font-medium">
          <a href="/pages/index.html" data-i18n="nav.home" class="hover:text-emerald-200 transition-colors">Home</a>
          <a href="/pages/medicine-search.html" data-i18n="nav.search" class="hover:text-emerald-200 transition-colors">Medicine Search</a>
          <a href="/pages/pharmacy-locator.html" data-i18n="nav.pharmacy" class="hover:text-emerald-200 transition-colors">Pharmacy Locator</a>
          <a href="/pages/chatbot.html" data-i18n="nav.chatbot" class="hover:text-emerald-200 transition-colors">Tenaye AI Chatbot</a>
        </nav>

        <!-- Right Side: Auth & Language Switcher -->
        <div class="flex items-center space-x-3 md:space-x-4">
          <div id="nav-language-switcher-container"></div>
          
          ${loggedIn ? `
            <a href="/pages/profile.html" data-i18n="nav.profile" class="bg-emerald-600 hover:bg-emerald-500 text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors">Profile</a>
            <button id="nav-logout-btn" data-i18n="nav.logout" class="bg-emerald-800 hover:bg-red-700 text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-lg transition-colors">Logout</button>
          ` : `
            <a href="/pages/login.html" data-i18n="nav.login" class="hover:text-emerald-200 text-xs md:text-sm font-medium transition-colors">Login</a>
            <a href="/pages/register.html" data-i18n="nav.register" class="bg-emerald-500 hover:bg-emerald-400 text-white text-xs md:text-sm font-semibold px-3 py-1.5 rounded-lg shadow-sm transition-colors">Register</a>
          `}

          <!-- Mobile menu toggle button -->
          <button id="mobile-menu-toggle" class="md:hidden p-2 rounded-md hover:bg-emerald-600 focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div id="mobile-menu" class="hidden md:hidden pb-4 space-y-2 border-t border-emerald-600 pt-3">
        <a href="/pages/index.html" data-i18n="nav.home" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600">Home</a>
        <a href="/pages/medicine-search.html" data-i18n="nav.search" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600">Medicine Search</a>
        <a href="/pages/pharmacy-locator.html" data-i18n="nav.pharmacy" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600">Pharmacy Locator</a>
        <a href="/pages/chatbot.html" data-i18n="nav.chatbot" class="block px-3 py-2 rounded-md text-base font-medium hover:bg-emerald-600">Tenaye AI Chatbot</a>
      </div>
    </div>
  `;

  // Attach Language Switcher component
  const switcherContainer = header.querySelector('#nav-language-switcher-container');
  if (switcherContainer && typeof renderLanguageSwitcher === 'function') {
    switcherContainer.appendChild(renderLanguageSwitcher());
  }

  // Logout listener
  const logoutBtn = header.querySelector('#nav-logout-btn');
  if (logoutBtn && typeof logout === 'function') {
    logoutBtn.addEventListener('click', () => logout());
  }

  // Mobile menu toggle
  const toggleBtn = header.querySelector('#mobile-menu-toggle');
  const mobileMenu = header.querySelector('#mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  return header;
}
