import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import StockData from './components/StockData.js';
import ErrorBoundary from './components/ErrorBoundary.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {value: 'AAPL', finalValue: 'AAPL', startDate: '', dataLength: 30};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    handleChange(event) {    this.setState({value: event.target.value});  }
    handleSubmit(event) {
        this.setState({finalValue: this.state.value})
        event.preventDefault();
    }

    changeDataLength(val){
        this.setState({dataLength : val})
    }

  render() {
    return (
        
        <div className='App'>
            <noscript>You need to enable JavaScript to run this app.</noscript>
            <nav class="navbar navbar-expand-sm navbar-custom navbar-dark">
                <div class="container-fluid">
                    <a class="navbar-brand"><b>Stock Tracker</b></a>
                </div>
            </nav>
            <h1><b>Stock Activity Graph</b></h1>

            <div class="search-bar">
                <form onSubmit={this.handleSubmit}>
                    <input type="search" value={this.state.value}
                     onChange={this.handleChange} placeholder = "Search Company Ticker" />
                </form>
            </div>

            <div class='search-criteria-left'>
                <div class="btn-group" role="group" aria-label="Basic example">
                    <button type="button" class="btn btn-primary" onClick={() => this.changeDataLength(30)}>Last 30 Days</button>
                    <button type="button" class="btn btn-primary" onClick={() => this.changeDataLength(60)}>Last 60 Days</button>
                    <button type="button" class="btn btn-primary" onClick={() => this.changeDataLength(90)}>Last 90 Days</button>
                </div>
            </div>

            <div class='graph'>
                <ErrorBoundary>
                    <StockData ticker={this.state.finalValue} dataLength={this.state.dataLength}/>
                </ErrorBoundary>
            </div>

        </div>
    );
  }
}

export default App;