const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  availability: [{ type: Date, required: true }]
});

module.exports = mongoose.model('Doctor', doctorSchema);