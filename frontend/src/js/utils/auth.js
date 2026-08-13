function saveToken(token) {
    localStorage.setItem('token', token);
}

function getToken() {
    return localStorage.getItem('token');
}

function isLoggedIn() {
    return !!getToken();
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = '/pages/login.html';
}