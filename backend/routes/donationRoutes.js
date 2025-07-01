const express = require('express');
const router = express.Router();

const Donation = require('../models/Donation');
const { authMiddleware } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');
const fs = require('fs');
const path = require('path');

router.post('/', authMiddleware, upload.array('images', 3), async (req, res) => {
  try {
    const { itemName, category, location, address, description, latitude, longitude } = req.body;

    console.log('Received donation from:', req.user?.email || req.user?._id);
    console.log('Request body:', req.body);
    console.log('Uploaded files:', req.files);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: 'User not authenticated' });
    }

    const imagePaths = req.files.map(file => file.filename);

    const donation = new Donation({
      itemName,
      category,
      location,
      address,
      description,
      latitude,
      longitude,
      images: imagePaths,
      donor: req.user._id,
    });

    await donation.save();
    res.status(201).json({ message: 'Donation created successfully' });
  } catch (error) {
    console.error('Donation error:', error);
    res.status(500).json({ message: 'Failed to create donation', error: error.message });
  }
});

// GET: All Donations
router.get('/', async (req, res) => {
  try {
    const donations = await Donation.find().populate('donor', 'name email');
    res.json(donations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch donations' });
  }
});

// GET: My Donations
router.get('/my-donations', authMiddleware, async (req, res) => {
  try {
    const myDonations = await Donation.find({ donor: req.user._id });
    res.json(myDonations);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user donations' });
  }
});
// DELETE: Delete a donation and its images
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const donation = await Donation.findById(req.params.id);
    if (!donation) {
      return res.status(404).json({ message: 'Donation not found' });
    }

    // Delete each image
    donation.images.forEach((filename) => {
      const filePath = path.join(__dirname, '..', 'uploads', filename);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error(`❌ Error deleting ${filePath}:`, err.message);
        } else {
          console.log(`🗑️ Successfully deleted ${filePath}`);
        }
      });
    });

    await Donation.deleteOne({ _id: donation._id });
    res.status(200).json({ message: 'Donation deleted with images' });
  } catch (err) {
    console.error('❌ Donation delete error:', err);
    res.status(500).json({ message: 'Failed to delete donation' });
  }
});

module.exports = router;
