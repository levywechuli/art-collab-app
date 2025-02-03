// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="nav-link">Home</Link>
      <Link to="/create-artwork" className="nav-link">Create Artwork</Link>
      <Link to="/projects" className="nav-link">Projects</Link>
      <Link to="/create-project" className="nav-link">Create Project</Link>
      <Link to="/login" className="nav-link">Login</Link>
      <Link to="/register" className="nav-link">Register</Link>
    </nav>
  );
}

export default Navbar;

