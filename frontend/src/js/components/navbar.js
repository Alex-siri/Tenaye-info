// Reusable Shared Navbar Component
function renderNavbar() {
  const currentPath = window.location.pathname;

  const getLinkClasses = (path) => {
    const isActive = currentPath.includes(path);
    return isActive 
      ? 'text-gold-400 font-bold border-b-2 border-gold-400 pb-1' 
      : 'text-white font-medium hover:text-gold-200 transition-colors';
  };

  const getMobileLinkClasses = (path) => {
    const isActive = currentPath.includes(path);
    return isActive
      ? 'block px-4 py-3 bg-navy-800 text-gold-400 font-bold border-l-4 border-gold-400'
      : 'block px-4 py-3 text-white font-medium hover:bg-navy-800 hover:text-gold-200 border-l-4 border-transparent transition-colors';
  };

  const isLoggedInStatus = typeof isLoggedIn === 'function' ? isLoggedIn() : false;

  const header = document.createElement('header');
  header.innerHTML = `
    <nav class="bg-navy-900 sticky top-0 z-40 shadow-md border-b border-navy-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- Logo -->
          <div class="flex-shrink-0 flex items-center gap-2 cursor-pointer transition-transform hover:scale-105" onclick="window.location.href='/pages/index.html'">
            <span class="text-2xl drop-shadow-sm">💊</span>
            <span class="font-bold text-xl tracking-tight text-white">Tenaye <span class="text-gold-400 font-extrabold">Info</span></span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center space-x-8">
            <a href="/pages/index.html" class="${getLinkClasses('index.html')}" data-i18n="nav.home">Home</a>
            <a href="/pages/medicine-search.html" class="${getLinkClasses('medicine-search.html')}" data-i18n="nav.search">Medicine Search</a>
            <a href="/pages/pharmacy-locator.html" class="${getLinkClasses('pharmacy-locator.html')}" data-i18n="nav.pharmacy">Pharmacy Locator</a>
          </div>

          <!-- Actions -->
          <div class="hidden md:flex items-center space-x-4">
            <div id="language-switcher-container"></div>
            
            ${isLoggedInStatus ? `
              <a href="/pages/profile.html" class="flex items-center justify-center w-10 h-10 bg-navy-800 text-gold-400 border border-navy-700 rounded-full hover:bg-navy-700 hover:border-navy-600 hover:text-gold-300 transition-all shadow-sm" title="Profile">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </a>
              <button id="nav-logout-btn" class="text-sm font-semibold text-red-400 hover:text-red-300 transition-colors px-2" data-i18n="nav.logout">Logout</button>
            ` : `
              <a href="/pages/login.html" class="px-5 py-2 text-sm font-bold text-white hover:text-gold-200 transition-colors" data-i18n="nav.login">Login</a>
              <a href="/pages/register.html" class="px-5 py-2 text-sm font-bold bg-gold-500 text-navy-950 rounded-full hover:bg-gold-400 transition-all shadow-sm hover:shadow" data-i18n="nav.register">Register</a>
            `}
          </div>

          <!-- Mobile menu button -->
          <div class="md:hidden flex items-center gap-4">
            <div id="mobile-language-switcher-container"></div>
            <button id="mobile-menu-btn" class="text-white hover:text-gold-400 focus:outline-none p-2 rounded-md hover:bg-navy-800 transition-colors">
              <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div id="mobile-menu" class="hidden md:hidden bg-navy-900 border-t border-navy-800 shadow-xl absolute w-full">
        <div class="pt-2 pb-4 space-y-1">
          <a href="/pages/index.html" class="${getMobileLinkClasses('index.html')}" data-i18n="nav.home">Home</a>
          <a href="/pages/medicine-search.html" class="${getMobileLinkClasses('medicine-search.html')}" data-i18n="nav.search">Medicine Search</a>
          <a href="/pages/pharmacy-locator.html" class="${getMobileLinkClasses('pharmacy-locator.html')}" data-i18n="nav.pharmacy">Pharmacy Locator</a>
          
          <div class="border-t border-navy-800 mt-4 pt-4 px-4 flex flex-col gap-3">
            ${isLoggedInStatus ? `
              <a href="/pages/profile.html" class="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-navy-800 text-gold-400 font-bold rounded-xl border border-navy-700">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
                <span data-i18n="nav.profile">Profile</span>
              </a>
              <button id="mobile-logout-btn" class="w-full text-center px-4 py-2.5 text-red-400 font-bold bg-red-400/10 rounded-xl" data-i18n="nav.logout">Logout</button>
            ` : `
              <a href="/pages/login.html" class="w-full text-center px-4 py-2.5 text-white font-bold bg-navy-800 rounded-xl" data-i18n="nav.login">Login</a>
              <a href="/pages/register.html" class="w-full text-center px-4 py-2.5 bg-gold-500 text-navy-950 font-bold rounded-xl" data-i18n="nav.register">Register</a>
            `}
          </div>
        </div>
      </div>
    </nav>
  `;

  // Attach Language Switcher component
  const desktopSwitcherContainer = header.querySelector('#language-switcher-container');
  if (desktopSwitcherContainer && typeof renderLanguageSwitcher === 'function') {
    desktopSwitcherContainer.appendChild(renderLanguageSwitcher());
  }

  const mobileSwitcherContainer = header.querySelector('#mobile-language-switcher-container');
  if (mobileSwitcherContainer && typeof renderLanguageSwitcher === 'function') {
    mobileSwitcherContainer.appendChild(renderLanguageSwitcher());
  }

  // Logout listener
  const desktopLogoutBtn = header.querySelector('#nav-logout-btn');
  if (desktopLogoutBtn && typeof logout === 'function') {
    desktopLogoutBtn.addEventListener('click', () => logout());
  }
  
  const mobileLogoutBtn = header.querySelector('#mobile-logout-btn');
  if (mobileLogoutBtn && typeof logout === 'function') {
    mobileLogoutBtn.addEventListener('click', () => logout());
  }

  // Mobile menu toggle
  const toggleBtn = header.querySelector('#mobile-menu-btn');
  const mobileMenu = header.querySelector('#mobile-menu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  return header;
}
