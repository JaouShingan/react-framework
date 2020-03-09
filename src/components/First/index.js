/**
 * @file First
 * @date 2020-3-8
 * @author pkyon
 */
import React, { Component } from 'react';
import './index.less';
import asynccmp from '@u/asyncComponent';
const Sec = asynccmp(() => import('../Secend'));
export default class First extends Component {
    constructor() {
        super();
        this.state = {
            cmp: null
        };
    }
    componentDidMount() { }

    btnClick = async () => {
        const cmp = await import('../Secend')
        .then((cmp) => {
            this.setState({
                cmp: cmp.default
            })
        })
        // this.setState({
        //     cmp: 'false'
        // }, () => console.log('cmp', this.state.cmp))
    }
    render() {
        console.log('render cmd', this.state.cmd)
        return (<div className="first">
            page First
            <button onClick={this.btnClick}> click</button>
            {this.state.cmp ? <this.state.cmp/> : null}
        </div>);
    }
}