const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patient: String,
  date: Date,
  time: String
});

module.exports = mongoose.model('Booking', bookingSchema);