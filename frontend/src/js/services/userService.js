async function getProfile() {
  return apiRequest('/users/profile', { method: 'GET' });
}

async function updateProfile(updates) {
  return apiRequest('/users/profile', {
    method: 'PUT',
    body: JSON.stringify(updates),
  });
}