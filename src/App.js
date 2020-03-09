import React, { Component } from 'react';
import './App.less';
import First from '@c/First';

import url from './assets/i1.jpg';
import logo from './assets/logo192.png'
export default class App extends Component {

    render() {
        return <div className="app">
            Hello, my friends!
            <img src={url} width="100" height="100"/>
            <img src={logo} width="100" height="100" />

            <First />
        </div>
    }
}