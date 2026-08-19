const form = document.getElementById('login-form');
const errorMessage = document.getElementById('error-message');

const btnShowForgotPassword = document.getElementById('btn-show-forgot-password');
const btnCloseForgotPassword = document.getElementById('btn-close-forgot-password');
const forgotModal = document.getElementById('forgot-password-modal');

const forgotForm = document.getElementById('forgot-form');
const forgotErrorMessage = document.getElementById('forgot-error-message');
const forgotStep1 = document.getElementById('forgot-step-1');

const verifyOtpForm = document.getElementById('verify-otp-form');
const forgotStep2 = document.getElementById('forgot-step-2');
const resetEmailDisplay = document.getElementById('reset-email-display');

const resetForm = document.getElementById('reset-form');
const resetErrorMessage = document.getElementById('reset-error-message');
const forgotStep3 = document.getElementById('forgot-step-3');

let resetEmail = '';
let resetOtp = '';

// Toggle Modal
btnShowForgotPassword.addEventListener('click', () => {
    forgotModal.classList.remove('hidden');
    forgotStep1.classList.remove('hidden');
    forgotStep2.classList.add('hidden');
    forgotStep3.classList.add('hidden');
    document.getElementById('forgot-email').value = document.getElementById('email').value; // Pre-fill
});

btnCloseForgotPassword.addEventListener('click', () => {
    forgotModal.classList.add('hidden');
});

// Regular Login
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value.trim();
    const password = document.getElementById('password').value;

    errorMessage.classList.add('hidden');

    try {
        const data = await loginUser(email, password);
        saveAuth(data.token, data.user);
        window.location.href = 'index.html';
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove('hidden');
    }
});

// Forgot Password - Step 1: Send OTP
forgotForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('forgot-email').value.trim();
    forgotErrorMessage.classList.add('hidden');

    try {
        await forgotPassword(email);
        resetEmail = email;
        resetEmailDisplay.textContent = `Code sent to ${email}`;
        forgotStep1.classList.add('hidden');
        forgotStep2.classList.remove('hidden');
    } catch (error) {
        forgotErrorMessage.textContent = error.message;
        forgotErrorMessage.classList.remove('hidden');
    }
});

// Forgot Password - Step 2: Verify OTP
verifyOtpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    resetOtp = document.getElementById('reset-otp').value.trim();
    // Move to step 3
    forgotStep2.classList.add('hidden');
    forgotStep3.classList.remove('hidden');
});

// Forgot Password - Step 3: Save New Password
resetForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const newPassword = document.getElementById('reset-new-password').value;
    const confirmPassword = document.getElementById('reset-confirm-password').value;
    
    resetErrorMessage.classList.add('hidden');

    if (newPassword !== confirmPassword) {
        resetErrorMessage.textContent = "Passwords do not match.";
        resetErrorMessage.classList.remove('hidden');
        return;
    }

    try {
        await resetPassword(resetEmail, resetOtp, newPassword);
        alert('Password has been reset successfully! Please log in with your new password.');
        forgotModal.classList.add('hidden');
        document.getElementById('password').focus();
    } catch (error) {
        resetErrorMessage.textContent = error.message;
        resetErrorMessage.classList.remove('hidden');
    }
});