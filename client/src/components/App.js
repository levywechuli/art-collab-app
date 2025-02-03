// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ArtworkDetails from './components/ArtworkDetails';
import CreateArtwork from './components/CreateArtwork';
import ProjectList from './components/ProjectList';
import ProjectDetails from './components/ProjectDetails';
import CreateProject from './components/CreateProject';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artwork/:id" element={<ArtworkDetails />} />
          <Route path="/create-artwork" element={<CreateArtwork />} />
          <Route path="/projects" element={<ProjectList />} />
          <Route path="/projects/:id" element={<ProjectDetails />} />
          <Route path="/create-project" element={<CreateProject />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<RegistrationForm />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
