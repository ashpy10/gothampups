const mongoose = require("mongoose");

const applicationSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    tel: { type: String },
    location: { type: String },
    puppy_option: { type: [String], required: true },
    why: { type: String },
    experience: { type: String },
    pets: { type: String },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

module.exports = Application;
