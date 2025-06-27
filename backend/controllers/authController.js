const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    await sendEmail({
      to: email,
      subject: 'Password Reset - ReuseHub',
      text: `Click this link to reset your password:\n\n${resetLink}\n\nThis link will expire in 15 minutes.`,
    });


    res.status(200).json({ message: 'Reset link sent to your email' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending reset email' });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const hashedPwd = await bcrypt.hash(newPassword, 10);
    await User.findByIdAndUpdate(decoded.id, { password: hashedPwd });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
};

const signup = async (req, res) => {
  const { name, email, phone, password } = req.body; // ✅ include phone

  try {
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, phone, password: hashedPassword }); // ✅ include phone

    res.status(201).json({ message: 'Signup successful', user: { name: user.name, email: user.email, phone: user.phone } });
  } catch (err) {
    res.status(500).json({ message: 'Server error during signup' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

   
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please sign up first.' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Incorrect email or password.' });
    }

    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1d',
    });

    res.status(200).json({
      message: 'Login successful',
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error during login' });
  }
};



module.exports = { signup, login, forgotPassword, resetPassword };
