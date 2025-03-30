const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String },
    location: { type: String },
    puppy_option: { type: [String], required: true },
    why: { type: String },
    experience: { type: String },
    pets: { type: String },
    questions: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Application', applicationSchema);
