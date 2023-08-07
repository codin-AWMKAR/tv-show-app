import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';

const ShowDetails = () => {
  const { showId } = useParams();
  const [show, setShow] = useState(null);

  useEffect(() => {
    // Fetch the show details using the showId and API call
    fetch(`https://api.tvmaze.com/shows/${showId}`)
      .then(response => response.json())
      .then(data => setShow(data))
      .catch(error => console.error('Error fetching show details:', error));
  }, [showId]);

  return (
    <div className="show-detail-dabba">
      {show && (
        <Card>
          <Card.Img variant="top" src={show.image.medium} alt={show.name} />
          <Card.Body>
            <Card.Title>{show.name}</Card.Title>
            <p dangerouslySetInnerHTML={{ __html: show.summary }} />
            <Card.Text>Language: {show.language}</Card.Text>
            <Card.Text>Genres: {show.genres.join(', ')}</Card.Text>
            <Card.Text>Rating: {show.rating.average}</Card.Text>
            <Button variant="primary" href={`/form/${showId}`} > Book Ticket</Button>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ShowDetails;
