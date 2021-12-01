
import './App.css';
import ListNews from './Components/listNews';
import Ticker from './Components/Ticker';
import React, { useState } from 'react';


function App() {
  const [ticker, setTicker] = useState('');
  const getTicker = (tickvalue) =>{
    
    setTicker(tickvalue);

  }

  return (
    <div className="App">
      
      <Ticker getTicker = {getTicker} />
      <p>{ticker}</p>
      <ListNews tickname = {ticker}/>
    </div>
  );
}

export default App;
