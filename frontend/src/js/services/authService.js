async function loginUser(email, password) {
    return apiRequest('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
    });
}

async function registerUser(fullName, email, password) {
    return apiRequest('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ fullName, email, password }),
    });
}