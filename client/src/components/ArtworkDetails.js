// src/components/ArtworkDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ArtworkDetails() {
  const { id } = useParams();
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetch(`/api/artworks/${id}`)
    .then(res => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
      .then(data => setArtwork(data))
      .catch(err => setError(err))
      .finally(() => setLoading(false));

  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!artwork) {
    return <div>Artwork not found.</div>; // Handle the case where artwork is null
  }

  return (
    <div className="artwork-details">
      <h2>{artwork.title}</h2>
      <img src={artwork.image_url} alt={artwork.title} />
      <p>{artwork.description}</p>
      {/* ... other details, comments, etc. */}
    </div>
  );
}

export default ArtworkDetails;