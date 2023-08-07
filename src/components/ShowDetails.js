import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import "./ShowDetails.css";

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

  // Check if the show object is not yet available
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
            <Button variant="primary">
              <Link to={`/form/${showId}`} className="text-white">Book Ticket</Link>
            </Button>
          </Card.Body>
        </div>
      </div>
    </div>
  );
};

export default ShowDetails;
