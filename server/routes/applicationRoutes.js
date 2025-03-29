const express = require("express");
const router = express.Router();
const Application = require("../models/Application");
const sendEmail = require("../utils/sendEmail");

// POST: Create Application and Send Email
router.post("/", async (req, res) => {
  try {
    const application = new Application(req.body);
    const savedApplication = await application.save();

    // Send notification email
    await sendEmail(req.body);

    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(500).json({ message: "Error submitting application", error });
  }
});

module.exports = router;
