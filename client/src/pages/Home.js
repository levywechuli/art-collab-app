// src/pages/Home.js
import React, { useState, useEffect } from 'react';
import ArtworkCard from '../components/ArtworkCard';

function Home() {
  const [artworks, setArtworks] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);     // Add error state

  useEffect(() => {
    fetch('/api/artworks')
      .then(res => {
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`); // Handle HTTP errors
        }
        return res.json();
      })
      .then(data => setArtworks(data))
      .catch(err => setError(err)) // Set error state
      .finally(() => setLoading(false)); // Set loading to false regardless of outcome
  }, []);

  if (loading) {
    return <div>Loading artworks...</div>; // Display loading message
  }

  if (error) {
    return <div>Error: {error.message}</div>; // Display error message
  }

  return (
    <div className="home-container">
      <h1>Welcome to the Art Collab App</h1>
      <div className="artwork-list">
        {artworks.map(artwork => (
          <ArtworkCard key={artwork.id} artwork={artwork} />
        ))}
      </div>
    </div>
  );
}

export default Home;
