import React, { Component } from "react";
import { marketStack } from "../config/marketStack";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

class StockData extends Component {

    constructor(props) {
        super(props)
        this.state = {
            stockData: [ ]
        }
    }

    componentDidMount() {
        //query marketStack API
        const url = `${marketStack.base_url}/eod?access_key=${marketStack.api_token}&symbols=${this.props.ticker}`
        
        //add data to graph
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            for (var i =0; i < this.props.dataLength; i++)
            {
                this.setState({
                stockData: this.state.stockData.concat({ date: data['data'][i]['date'].split("T")[0], price: data['data'][i]['close']})
                })

            }
        })
    }

    componentDidUpdate(prevProps, prevState) {
        //query marketStack API
        const url = `${marketStack.base_url}/eod?access_key=${marketStack.api_token}&symbols=${this.props.ticker}`
        
        if(prevProps.ticker !== this.props.ticker || prevProps.dataLength !== this.props.dataLength){
            //add data to graph
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                this.state.stockData = [];
                for (var i =0; i < this.props.dataLength; i++)
                {
                    this.setState({
                    stockData: this.state.stockData.concat({ date: data['data'][i]['date'].split("T")[0], price: data['data'][i]['close']})
                    })

                }
            })
        }
        
    }
    

    render() {
        return (
            <div>
                <h2>{this.props.ticker}</h2>
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

            </div> 
        ) 
    }

}

export default StockData;