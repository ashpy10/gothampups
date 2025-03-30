const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const applicationRoutes = require('/server/routes/applicationRoutes'); // Import routes
const Application = require('/server/models/Application'); // Import model

const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors({
    origin: ['https://www.gothampups.com', 'http://localhost:3000'], // Add allowed origins
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Use application routes
app.use('/api/applications', applicationRoutes);

// Test DB Route
app.get('/test-db', async (req, res) => {
  try {
    const applications = await Application.find({});
    res.json(applications);
  } catch (error) {
    res.status(500).send('Error connecting to database');
  }
});

// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});