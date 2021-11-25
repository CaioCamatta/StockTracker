import React, { useState, useEffect } from 'react';
import { Form } from 'react-bootstrap'
import './css/Display.css';

const API_KEY = "ba7a2p1gu45GxMGivCfTR57ZUR2Wq13d9TdAc0P1"
export default function Display() {
    // Search values for stock 1 and stock 2
    let [stock1Search, setStock1Search] = useState("")
    let [stock2Search, setStock2Search] = useState("")

    // Search values for stock 1 and stock 2
    let [stock1Data, setStock1Data] = useState(null)
    let [stock2Data, setStock2Data] = useState(null)

    useEffect(()=>{
        console.log(stock1Data)
        console.log(stock2Data)
    }, [stock1Data, stock2Data])

    // Handle requesting individual stock stock data
    const getStockData = async (event, func) => {
        event.preventDefault();
        try {
            const response = await fetch("https://yfapi.net/v6/finance/quote?symbols=AAPL", {
                method: 'GET',
                headers: {
                    'x-api-key': API_KEY,
                    'Content-Type': 'application/json'
                },
            });
            let data = await response.json();
            func(data)
        }
        catch(err) {
            console.log(err);
        }
    }

    return (
        <div className="container" style={{height:"100vh"}}>
            <div className="d-flex justify-content-center mb-5 mt-5" style={{fontWeight: 700, fontSize: "40px"}}>Stock Comparison</div>
            <div className="row">
                <div className="col d-flex flex-column align-items-end">
                    <Form onSubmit={(event) => {getStockData(event, setStock1Data)}} className="searchForm">
                        <Form.Control type="text" value={stock1Search} onChange={(event)=>{setStock1Search(event.target.value)}} placeholder="Search Company Name or Ticker"/>
                    </Form>
                    <span style={{fontSize: "24px"}}>(NASDAQ: APPL) <span style={{fontWeight: 500, fontSize: "32px"}}>Apple</span></span>
                    <span className="stockPrice">$ 149.28</span>
                    <span className="generalInfo"><span className="importantValue">2.147T</span> Market Cap</span>
                    <span className="generalInfo"><span className="importantValue">0.81</span> (Volatility)</span>
                    <span className="generalInfo"><span className="importantValue">24%</span> Growth (1 year)</span>
                    <span className="lastUpdated">Last Updated: 15:02</span>
                </div>
                <div className="col d-flex flex-column align-items-start">
                    <Form onSubmit={(event) => {getStockData(event, setStock2Data)}} className="searchForm">
                        <Form.Control type="text" value={stock2Search} onChange={(event)=>{setStock2Search(event.target.value)}} placeholder="Search Company Name or Ticker"/>
                    </Form>
                    <span style={{fontSize: "24px"}}><span style={{fontWeight: 500, fontSize: "32px"}}>Microsoft</span> (NASDAQ: MSFT)</span>
                    <span className="stockPrice">$ 331.19</span>
                    <span className="generalInfo"><span className="importantValue">1.897T</span> Market Cap</span>
                    <span className="generalInfo"><span className="importantValue">1.12</span> (Volatility)</span>
                    <span className="generalInfo"><span className="importantValue">14%</span> Growth (1 year)</span>
                    <span className="lastUpdated">Last Updated: 15:02</span>
                </div>
            </div>
            
            
        </div>
    )
}