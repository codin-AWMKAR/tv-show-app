import React, { useState } from 'react';

const MovieForm = ({ movieName }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Store user details and movie name in local storage
    const userDetails = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      movieName: movieName,
    };

    localStorage.setItem('userDetails', JSON.stringify(userDetails));

    // Clear the form fields
    setName('');
    setEmail('');
    setPhoneNumber('');

    alert('Ticket booked successfully!');
  };

  return (
    <div className="movie-form">
      <h2>Book a Ticket for {movieName}</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
        </div>
        <button type="submit">Book Ticket</button>
      </form>
    </div>
  );
};

export default MovieForm;
