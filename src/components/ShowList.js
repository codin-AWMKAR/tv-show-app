import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const ShowList = () => {
  const [shows, setShows] = useState([]);

  useEffect(() => {
    // Fetch the list of shows using the API call
    fetch('https://api.tvmaze.com/search/shows?q=all')
      .then(response => response.json())
      .then(data => setShows(data))
      .catch(error => console.error('Error fetching show list:', error));
  }, []);

  return (
    <div className="show-list">
      <h1>Show List</h1>
      <ul>
        {shows.map(({ show }) => (
          <li key={show.id}>
            <img src={show.image?.medium} alt={show.name} />
            <h2>{show.name}</h2>
            <p>{show.summary}</p>
            <button><Link to={`/details/${show.id}`}>Show Details</Link></button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShowList;
