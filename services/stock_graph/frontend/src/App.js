import React, { Component } from 'react';
import './App.css';
import { Form } from "react-bootstrap";
import { Container } from "react-bootstrap";
//import 'bootstrap/dist/css/bootstrap.min.css';

import StockData from './components/StockData.js';
import ErrorBoundary from './components/ErrorBoundary.js';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {value: '', finalValue: '', startDate: '', dataLength: 30};
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
                <div class="container-fluid"><t />
                    <a class="navbar-brand" href="${window.location.protocol}//${window.location.hostname}:8080">
                    StockTracker
                    </a><t /><t /><t /><t /><t />
                </div>
            </nav>
            <h1><b>Stock Activity Graph</b></h1>

            <div class="search-bar">
                <Form onSubmit={this.handleSubmit}>
                    <input type="search" value={this.state.value}
                     onChange={this.handleChange} placeholder = "Search Company Ticker" />
                </Form>
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

            <footer class="bg-light-purple container-fluid">
            <div class="container py-3">
                Made by Caio C. Coelho, Caleb Sutherland, Daniel Wakefield, Jack
                Hillier, Ryan Harlen. &nbsp;
                <a href="https://github.com/CaioCamatta/StockTracker">Github</a>
            </div>
            </footer>

        </div>
    );
  }
}

export default App;