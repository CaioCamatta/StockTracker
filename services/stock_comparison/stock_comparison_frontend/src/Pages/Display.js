import React, { useState } from "react";
import { Form } from "react-bootstrap";
import "./css/Display.css";
import Chart from "react-apexcharts";


const API_KEY = "ba7a2p1gu45GxMGivCfTR57ZUR2Wq13d9TdAc0P1"
// Handle requesting individual stock stock data
// Params are event, ticker to search for, funcData is a setter for the stock data (1 or 2) and funcChart is a setter for the stock chart data (1 or 2)
const getStockData = async (event, ticker, funcData, funcChart) => {
  event.preventDefault();

  try {
    //Get the chart for the stock (past year)
    const response1 = await fetch(
      `https://yfapi.net/v8/finance/chart/${ticker}?range=1y&interval=1d`,
      {
        method: "GET",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    let chartData = await response1.json();
    chartData = chartData.chart.result[0];

    // Calculate volatility using standard deviations
    let closeValues = chartData.indicators.quote[0].close;
    let average = closeValues.reduce((a, b) => a + b, 0) / closeValues.length;
    let volatility = Math.sqrt(
      closeValues
        .map((val) => {
          return (val - average) ** 2;
        })
        .reduce((a, b) => a + b, 0) / closeValues.length
    ).toFixed(2);

    // Get today's open price
    let openPrice =
      chartData.indicators.quote[0].open[
        chartData.indicators.quote[0].open.length - 1
      ].toFixed(2);

    // Calculate growth over past year
    let diff = closeValues[closeValues.length - 1] - closeValues[0];
    let growth = ((diff / closeValues[0]) * 100).toFixed();

    // Last updated time
    let today = new Date();
    let time = today.getHours() + ":" + today.getMinutes();

    // Get recent stock data for this specific time
    const response2 = await fetch(
      `https://yfapi.net/v6/finance/quote?symbols=${ticker}`,
      {
        method: "GET",
        headers: {
          "x-api-key": API_KEY,
          "Content-Type": "application/json",
        },
      }
    );
    let currentData = await response2.json();
    currentData = currentData.quoteResponse.result[0];

    // Add calculated data to the stock data hook
    currentData = {
      ...currentData,
      volatility: volatility,
      growth: growth,
      last_updated: time,
      open: openPrice,
    };

    // Set hooks to be displayed
    funcChart(chartData);
    funcData(currentData);
  } catch (err) {
    console.log(err);
    funcData(null);
    funcChart(null);
  }
};

// Convert a number such as 1000 into 1K, or 1000000 into 1M
const abbreviateLargeNumber = (num) => {
  if (num < 1e3) return num;
  if (num >= 1e3 && num < 1e6) return +(num / 1e3).toFixed(3) + "K";
  if (num >= 1e6 && num < 1e9) return +(num / 1e6).toFixed(3) + "M";
  if (num >= 1e9 && num < 1e12) return +(num / 1e9).toFixed(3) + "B";
  if (num >= 1e12) return +(num / 1e12).toFixed(3) + "T";
};

// The component that provides the displays of stock information
export default function Display() {
  // Search values for stock 1 and stock 2
  let [stock1Search, setStock1Search] = useState("");
  let [stock2Search, setStock2Search] = useState("");

  // Hold current data for stock1 and stock2
  let [stock1Data, setStock1Data] = useState(null);
  let [stock2Data, setStock2Data] = useState(null);

  // Hold graphing data for stock1 and stock2
  let [stock1Chart, setStock1Chart] = useState(null);
  let [stock2Chart, setStock2Chart] = useState(null);

  // Graph series
  let series = [
    {
      name: stock1Data != null ? stock1Data.displayName : "",
      data:
        stock1Chart != null
          ? stock1Chart.indicators.quote[0].close.map((item) => {
              return item.toFixed(2);
            })
          : [],
    },
    {
      name: stock2Data != null ? stock2Data.displayName : "",
      data:
        stock2Chart != null
          ? stock2Chart.indicators.quote[0].close.map((item) => {
              return item.toFixed(2);
            })
          : [],
    },
  ];

  // Graph configuration
  let graph_config = {
    yaxis: [
      {
        title: {
          text: "Price (USD) Stock 1"
        },
      },
      {
        opposite: true,
        title: {
          text: "Price (USD) Stock 2"
        }
      }
    ],
    xaxis: {
      categories:
        stock1Chart != null
          ? stock1Chart.timestamp.map((time) => {
              let date = new Date(time * 1000);
              return date;
            })
          : [],
      labels: {
        show: false,
      },
    },
  };

  return (
    <div className="container" style={{ minHeight: "95vh" }}>
      <div
        className="d-flex justify-content-center mb-5 mt-5"
        style={{ fontWeight: 700, fontSize: "40px" }}
      >
        Stock Comparison
      </div>
      <div className="row">
        <div className="col d-flex flex-column align-items-end">
          <Form
            onSubmit={(event) => {
              getStockData(event, stock1Search, setStock1Data, setStock1Chart);
            }}
            className="searchForm"
          >
            <Form.Control
              type="text"
              value={stock1Search}
              onChange={(event) => {
                setStock1Search(event.target.value.toUpperCase());
              }}
              placeholder="Search Company Ticker"
            />
          </Form>
          {stock1Data != null ? (
            <div className="col d-flex flex-column align-items-end">
              <span style={{ fontSize: "24px" }}>
                ({stock1Data.fullExchangeName}: {stock1Data.symbol}){" "}
                <span style={{ fontWeight: 500, fontSize: "32px" }}>
                  {stock1Data.displayName}
                </span>
              </span>
              <span
                className="stockPrice"
                style={{
                  color:
                    stock1Data.ask >= stock1Data.open ? "#47A85C" : "#E04F51",
                }}
              >
                $ {stock1Data.ask}
              </span>
              <span className="generalInfo">
                <span className="importantValue">
                  {abbreviateLargeNumber(stock1Data.marketCap)}
                </span>{" "}
                Market Cap
              </span>
              <span className="generalInfo">
                <span className="importantValue">
                  $ {stock1Data.volatility}
                </span>{" "}
                (Volatility)
              </span>
              <span className="generalInfo">
                <span
                  className="importantValue"
                  style={{
                    color: stock1Data.growth >= 0 ? "#47A85C" : "#E04F51",
                  }}
                >
                  {stock1Data.growth}%
                </span>{" "}
                Growth (1 year)
              </span>
              <span className="lastUpdated">
                Last updated: {stock1Data.last_updated}
              </span>
            </div>
          ) : null}
        </div>
        <div className="col d-flex flex-column align-items-start">
          <Form
            onSubmit={(event) => {
              getStockData(event, stock2Search, setStock2Data, setStock2Chart);
            }}
            className="searchForm"
          >
            <Form.Control
              type="text"
              value={stock2Search}
              onChange={(event) => {
                setStock2Search(event.target.value.toUpperCase());
              }}
              placeholder="Search Company Ticker"
            />
          </Form>
          {stock2Data != null ? (
            <div className="col d-flex flex-column align-items-start">
              <span style={{ fontSize: "24px" }}>
                <span style={{ fontWeight: 500, fontSize: "32px" }}>
                  {stock2Data.displayName + " "}
                </span>
                 ({stock2Data.fullExchangeName}: {stock2Data.symbol})
              </span>
              <span
                className="stockPrice"
                style={{
                  color:
                    stock2Data.ask >= stock2Data.open ? "#47A85C" : "#E04F51",
                }}
              >
                $ {stock2Data.ask}
              </span>
              <span className="generalInfo">
                <span className="importantValue">
                  {abbreviateLargeNumber(stock2Data.marketCap) + " "}
                </span>
                Market Cap
              </span>
              <span className="generalInfo">
                <span className="importantValue">
                  $ {stock2Data.volatility}
                </span>{" "}
                (Volatility)
              </span>
              <span className="generalInfo">
                <span
                  className="importantValue"
                  style={{
                    color: stock2Data.growth >= 0 ? "#47A85C" : "#E04F51",
                  }}
                >
                  {stock2Data.growth}%
                </span>{" "}
                Growth (1 year)
              </span>
              <span className="lastUpdated">
                Last updated: {stock2Data.last_updated}
              </span>
            </div>
          ) : null}
        </div>
      </div>
      {stock1Chart != null || stock2Chart != null ? (
        <div className="mixed-chart d-flex flex-column align-items-center">
          <Chart
            options={graph_config}
            series={series}
            type="line"
            width="1200"
            height="500"
          />
        </div>
      ) : null}
    </div>
  );
}
