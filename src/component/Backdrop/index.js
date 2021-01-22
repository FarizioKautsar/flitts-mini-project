import React, { Component } from 'react'
import classes from './Backdrop.module.css'

// 50% Black Backdrop
export default class Backdrop extends Component {
    render() {
        return (
            <div className={classes.backdrop} onClick = {this.props.onClick}>
            </div>
        )
    }
}
