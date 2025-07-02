// routes/messageRoutes.js
const express = require('express');
const router = express.Router();
const sendEmail = require('../utils/sendEmail');
const Donation = require('../models/Donation');

// Send a message to the donor and save request info
router.post('/send', async (req, res) => {
  const { donorEmail, requesterEmail, itemName, message } = req.body;

  if (!donorEmail || !requesterEmail || !itemName || !message) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    await sendEmail({
      to: donorEmail,
      subject: `ReuseHub - Someone is interested in "${itemName}"`,
      text: `
Hi there,

You have received a request for your donated item "${itemName}".

📩 Message from requester:
"${message}"

👤 Requester's email: ${requesterEmail}

You can reply directly to this email address to connect with them.

Thanks,  
ReuseHub Team`.trim(),
    });

    const donation = await Donation.findOne({ itemName }).populate('donor', 'email');

    if (donation && donation.donor.email === donorEmail) {
      const alreadyRequested = donation.requests?.some(
        (r) => r.email === requesterEmail
      );

      if (!alreadyRequested) {
        donation.requests = donation.requests || [];
        donation.requests.push({
          email: requesterEmail,
          message,
          date: new Date(),
        });

        await donation.save();
      }
    }

    res.status(200).json({ message: 'Message sent and request saved successfully' });
  } catch (err) {
    console.error('Message sending error:', err);
    res.status(500).json({ message: 'Failed to send message' });
  }
});

module.exports = router;
