const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');
const Donation = require('../models/Donation');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { authMiddleware } = require('../middleware/authMiddleware');

router.get('/my-requests', authMiddleware, async (req, res) => {
  try {
    const userEmail = req.user.email;

    if (!userEmail) {
      return res.status(400).json({ message: 'User email not found in token' });
    }

    const requestedItems = await Donation.find({
      requests: { $elemMatch: { email: userEmail } },
    });

    res.status(200).json(requestedItems);
  } catch (err) {
    console.error('Error fetching my-requests:', err);
    res.status(500).json({ message: 'Error fetching requests' });
  }
});

module.exports = router;
