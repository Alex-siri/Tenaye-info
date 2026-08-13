if (!isLoggedIn()) {
    window.location.href = 'login.html';
}

const form = document.getElementById('profile-form');
const statusMessage = document.getElementById('status-message');

document.getElementById('logout-btn').addEventListener('click', logout);

async function loadProfile() {
    try {
        const data = await getProfile();
        document.getElementById('fullName').value = data.user.fullName || '';
        document.getElementById('email').value = data.user.email || '';
        document.getElementById('gender').value = data.user.gender || '';
        document.getElementById('age').value = data.user.age || '';
        document.getElementById('region').value = data.user.region || '';
        document.getElementById('city').value = data.user.city || '';
    } catch (error) {
        statusMessage.textContent = error.message;
        statusMessage.className = 'text-sm text-red-600';
        statusMessage.classList.remove('hidden');
    }
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const updates = {
        gender: document.getElementById('gender').value,
        age: document.getElementById('age').value ? Number(document.getElementById('age').value) : undefined,
        region: document.getElementById('region').value,
        city: document.getElementById('city').value,
    };

    try {
        await updateProfile(updates);
        statusMessage.textContent = 'Profile updated successfully!';
        statusMessage.className = 'text-sm text-green-600';
        statusMessage.classList.remove('hidden');
    } catch (error) {
        statusMessage.textContent = error.message;
        statusMessage.className = 'text-sm text-red-600';
        statusMessage.classList.remove('hidden');
    }
});

loadProfile();