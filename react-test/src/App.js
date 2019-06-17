import React from 'react';
import logo from './logo.svg';
import './App.css';

import Index from './pages/index/Index'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <Index />
    </div>
  );
}

export default App;
