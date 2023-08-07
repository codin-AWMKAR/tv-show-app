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
      <h1>Show List</h1>
      <div className="row">
        {shows.map(({ show }) => (
          <div className="col-md-4 mb-4" key={show.id}>
            <Card>
              <Card.Img
                variant="top"
                src={show.image && show.image.medium ? show.image.medium : defaultImageUrl}
                alt={show.name}
              />
              <Card.Body>
                <Card.Title>{show.name}</Card.Title>
                <Card.Text>Language: {show.language}</Card.Text>
                <Card.Text>Genres: {show.genres.join(', ')}</Card.Text>
                <Card.Text>Rating: {show.rating.average}</Card.Text>
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

