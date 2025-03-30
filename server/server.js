const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();


dotenv.config(); // Load environment variables

const app = express();
app.use(express.json());

// ✅ CORS Configuration
const allowedOrigins = [
  'http://localhost:5173', // For local development
  'https://www.gothampups.com', // Your production frontend
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: 'GET,POST,OPTIONS',
  allowedHeaders: 'Content-Type,Authorization',
};

app.use(cors(corsOptions));

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// ✅ Application API Route
const Application = require('./models/Application');

app.post('/api/applications', async (req, res) => {
  try {
    const application = new Application(req.body);
    await application.save();
    res.status(201).json({ message: 'Application submitted successfully!' });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Error submitting application.' });
  }
});

// ✅ Handle Preflight Requests for CORS
app.options('*', cors(corsOptions));

// ✅ Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
