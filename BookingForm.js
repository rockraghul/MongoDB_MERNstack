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