// src/components/ArtworkCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function ArtworkCard({ artwork }) {
  return (
    <div className="artwork-card">
      <Link to={`/artwork/${artwork.id}`}>
        <img src={artwork.image_url} alt={artwork.title} />
      </Link>
      <h3>{artwork.title}</h3>
      <p>{artwork.description}</p>
    </div>
  );
}

export default ArtworkCard;

