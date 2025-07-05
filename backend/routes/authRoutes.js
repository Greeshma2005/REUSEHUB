const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const sendEmail = require('../utils/sendEmail');

router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: 'User not found' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '15m',
    });
const resetLink = `https://reusehub-six.vercel.app/reset-password/${token}`;

    await sendEmail({
        to: email,
        subject: 'Password Reset - ReuseHub',
        text: `Click this link to reset your password:\n\n${resetLink}\n\nThis link will expire in 15 minutes.`,
    });


    res.status(200).json({ message: 'Password reset link sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error sending reset email' });
  }
});


router.post('/reset-password/:token', async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPwd = await bcrypt.hash(newPassword, 10);

    await User.findByIdAndUpdate(decoded.id, { password: hashedPwd });

    res.status(200).json({ message: 'Password reset successful' });
  } catch (err) {
    res.status(400).json({ message: 'Invalid or expired token' });
  }
});

router.post('/signup', async (req, res) => {
  const { name, email, phone, password } = req.body; 

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPwd = await bcrypt.hash(password, 10);

    const user = new User({ name, email, phone, password: hashedPwd }); 
    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/login', async (req, res) => {
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
      user: { name: user.name, email: user.email, phone: user.phone },
    });

  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.put('/update-profile', async (req, res) => {
  const { name, email, phone } = req.body;
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByIdAndUpdate(
      decoded.userId,  // ✅ Correct key here
      { name, email, phone },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: 'User not found' });

    res.status(200).json({
      message: 'Profile updated successfully',
      user: { name: user.name, email: user.email, phone: user.phone }
    });
  } catch (err) {
    console.error(err);  // Helpful for debugging
    res.status(500).json({ message: 'Error updating profile' });
  }
});



module.exports = router;
