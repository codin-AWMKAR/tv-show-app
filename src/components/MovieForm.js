import React, { useState, useEffect } from 'react';
import {  Modal, Button, Form } from 'react-bootstrap';

const MovieForm = ({ showId, showModal, setShowModal }) => {
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
    setShowModal(false);
  };

  const defaultImageUrl = 'https://media.comicbook.com/files/img/default-movie.png';

  return (
    <Modal show={showModal} onHide={() => setShowModal(false)}>
      <Modal.Header closeButton>
        <Modal.Title>Book a Ticket for {show && show.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {show && (
          <div className="show-details">
            <img
              className="show-image"
              src={show.image && show.image.medium ? show.image.medium : defaultImageUrl}
              alt={show.name}
            />
            <p>Language: {show.language}</p>
            <p>Genres: {show.genres.join(', ')}</p>
            <p>Rating: {show.rating.average}</p>
          </div>
        )}

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
      </Modal.Body>
    </Modal>
  );
};

export default MovieForm;
