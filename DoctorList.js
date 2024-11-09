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