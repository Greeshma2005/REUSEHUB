const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  itemName: String,
  category: String,
  location: String,
  address: String,
  description: String,
  latitude: String,
  longitude: String,
  images: [String],
  donor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
  requests: [
    {
      email: String,
      message: String,
      date: { type: Date, default: Date.now },
    },
  ],
});

module.exports = mongoose.model('Donation', donationSchema);
