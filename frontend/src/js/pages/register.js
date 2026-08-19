const form = document.getElementById('register-form');
const errorMessage = document.getElementById('error-message');

const otpModal = document.getElementById('otp-modal');
const otpForm = document.getElementById('otp-form');
const otpErrorMessage = document.getElementById('otp-error-message');
const otpEmailDisplay = document.getElementById('otp-email-display');

let registeredEmail = '';

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const userData = {
        fullName: document.getElementById('fullName').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: document.getElementById('password').value,
        age: document.getElementById('age').value ? parseInt(document.getElementById('age').value) : undefined,
        gender: document.getElementById('gender').value || undefined,
        phoneNumber: document.getElementById('phoneNumber').value.trim() || undefined,
        homeAddress: document.getElementById('homeAddress').value.trim() || undefined
    };

    errorMessage.classList.add('hidden');

    try {
        const data = await registerUser(userData);
        if (data.requiresVerification) {
            registeredEmail = userData.email;
            otpEmailDisplay.textContent = `We've sent a 6-digit code to ${registeredEmail}.`;
            otpModal.classList.remove('hidden');
        } else {
            saveAuth(data.token, data.user);
            window.location.href = 'index.html';
        }
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
});

otpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const otp = document.getElementById('otp-input').value.trim();
    otpErrorMessage.classList.add('hidden');

    try {
        await verifyOtp(registeredEmail, otp);
        alert('Email verified successfully! Please log in to your account.');
        window.location.href = 'login.html';
    } catch (error) {
        otpErrorMessage.textContent = error.message;
        otpErrorMessage.classList.remove('hidden');
    }
});
