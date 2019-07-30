import React from 'react';
import Index from './containers/index/Index'
import './App.css';
import syntax from './syntax';

syntax()

const App: React.FC = () => {
  return (
    <div className="App-wrapper">
      <Index />
    </div>
  );
}

export default App;
