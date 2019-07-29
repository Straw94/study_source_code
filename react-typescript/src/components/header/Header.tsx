import React from 'react';
import logo from '../../logo.svg';
import './Header.css';

const Header: React.FC = () => {
  return (
      <header className="header-wrapper">
        <div className="header-content">
          <img src={logo} className="header-logo" alt="logo" />
          <div>Author: Scholar</div>
        </div>
      </header>
  );
}

export default Header;
