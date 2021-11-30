import './App.css';
import React from 'react';
import AlbionDataApp from './AlbionDataApp';
import AsyncTableDataProvider from './AsyncTableDataProvider';

function App() {
  const provider = new AsyncTableDataProvider();
  return (
    <div className="App">
      <header className="App-header">
        <AlbionDataApp provider={provider} />
      </header >
    </div >
  );
}

export default App;
