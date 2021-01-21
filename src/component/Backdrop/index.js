import React, { Component } from 'react'
import classes from './Backdrop.module.css'

export default class Backdrop extends Component {
    render() {
        return (
            <div className={classes.backdrop} onClick = {this.props.onclick}>
            </div>
        )
    }
}
