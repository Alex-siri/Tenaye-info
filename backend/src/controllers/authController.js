const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/emailService');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// Generate a random 6-digit OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const register = async (req, res) => {
  try {
    const { fullName, email, password, gender, age, phoneNumber, homeAddress } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'fullName, email, and password are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'A user with this email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const otp = generateOTP();
    
    // Send Real Email!
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; text-align: center; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #172554; padding: 20px;">
          <h2 style="color: #D4AF37; margin: 0;">Welcome to Tenaye Info!</h2>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hello ${fullName},</p>
          <p style="font-size: 16px; color: #333;">Please use the following 6-digit code to verify your email address:</p>
          <h1 style="font-size: 40px; color: #172554; letter-spacing: 5px; margin: 20px 0;">${otp}</h1>
          <p style="font-size: 14px; color: #666;">This code will expire in 10 minutes.</p>
        </div>
      </div>
    `;

    await sendEmail({
      email: email,
      subject: 'Tenaye Info - Email Verification Code',
      message: `Your verification code is: ${otp}`,
      html: emailHtml
    });

    console.log(`\n=========================================`);
    console.log(`📧 Sending OTP to ${email}`);
    console.log(`🔑 Verification Code: ${otp} (For testing)`);
    console.log(`=========================================\n`);

    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
      gender,
      age,
      phoneNumber,
      homeAddress,
      otp,
      otpExpires: new Date(Date.now() + 10 * 60000), // Expires in 10 mins
      isVerified: true
    });
    
    await newUser.save();

    const token = generateToken(newUser._id);

    res.status(201).json({
      message: 'Registration successful!',
      token,
      user: {
        id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        gender: newUser.gender,
        age: newUser.age,
        phoneNumber: newUser.phoneNumber,
        homeAddress: newUser.homeAddress,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Registration failed', error: error.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.isVerified) {
      return res.status(400).json({ message: 'User is already verified' });
    }

    if (user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid Verification Code' });
    }

    if (user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'Verification Code has expired' });
    }

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const token = generateToken(user._id);

    res.status(200).json({
      message: 'Email verified successfully!',
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        gender: user.gender,
        age: user.age,
        phoneNumber: user.phoneNumber,
        homeAddress: user.homeAddress,
      },
    });

  } catch (error) {
    res.status(500).json({ message: 'Verification failed', error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    // Email verification check bypassed per user request

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        gender: user.gender,
        age: user.age,
        phoneNumber: user.phoneNumber,
        homeAddress: user.homeAddress,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error: error.message });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: 'Email is required' });

    const user = await User.findOne({ email });
    if (!user) {
      // Return 200 even if user not found for security (prevent email enumeration)
      return res.status(200).json({ message: 'If an account exists, an OTP has been sent.' });
    }

    const otp = generateOTP();
    user.otp = otp;
    user.otpExpires = new Date(Date.now() + 10 * 60000); // 10 mins
    await user.save();

    // Send Real Email!
    const emailHtml = `
      <div style="font-family: Arial, sans-serif; text-align: center; max-width: 500px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">
        <div style="background-color: #172554; padding: 20px;">
          <h2 style="color: #D4AF37; margin: 0;">Tenaye Info Password Reset</h2>
        </div>
        <div style="padding: 30px;">
          <p style="font-size: 16px; color: #333;">Hello ${user.fullName},</p>
          <p style="font-size: 16px; color: #333;">You requested a password reset. Please use the following 6-digit code to create a new password:</p>
          <h1 style="font-size: 40px; color: #172554; letter-spacing: 5px; margin: 20px 0;">${otp}</h1>
          <p style="font-size: 14px; color: #666;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
      </div>
    `;

    await sendEmail({
      email: email,
      subject: 'Tenaye Info - Password Reset Code',
      message: `Your password reset code is: ${otp}`,
      html: emailHtml
    });

    console.log(`\n=========================================`);
    console.log(`📧 Sending OTP to ${email}`);
    console.log(`🔑 Reset Code: ${otp} (For testing)`);
    console.log(`=========================================\n`);

    res.status(200).json({ message: 'If an account exists, an OTP has been sent.', requiresVerification: true });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process request', error: error.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
      return res.status(400).json({ message: 'Email, OTP, and new password are required' });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid request' });

    if (user.otp !== otp || user.otpExpires < new Date()) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    user.otp = undefined;
    user.otpExpires = undefined;
    
    // Automatically verify user if they reset password successfully
    user.isVerified = true;
    
    await user.save();

    res.status(200).json({ message: 'Password has been reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to reset password', error: error.message });
  }
};

module.exports = { register, login, verifyOtp, forgotPassword, resetPassword };
