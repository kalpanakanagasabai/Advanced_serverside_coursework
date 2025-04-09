// components/HomePage.js
import React from 'react';
import './HomePage.css'; // Optional, for custom styling

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Welcome to Our App!</h1>
      <p>Before you get started, please register or log in to access the features.</p>
      <p>This app provides functionality for managing your API keys, viewing country data, and more!</p>
      <p>Choose an option from the menu to get started:</p>
    </div>
  );
};

export default HomePage;
