import React, { Children, Component } from 'react'
import classes from './Button.module.css'

const Button = (props) => {
    const {onclick, children, variant} = props
    const color = {
        "blue": classes.blue,
        "white": classes.white,
        "green": classes.green,
    }

    return (
        <div className = {classes.button + ' ' + color[variant]} onClick={onclick}>
            {children}
        </div>
    )
}

export default Button
