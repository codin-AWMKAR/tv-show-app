import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MovieForm.css';
import { Form, Button } from 'react-bootstrap';

const MovieForm = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  useEffect(() => {
    // Fetch the show details using the showId and API call
    fetch(`https://api.tvmaze.com/shows/${showId}`)
      .then(response => response.json())
      .then(data => setShow(data))
      .catch(error => console.error('Error fetching show details:', error));
  }, [showId]);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    // Store user details and movie name in local storage
    const userDetails = {
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      movieName: show.name, // Update to show.name
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
      {show && (
        <div>
          <h2>Book a Ticket for {show.name}</h2>
          <img src={show.image.medium} alt={show.name} />
          <p>Language: {show.language}</p>
          <p>Genres: {show.genres.join(', ')}</p>
          <p>Rating: {show.rating.average}</p>
          <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Name:</Form.Label>
          <Form.Control
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Phone Number:</Form.Label>
          <Form.Control
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Book Ticket
        </Button>
      </Form>
        </div>
      )}
    </div>
  );
};

export default MovieForm;

