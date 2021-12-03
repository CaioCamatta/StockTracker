import React, { Component } from "react";
import { marketStack } from "../config/marketStack";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

class StockData extends Component {

    constructor(props) {
        super(props)
        this.state = {
            stockData: [ ],
            currentPrice: "",
            growth: "",
            mean: 0,
            deviationSum: 0

        }
    }
    componentDidMount() {
            for (var i = 0; i >= 0; i--)
            {
                this.setState({
                stockData: this.state.stockData.concat({ date: "N/A", price: 0})
                })

            }
    }

    componentDidUpdate(prevProps, prevState) {
        //query marketStack API
        const url = `${marketStack.base_url}/eod?access_key=${marketStack.api_token}&symbols=${this.props.ticker}`
        
        if((prevProps.ticker !== this.props.ticker || prevProps.dataLength !== this.props.dataLength) && this.props.ticker != ""){
            //add data to graph
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.state.stockData = [];
                this.setState({currentPrice: data['data'][0]['close']})
                this.setState({growth: 
                    (((data['data'][0]['close']-data['data'][this.props.dataLength-1]['close'])/
                    data['data'][this.props.dataLength-1]['close'])*100).toFixed(2) 
                
                })
                this.state.mean = 0
                this.state.deviationSum = 0
                for (var i = this.props.dataLength-1; i >= 0; i--)
                {
                    this.setState({
                    stockData: this.state.stockData.concat({ date: data['data'][i]['date'].split("T")[0], price: data['data'][i]['close']})
                    })
                    this.state.mean = this.state.mean + data['data'][i]['close']

                }
                this.state.mean = this.state.mean/this.props.dataLength;
                for (var i = this.props.dataLength-1; i >= 0; i--)
                {
                    this.state.deviationSum = this.state.deviationSum + ((data['data'][i]['close']-this.state.mean)**2)
                }
                this.state.deviationSum = this.state.deviationSum/this.props.dataLength
                this.setState({deviationSum: Math.sqrt(this.state.deviationSum).toFixed(2)})
            })
        }
        
    }
    

    render() {
        return (
            <div>
                <h2>{this.props.ticker}</h2>
                Last EOD Price: ${this.state.currentPrice}<br />
                Growth: {this.state.growth}%<br />
                Volatility: {this.state.deviationSum}
                <AreaChart
                    width={1500}
                    height={550}
                    data={this.state.stockData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <Tooltip />
                        <Area
                        type='monotone'
                        dataKey='price'
                        stroke='#8884d8'
                        fill='#8884d8'
                        />
                </AreaChart>
                <br />
                <br />
                <br />

            </div> 
        ) 
    }

}

export default StockData;