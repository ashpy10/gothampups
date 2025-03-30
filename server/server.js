const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

const express = require('express');
const app = express();

app.use(express.json());

// Simple Test Route
app.get('/', (req, res) => {
  res.send('🚀 Gotham Pups Backend API is running successfully!');
});

// Port Configuration
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
