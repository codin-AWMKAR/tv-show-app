import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

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
    <div className="show-details">
      {show && (
        <div>
          <h1>Show Details</h1>
          <h2>{show.name}</h2>
          <img src={show.image.medium} alt={show.name} />
          <p dangerouslySetInnerHTML={{ __html: show.summary }} />
          <Link to={`/form/${showId}`}>Book Ticket</Link>
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
