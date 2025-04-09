import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import LoginComponent from './components/LoginComponent';
import RegisterComponent from './components/RegisterComponent';
import GetCountryData from './components/GetCountryData';
import GenerateApiKey from './components/GenerateApiKey';
import HomePage from './components/HomePage';  // Import the new HomePage component
import './AppStyles.css'; // Importing the new CSS file

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <nav className="navbar">
          <div className="navbar-links">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/register" className="nav-link">Register</Link> 
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/generate-api-key" className="nav-link">Generate API Key</Link>
            <Link to="/country-data" className="nav-link">Country Data</Link>
          </div>
        </nav>

        <div className="content-container">
          <Routes>
            <Route path="/" element={<HomePage />} /> 
            <Route path="/login" element={<LoginComponent />} />
            <Route path="/register" element={<RegisterComponent />} />
            <Route path="/generate-api-key" element={<GenerateApiKey />} />
            <Route path="/country-data" element={<GetCountryData />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
