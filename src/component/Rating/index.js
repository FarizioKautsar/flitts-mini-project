import React, { Component } from 'react'
import classes from './Rating.module.css'

export default class Rating extends Component {
    constructor(props) {
        super(props);
        this.calculateColor = this.calculateColor.bind(this)
    }

    calculateColor(rating) {
        if (rating >= 8) {
            return "good"
        } else if (rating >= 6 && rating < 8){
            return "decent"
        } else if (rating >= 3 && rating < 6){
            return "mediocre"
        } else {
            return "bad"
        }  
    }

    render() {
        const props = this.props
        return (
            <div className={`${classes.rating} ${classes[this.calculateColor(props.children)]}`} style={props.style}>
                {props.children}
            </div>
        )
    }
}
