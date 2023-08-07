import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, Button } from 'react-bootstrap';
import './ShowList.css';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // Fetch the list of shows using the API call
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => setShows(data))
      .catch(error => console.error('Error fetching show list:', error));
  }, []);

  // Define a default image URL
  const defaultImageUrl = 'https://media.comicbook.com/files/img/default-movie.png';

  return (
    <div className="show-list-container">
      {/* Show List Heading */}
      <h1 className="show-list-heading">Show List</h1>
      <div className="row">
        {/* Map through shows */}
        {shows.map(({ show }) => (
          <div className="col-md-4 mb-4" key={show.id}>
            <Card>
              {/* Show image */}
              <Card.Img
                variant="top"
                src={show.image && show.image.medium ? show.image.medium : defaultImageUrl}
                alt={show.name}
              />
              <Card.Body>
                {/* Show title */}
                <Card.Title>{show.name}</Card.Title>
                {/* Show language */}
                <Card.Text>Language: {show.language}</Card.Text>
                {/* Show genres */}
                <Card.Text>Genres: {show.genres.join(', ')}</Card.Text>
                {/* Show rating */}
                <Card.Text>Rating: {show.rating.average}</Card.Text>
                {/* Link to show details */}
                <Link to={`/details/${show.id}`}>
                  <Button variant="primary">View Details</Button>
                </Link>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;

