import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"
import { Form } from "react-bootstrap";

const Ticker = ({getTick}) => {
    const [ticker, setTick] = useState("");
  
    const sendTicker = (event) =>{
        event.preventDefault();

        getTick(ticker);
    }
    
    return(
        <div className="mb-5">
            <Form onSubmit = {sendTicker}>
            <Form.Control style={{width: "40%"}} type="text" value={ticker} onInput = {e => setTick(e.target.value)} placeholder="Enter Stock Ticker"/>
            </Form>
            
        </div>
    );
}
export default Ticker;