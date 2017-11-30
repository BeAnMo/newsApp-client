import React, { Component } from 'react';
import News from './News';
import Weather from './Weather';
import Header from './Header';

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <main className="container">
                <Header />
                <Weather />
                <News />
            </main>
        );
    }
}