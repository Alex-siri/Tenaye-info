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

// Password visibility toggle
document.querySelectorAll('.toggle-password').forEach(button => {
    button.addEventListener('click', function() {
        const targetId = this.getAttribute('data-target');
        const input = document.getElementById(targetId);
        const icon = this.querySelector('.eye-icon');
        
        if (input.type === 'password') {
            input.type = 'text';
            icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />`;
        } else {
            input.type = 'password';
            icon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />`;
        }
    });
});