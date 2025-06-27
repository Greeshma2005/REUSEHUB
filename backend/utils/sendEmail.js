const sgMail = require('@sendgrid/mail');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const sendEmail = async ({ to, subject, text, html }) => {
  const msg = {
    to,
    from: {
      email: 'reusehubapp@gmail.com',
      name: 'ReuseHub',
    },
    subject,
    text,
    html,
  };

  try {
    await sgMail.send(msg);
    console.log('✅ Email sent successfully');
  } catch (error) {
    console.error('❌ SENDGRID ERROR:', error.response?.body || error.message);
    throw new Error('Failed to send email');
  }
};

module.exports = sendEmail;
