const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const donationRoutes = require('./routes/donationRoutes');
dotenv.config();

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api', authRoutes);
app.use('/api/donations', donationRoutes);
app.use('/uploads', express.static('uploads')); 
mongoose.connect(process.env.MONGO_URI, {
})
.then(() => {
  console.log('Connected to MongoDB');
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
})
.catch(err => console.error('MongoDB connection error:', err));
