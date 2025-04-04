const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');
const applicationRoutes = require('./server/routes/applicationRoutes'); // Import routes

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected successfully!'))
  .catch((err) => console.error('MongoDB connection failed:', err));

// Application API Route
app.use('/api/applications', applicationRoutes); // ✅ Mount route correctly

// Test DB connection route
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

router.post('/', async (req, res) => {
    console.log('POST /api/applications hit!');
    try {
      const application = new Application(req.body);
      await application.save();
      res.status(201).json({ message: 'Application submitted successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error submitting application.' });
    }
  });
  
  router.get('/', async (req, res) => {
    console.log('GET /api/applications hit!');
    try {
      const applications = await Application.find({});
      res.status(200).json(applications);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching applications');
    }
  });
  