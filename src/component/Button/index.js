import React, { Component } from 'react'
import classes from './Button.module.css'

const Button = (props) => {
    const {onclick, label, variant} = props
    const color = {
        "blue": classes.blue,
        "white": classes.white,
        "green": classes.green,
    }

    return (
        <div className = {classes.button + ' ' + color[variant]} onClick={onclick}>
            {label}
        </div>
    )
}

export default Button
