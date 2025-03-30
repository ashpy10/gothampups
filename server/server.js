const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const applicationRoutes = require('/server/routes/applicationRoutes'); // Import routes
const Application = require('/server/models/Application'); // Import model

const app = express();

const cors = require('cors');

// CORS Configuration
const corsOptions = {
  origin: ['https://www.gothampups.com', 'https://gothampups.vercel.app'], // Add all allowed origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
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

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/applications', applicationRoutes);


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});