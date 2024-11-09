#BookingForm.js

import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = ({ doctor }) => {
  const [patient, setPatient] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post('/api/book', {
      doctorId: doctor._id,
      patient,
      date,
      time
    })
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Patient Name:</label>
      <input type="text" value={patient} onChange={(event) => setPatient(event.target.value)} />
      <br />
      <label>Date:</label>
      <input type="date" value={date} onChange={(event) => setDate(event.target.value)} />
      <br />
      <label>Time:</label>
      <input type="time" value={time} onChange={(event) => setTime(event.target.value)} />
      <br />
      <button type="submit">Book</button>
    </form>
  );
};

export default BookingForm;

#DoctorList.js:

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorList = () => {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);

  useEffect(() => {
    axios.get('/api/doctors')
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
  };

  return (
    <div>
      <h1>Available Doctors</h1>
      <ul>
        {doctors.map((doctor) => (
          <li key={doctor._id}>
            <span>{doctor.name}</span>
            <button onClick={() => handleSelectDoctor(doctor)}>Select</button>
          </li>
        ))}
      </ul>
      {selectedDoctor && (
        <BookingForm doctor={selectedDoctor} />
      )}
    </div>
  );
};

export default DoctorList;

#booking.js

const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
  patient: String,
  date: Date,
  time: String
});

module.exports = mongoose.model('Booking', bookingSchema);

#bookings.js

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

doctor.js

const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  availability: [{ type: Date, required: true }]
});

module.exports = mongoose.model('Doctor', doctorSchema);
