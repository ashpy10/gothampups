const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ✅ Set up CORS properly
const corsOptions = {
  origin: ['http://localhost:5173', 'https://www.gothampups.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};
app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); // Handle preflight requests

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Sample Route to Test
app.get('/api/test', (req, res) => {
  res.json({ message: 'API working!' });
});

// API Route for Applications
const applicationRoutes = require('./server/routes/applicationRoutes');
app.use('/api/applications', applicationRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
