
import './style/App.css'
import ListNews from './Components/listNews';
import Ticker from './Components/Ticker';
import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"


function App() {
  const [ticker, setTicker] = useState("");
  const [timeSet, setTime] = useState("");
  const getTicker = (tickvalue) =>{
    
    setTicker(tickvalue.toUpperCase());

  }


  useEffect(() =>{
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();
    setTime(time);
  }, [ticker]
  )

  return (
    <div className="App" >

      <div style={{ backgroundColor: "#7749F8", height: "60px", color: "white" }}>
        <a
          href={`${window.location.protocol}//${window.location.hostname}:8080`}
          style={{
            marginLeft: "140px",
            fontSize: "23px",
            fontWeight: "500",
            height: "100%",
            display: "flex",
            alignItems: "center",
            color: "inherit",
            textDecoration: "inherit"
          }}
        >
          Stock Tracker
        </a>
      </div>

      <div style = {{margin: "auto", minHeight:"95vh"}} className="container">
      <h1 className="mt-5">Stock News</h1>
      <Ticker getTick = {getTicker} />
      <h2>{ticker}</h2>
      <h3>Related News </h3>
      <p>Last Updated: {timeSet}</p>
      <ListNews tickname = {ticker}/>
      </div>
      <div className = "bottombar"><span>Created by Caio, Caleb, Jack, Ryan, Daniel</span></div>
    </div>
  );
}

export default App;
