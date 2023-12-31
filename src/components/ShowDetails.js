import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Button, Modal,Form } from 'react-bootstrap';
import "./ShowDetails.css";
import MovieForm from './MovieForm';

const ShowDetails = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  if (!show) {
    return <div>Loading...</div>;
  }

  const defaultImageUrl = 'https://media.comicbook.com/files/img/default-movie.png';

  return (
    <div className="show-detail-dabba">
      <div className="row">
        <div className="col-md-6">
          <Card>
            {show.image && show.image.medium && (
              <Card.Img
                variant="top"
                src={show.image && show.image.medium ? show.image.medium : defaultImageUrl}
                alt={show.name}
              />
            )}
          </Card>
        </div>
        <div className="col-md-6">
          <Card.Body>
            <h1>Show Details</h1>
            <Card.Title>{show.name}</Card.Title>
            <div className="summary">
              <p className="summary-text" dangerouslySetInnerHTML={{ __html: show.summary }} />
            </div>
            <Card.Text>Language: {show.language}</Card.Text>
            <Card.Text>Genres: {show.genres.join(', ')}</Card.Text>
            <Card.Text>Rating: {show.rating.average}</Card.Text>
            <Button variant="primary" onClick={() => setShowModal(true)}>
              Book Ticket
            </Button>
          </Card.Body>
        </div>
      </div>

      {/* MovieForm Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Book a Ticket for {show.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="show-details">
            <img
              className="show-image"
              src={show.image && show.image.medium ? show.image.medium : defaultImageUrl}
              alt={show.name}
            />
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
          <MovieForm showId={showId} setShowModal={setShowModal} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ShowDetails;
