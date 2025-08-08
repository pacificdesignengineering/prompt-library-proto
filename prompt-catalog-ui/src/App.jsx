import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import PromptDetailPage from './pages/PromptDetailPage';
import TemplateGeneratorPage from './pages/TemplateGeneratorPage';
import './App.css';

function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-800 text-white flex space-x-4">
        <Link to="/" className="hover:text-blue-300 transition-colors">Home</Link>
        <Link to="/about" className="hover:text-blue-300 transition-colors">About</Link>
        <Link to="/template-generator" className="hover:text-blue-300 transition-colors">Create Template</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/template-generator" element={<TemplateGeneratorPage />} />
        <Route path="/prompt/:filename" element={<PromptDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App; 