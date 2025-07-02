const express = require('express');
const router = express.Router();
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  const msg = {
    to: 'reusehubapp@gmail.com',
    from: 'reusehubapp@gmail.com', 
    subject: `New message from ${name}`,
    text: `
      You have a new message from your ReuseHub contact form:

      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
    replyTo: email,
  };

  try {
    await sgMail.send(msg);
    res.status(200).json({ message: 'Message sent successfully' });
  } catch (error) {
    console.error('SendGrid error:', error);
    res.status(500).json({ message: 'Failed to send message', error: error.message });
  }
});

module.exports = router;
