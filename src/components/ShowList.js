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
      <h1 className="show-list-heading">Show List</h1>
      <div className="project-container">
        {shows.map(({ show }) => (
          <div className="project-card" key={show.id}>
            <Card>
              <Card.Img
                variant="top"
                src={show.image && show.image.medium ? show.image.medium : defaultImageUrl}
                alt={show.name}
              />
              <Card.Body>
                <h2 className="project-title">{show.name}</h2>
                <div className="pro-details">
                  <p>Language: {show.language}</p>
                  <p>Genres: {show.genres.join(', ')}</p>
                  <p>Rating: {show.rating.average}</p>
                </div>
                <div className="pro-btns">
                  <Link to={`/details/${show.id}`}>
                    <Button variant="primary">View Details</Button>
                  </Link>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowList;
