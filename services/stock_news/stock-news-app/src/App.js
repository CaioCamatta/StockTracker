
import './style/App.css'
import ListNews from './Components/listNews';
import Ticker from './Components/Ticker';
import React, { useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import {Card} from "react-bootstrap"

function App() {
  const [ticker, setTicker] = useState("");
  const getTicker = (tickvalue) =>{
    
    setTicker(tickvalue);

  }
  console.log(ticker)
  return (
    <div className="App" >

      <nav className="top-bar" style={{"background-color":"#6633ff", color:"white", padding:"1%"}}>
        <h2 style = {{margin: "auto", width:"75%"}}>Stock Tracker</h2>
      </nav>

      <div style = {{margin: "auto", width:"75%"}}>
      <h1 className="mt-5">Stock News</h1>
      <Ticker getTick = {getTicker} />
      <h2>{ticker}</h2>
      <h3>Related News: </h3>
      <ListNews tickname = {ticker}/>
      </div>
      <div className = "bottombar"><p>Created by Caio, Caleb, Jack, Ryan, Daniel</p></div>
    </div>
  );
}

export default App;
