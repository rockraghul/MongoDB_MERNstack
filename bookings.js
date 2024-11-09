const express = require('express');
const router = express.Router();
const Doctor = require('../models/doctor');
const Booking = require('../models/booking');

// Get available doctors
router.get('/doctors', async (req, res) => {
  const doctors = await Doctor.find().populate('availability');
  res.json(doctors);
});

// Book a doctor
router.post('/book', async (req, res) => {
  const { doctorId, patient, date, time } = req.body;
  const doctor = await Doctor.findById(doctorId);
  if (!doctor) {
    return res.status(404).json({ error: 'Doctor not found' });
  }
  const booking = new Booking({ doctor, patient, date, time });
  await booking.save();
  res.json({ message: 'Booking successful' });
});

module.exports = router;