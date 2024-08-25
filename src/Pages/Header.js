// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file for styling

const Header = ({ isAuth, signUserOut }) => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-title">
          <h1>PostIt</h1>
        </div>
    
      </div>
    </header>
  );
};

export default Header;
