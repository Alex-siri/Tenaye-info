// Authentication Utilities
function getToken() {
  return localStorage.getItem('token');
}

function getUser() {
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  try {
    return JSON.parse(userStr);
  } catch (e) {
    return null;
  }
}

function isLoggedIn() {
  return !!getToken();
}

function saveAuth(token, user) {
  localStorage.setItem('token', token);
  if (user) {
    localStorage.setItem('user', JSON.stringify(user));
  }
}

function logout() {
  // Check if modal already exists
  let modal = document.getElementById('custom-logout-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'custom-logout-modal';
    modal.className = 'fixed inset-0 bg-navy-950/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4 opacity-0 transition-opacity duration-300';
    
    modal.innerHTML = `
      <div class="bg-white rounded-2xl p-6 max-w-sm w-full shadow-2xl transform scale-95 transition-transform duration-300 text-center border border-slate-100">
        <div class="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
        </div>
        <h2 class="text-xl font-bold text-navy-900 mb-2" data-i18n="auth.confirmLogout">Confirm Logout</h2>
        <p class="text-sm text-slate-500 mb-6" data-i18n="auth.logoutPrompt">Are you sure you want to log out of your account?</p>
        <div class="flex gap-3">
          <button id="btn-cancel-logout" class="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-lg transition-colors" data-i18n="auth.cancel">Cancel</button>
          <button id="btn-confirm-logout" class="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg shadow transition-colors" data-i18n="auth.logout">Log Out</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    if (typeof applyTranslations === 'function') applyTranslations();

    document.getElementById('btn-cancel-logout').addEventListener('click', () => {
      modal.classList.remove('opacity-100');
      modal.firstElementChild.classList.remove('scale-100');
      setTimeout(() => modal.classList.add('hidden'), 300);
    });

    document.getElementById('btn-confirm-logout').addEventListener('click', () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      sessionStorage.removeItem('chatWidgetHistory');
      window.location.href = '/';
    });
  }

  // Show modal
  modal.classList.remove('hidden');
  // Small delay to allow display:block to apply before animating opacity
  setTimeout(() => {
    modal.classList.add('opacity-100');
    modal.firstElementChild.classList.add('scale-100');
  }, 10);
}
