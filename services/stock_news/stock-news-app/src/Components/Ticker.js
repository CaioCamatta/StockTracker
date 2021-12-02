import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"

const Ticker = ({getTick}) => {
    const [ticker, setTick] = useState("");

    const sendTicker = (event) =>{
        event.preventDefault();
        console.log("Send: ", ticker);
        getTick(ticker);
    }
    console.log("Not send:" , ticker);
    return(
        <div className="mb-5">
            <form onSubmit = {sendTicker}>
            <input style={{padding: "0.5% 15% 0.5% 0%", marginTop: "1.5em", borderColor: "gray"}} type="text" value={ticker} onInput = {e => setTick(e.target.value)} placeholder="Enter Stock Ticker"/>
            </form>
            
        </div>
    );
}
export default Ticker;