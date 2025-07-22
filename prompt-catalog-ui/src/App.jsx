import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import PromptDetailPage from './pages/PromptDetailPage';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex space-x-4">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/prompt/:filename" element={<PromptDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App; 