import React, { useState } from "react";


const Ticker = ({getTicker}) => {
    const [ticker, setTick] = useState("");

    const sendTicker = () =>{
        getTicker(ticker);
    }
    return(
        <div>
            <form onSubmit = {sendTicker}>
            <input type="text" value={ticker} onInput = {e => setTick(e.target.value)} placeholder="Enter Stock Ticker"/>
            </form>
            
        </div>
    );
}
export default Ticker;